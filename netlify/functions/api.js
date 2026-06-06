const fs = require('fs');
const path = require('path');

let playersCache = null;

function getPlayers() {
  if (playersCache) return playersCache;
  try {
    const filePath = path.join(process.cwd(), 'data', 'players.json');
    if (fs.existsSync(filePath)) {
      playersCache = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return playersCache;
    }
  } catch (e) {
    console.error("Failed to read players.json:", e);
  }
  return { overall: [], modes: {}, profiles: {} };
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

  // Route: GET /api/v2/mode/overall
  if (urlPath === "/api/v2/mode/overall") {
    const players = getPlayers();
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
    const players = getPlayers();
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
    const players = getPlayers();
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
    const players = getPlayers();
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
      const allModes = ["sword", "pot", "vanilla", "uhc", "smp", "nethop", "axe", "mace"];
      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(allModes)
      };
    }
    
    const players = getPlayers();
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
