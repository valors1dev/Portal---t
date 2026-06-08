const fs = require('fs');
const path = require('path');

const https = require('https');

let playersCache = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function fetchFromGitHub() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'raw.githubusercontent.com',
      port: 443,
      path: '/valors1dev/Portal---t/main/data/players.json',
      method: 'GET',
      headers: {
        'User-Agent': 'PortalTiers-NetlifyFunction/1.0'
      }
    };

    const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
    if (token) {
      options.hostname = 'api.github.com';
      options.path = '/repos/valors1dev/Portal---t/contents/data/players.json';
      options.headers['Authorization'] = `token ${token}`;
      options.headers['Accept'] = 'application/vnd.github.v3.raw';
    }

    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to fetch from GitHub: ${res.statusCode} ${data.slice(0, 100)}`));
        }
        try {
          let parsed;
          if (token && !options.headers['Accept']) {
            const json = JSON.parse(data);
            const content = Buffer.from(json.content, 'base64').toString('utf8');
            parsed = JSON.parse(content);
          } else {
            parsed = JSON.parse(data);
          }
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('GitHub request timeout'));
    });
  });
}

async function getPlayers() {
  const now = Date.now();
  if (playersCache && (now - lastFetchTime < CACHE_TTL_MS)) {
    return playersCache;
  }

  try {
    console.log('[Netlify Function] Fetching latest players.json from GitHub...');
    const data = await fetchFromGitHub();
    playersCache = data;
    lastFetchTime = now;
    return playersCache;
  } catch (e) {
    console.error("Failed to fetch players.json from GitHub:", e.message);
    if (playersCache) {
      console.log("Serving cached players data as fallback.");
      return playersCache;
    }
    try {
      const filePath = path.join(process.cwd(), 'data', 'players.json');
      if (fs.existsSync(filePath)) {
        playersCache = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        lastFetchTime = now - CACHE_TTL_MS + 5000;
        return playersCache;
      }
    } catch (localErr) {
      console.error("Failed to read local fallback players.json:", localErr);
    }
  }
  return playersCache || { overall: [], modes: {}, profiles: {} };
}

function formatModProfile(profile) {
  if (!profile) return null;
  const rankings = {};
  if (profile.rankings) {
    for (const [mode, rank] of Object.entries(profile.rankings)) {
      rankings[mode] = {
        tier: String(rank.tier),
        pos: String(rank.pos),
        attained: String(Math.floor(Date.now() / 1000)),
        retired: String(rank.retired ?? false),
        peak_tier: rank.peak_tier ? String(rank.peak_tier) : null,
        peak_pos: rank.peak_pos ? String(rank.peak_pos) : null
      };
    }
  }
  return {
    name: profile.name,
    region: profile.region || "Unknown",
    points: profile.points || 0,
    overall: (profile.points > 0) ? (profile.overall || 0) : 0,
    rankings: rankings
  };
}

function createNotFoundResponse(identifier) {
  return {
    name: identifier,
    region: "Unknown",
    points: 0,
    overall: 0,
    rankings: {}
  };
}

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  const urlPath = decodeURIComponent(event.path);
  const params = event.queryStringParameters || {};

  console.log(`[Netlify Function] ${method} ${urlPath}`);

  // Route: POST /api/v2/update-players
  if (method === "POST" && urlPath === "/api/v2/update-players") {
    return {
      statusCode: 405,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify({ 
        error: "POST /api/v2/update-players is not supported directly on serverless Netlify functions. Please route writes to your bot's dedicated VPS backend server." 
      })
    };
  }

  if (method !== "GET" && method !== "HEAD") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  // Route: GET /api/openapi.json
  if (urlPath === "/api/openapi.json") {
    try {
      const filePath = path.join(process.cwd(), 'mctiers.com', 'api', 'openapi.json');
      if (fs.existsSync(filePath)) {
        return {
          statusCode: 200,
          headers: { 
            "Content-Type": "application/json; charset=utf-8", 
            "Access-Control-Allow-Origin": "*" 
          },
          body: fs.readFileSync(filePath, 'utf8')
        };
      }
    } catch (e) {
      console.error("Failed to read openapi.json:", e);
    }
    return {
      statusCode: 404,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: "openapi.json not found" })
    };
  }

  // Route: GET /api/v2/mode/overall
  if (urlPath === "/api/v2/mode/overall") {
    const players = await getPlayers();
    const publicOverall = (players.overall || []).filter(p => p.points > 0);
    const from = Number(params.from) || 0;
    const count = Number(params.count) || publicOverall.length;
    const sliced = publicOverall.slice(from, from + count);
    
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8", 
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(sliced)
    };
  }

  // Route: GET /api/profile/:name
  if (urlPath.startsWith("/api/profile/")) {
    const key = decodeURIComponent(urlPath.replace("/api/profile/", ""));
    const lookup = key.replace(/-/g, "");
    const players = await getPlayers();
    const profile =
      players.profiles?.[key] ||
      players.profiles?.[lookup] ||
      Object.values(players.profiles || {}).find(
        (p) =>
          p.uuid === key ||
          p.uuid?.replace(/-/g, "") === lookup ||
          p.name?.toLowerCase() === key.toLowerCase()
      );
    
    const responseBody = profile ? formatModProfile(profile) : createNotFoundResponse(key);
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8", 
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(responseBody)
    };
  }

  // Route: GET /api/rank
  if (urlPath === "/api/rank") {
    const identifier = params.username;
    if (!identifier) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Missing identifier" })
      };
    }
    const lookup = identifier.replace(/-/g, "");
    const players = await getPlayers();
    const profile =
      players.profiles?.[identifier] ||
      players.profiles?.[lookup] ||
      Object.values(players.profiles || {}).find(
        (p) =>
          p.uuid === identifier ||
          p.uuid?.replace(/-/g, "") === lookup ||
          p.name?.toLowerCase() === identifier.toLowerCase()
      );
      
    const responseBody = profile ? formatModProfile(profile) : createNotFoundResponse(identifier);
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8", 
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(responseBody)
    };
  }

  // Route: GET /api/v2/profile/:uuid
  if (urlPath.startsWith("/api/v2/profile/")) {
    let key = decodeURIComponent(urlPath.replace("/api/v2/profile/", ""));
    let nameQuery = null;
    if (key.startsWith("by-name/")) {
      nameQuery = key.slice("by-name/".length);
      key = nameQuery;
    }
    const lookup = key.replace(/-/g, "");
    const players = await getPlayers();
    const profile =
      players.profiles?.[key] ||
      players.profiles?.[lookup] ||
      (nameQuery && players.profiles?.[nameQuery]) ||
      Object.values(players.profiles || {}).find(
        (p) =>
          p.uuid === key ||
          p.uuid?.replace(/-/g, "") === lookup ||
          p.name?.toLowerCase() === key.toLowerCase() ||
          (nameQuery && p.name?.toLowerCase() === nameQuery.toLowerCase())
      );
      
    if (profile) {
      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json; charset=utf-8", 
          "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(profile)
      };
    }
    return {
      statusCode: 404,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: "Player not found" })
    };
  }

  // Route: GET /api/v2/mode/:mode
    const modeMatch = urlPath.match(/^\/api\/v2\/mode\/([^/]+)$/);
  if (modeMatch) {
    const mode = modeMatch[1];
    if (mode === "list") {
      const modeListMetadata = {
        "sword":{"title":"Sword","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/zYvJkeb.png","discord_url":"https://discord.gg/swordtiers"},
        "nethop":{"title":"Netherite OP","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/fMb2sIu.png","discord_url":"https://discord.gg/nethop"},
        "pot":{"title":"Pot","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/wO2dTF4.png","discord_url":"https://discord.gg/potionpvp"},
        "uhc":{"title":"UHC","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/UTHXIkJ.png","discord_url":"https://discord.gg/uhcpvp"},
        "axe":{"title":"Axe","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/lBJ4uW1.png","discord_url":"https://discord.gg/axepvp"},
        "vanilla":{"title":"Vanilla","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/PEYGKLo.png","discord_url":"https://discord.gg/cpvp"},
        "mace":{"title":"Mace","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://imgur.com/a/NgGZJ8e","discord_url":"https://discord.gg/2QsW3rTjqg"},
        "smp":{"title":"SMP","info_text":"# Coming Soon\n\nCheck back later!","kit_image":"https://i.imgur.com/PDDWIey.png","discord_url":"https://discord.gg/smptiers"}
      };
      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(modeListMetadata)
      };
    }
    
    const players = await getPlayers();
    const modeData = players.modes?.[mode] ?? {};
    const from = Number(params.from) || 0;
    const count = Number(params.count) || 10;
    
    const out = {};
    for (const [tier, playerList] of Object.entries(modeData)) {
      if (Array.isArray(playerList)) {
        out[tier] = playerList.slice(from, from + count);
      }
    }
    
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8", 
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(out)
    };
  }

  return {
    statusCode: 404,
    body: "Not Found"
  };
};
