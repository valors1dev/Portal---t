const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

// Optimize outgoing HTTP/HTTPS connection limits to prevent socket queuing
http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

const root = path.join(__dirname, "mctiers.com");
const dataDir = path.join(__dirname, "data");
const playersFile = path.join(dataDir, "players.json");
const skinsDir = path.join(dataDir, "skins");
const logoCandidates = [
  path.join(dataDir, "logo.gif"),
  path.join(dataDir, "logo.webp"),
  path.join(dataDir, "logo.png"),
  path.join(root, "icons", "nav_skip.webp"),
];
const port = Number(process.env.PORT) || 3000;
const API_UPSTREAM = "https://mctiers.com";

// ── In-memory player cache ────────────────────────────────────────────────
let _playersCache = null;
let _playersCacheTime = 0;

function readPlayersFromDisk() {
  try {
    if (fs.existsSync(playersFile)) {
      const data = JSON.parse(fs.readFileSync(playersFile, "utf8"));
      if (data && Array.isArray(data.overall)) {
        // Normalize and clean overall ranks in profiles dynamically to ensure consistency
        const rankedPlayers = data.overall.filter(p => p.points > 0);
        rankedPlayers.sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return a.name.localeCompare(b.name);
        });

        if (data.profiles && typeof data.profiles === 'object') {
          for (const profile of Object.values(data.profiles)) {
            if (profile && profile.points > 0) {
              const idx = rankedPlayers.findIndex(p => p.uuid === profile.uuid);
              profile.overall = idx !== -1 ? idx + 1 : 0;
            } else if (profile) {
              profile.overall = 0;
            }
          }
        }

        _playersCache = data;
        _playersCacheTime = Date.now();
        console.log(`[cache] players.json loaded: ${data.overall.length} players`);
        return data;
      }
    }
  } catch (e) {
    console.error("[cache] Failed to read players.json:", e.message);
  }
  return null;
}

// Watch players.json for changes and invalidate cache automatically
try {
  fs.watchFile(playersFile, { interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log("[cache] players.json changed — reloading...");
      readPlayersFromDisk();
    }
  });
} catch { }

// ── In-memory skin image cache (UUID → Buffer) ─────────────────────────
const _skinCache = new Map();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

function send(res, status, body, type, extraHeaders = {}) {
  res.writeHead(status, { "Content-Type": type || "text/plain; charset=utf-8", ...extraHeaders });
  res.end(body);
}

function sendJson(res, status, data) {
  send(res, status, JSON.stringify(data), "application/json; charset=utf-8", {
    "access-control-allow-origin": "*",
  });
}

async function autoImportPlayersAsync() {
  const crypto = require('crypto');
  const importFile = path.join(dataDir, "players_to_import.json");

  let rawImport = [];

  if (fs.existsSync(importFile)) {
    try {
      const fileContent = fs.readFileSync(importFile, 'utf8').trim();
      if (fileContent) {
        rawImport = JSON.parse(fileContent);
        console.log(`Auto-import: Loaded ${rawImport.length} players directly from players_to_import.json`);
      }
    } catch (e) {
      console.error("Auto-import: Failed to parse players_to_import.json, falling back to transcript logs...", e.message);
    }
  }

  if (rawImport.length === 0) {
    const transcriptPath = 'C:\\Users\\EXPERT\\.gemini\\antigravity-ide\\brain\\89d29e65-96b3-4498-b782-4147d6e411cd\\.system_generated\\logs\\transcript.jsonl';
    if (!fs.existsSync(transcriptPath)) return;
    const fileData = fs.readFileSync(transcriptPath, 'utf8');

    // Find all occurrences of Flamiifiied in fileData
    let pos = 0;
    let rawSlice = "";

    while (true) {
      const matchIdx = fileData.indexOf('Flamiifiied', pos);
      if (matchIdx === -1) break;

      let stepStart = matchIdx;
      while (stepStart >= 0) {
        if (fileData.slice(stepStart, stepStart + 14) === '{"step_index":') {
          break;
        }
        stepStart--;
      }

      if (stepStart >= 0) {
        let stepEnd = fileData.indexOf('\n{"step_index":', stepStart + 10);
        if (stepEnd === -1) stepEnd = fileData.indexOf('\r\n{"step_index":', stepStart + 10);
        if (stepEnd === -1) stepEnd = fileData.length;

        const stepStr = fileData.slice(stepStart, stepEnd);
        if (stepStr.includes('"type":"USER_INPUT"') && !stepStr.includes('"type":"CONVERSATION_HISTORY"')) {
          const startBracket = stepStr.indexOf('[');
          if (startBracket !== -1) {
            let depth = 0;
            let p = startBracket;
            while (p < stepStr.length) {
              const char = stepStr[p];
              if (char === '[') depth++;
              else if (char === ']') {
                depth--;
                if (depth === 0) {
                  rawSlice = stepStr.slice(startBracket, p + 1);
                  break;
                }
              }
              p++;
            }
          }
        }
      }

      if (rawSlice) break;
      pos = matchIdx + 11;
    }

    if (!rawSlice) {
      console.log("Auto-import: No player list found in USER_INPUT steps.");
      return;
    }

    let unescaped = rawSlice
      .replace(/\\\\\\"/g, '"')
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\\\/g, '\\');

    try {
      rawImport = JSON.parse(unescaped);
    } catch (e) {
      let idx = 0;
      while (idx < unescaped.length) {
        const startBrace = unescaped.indexOf('{', idx);
        if (startBrace === -1) break;

        let depth = 0;
        let endBrace = startBrace;
        while (endBrace < unescaped.length) {
          const char = unescaped[endBrace];
          if (char === '{') depth++;
          else if (char === '}') {
            depth--;
            if (depth === 0) {
              endBrace++;
              break;
            }
          }
          endBrace++;
        }

        const block = unescaped.slice(startBrace, endBrace);
        try {
          const p = JSON.parse(block);
          if (p.minecraftUsername) {
            rawImport.push(p);
          }
        } catch (err) { }
        idx = Math.max(endBrace, startBrace + 1);
      }
    }
  }

  if (rawImport.length === 0) return;
  console.log(`Auto-import starting for ${rawImport.length} players...`);

  // Fallback offline UUID generation
  function getOfflineUuid(name) {
    const clean = name.slice(0, 12).padEnd(12, "0").replace(/[^a-f0-9]/gi, "0").slice(0, 12);
    return `00000000-0000-4000-8000-${clean}`;
  }

  function formatUuid(id) {
    if (id.includes("-")) return id;
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
  }

  function fetchJson(url, timeoutMs = 600) {
    return new Promise((resolve) => {
      const req = https.get(url, { headers: { "User-Agent": "PortalNetwork/1.0" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode !== 200) return resolve(null);
          try { resolve(JSON.parse(data)); } catch { resolve(null); }
        });
      });
      req.on("error", () => resolve(null));
      req.setTimeout(timeoutMs, () => { req.destroy(); resolve(null); });
    });
  }

  async function resolvePremiumUuid(name) {
    const enc = encodeURIComponent(name);
    try {
      const ash = await fetchJson(`https://api.ashcon.app/mojang/v2/user/${enc}`, 600);
      if (ash?.uuid) return ash.uuid;
    } catch { }
    try {
      const pdb = await fetchJson(`https://playerdb.co/api/player/minecraft/${enc}`, 600);
      if (pdb?.data?.player?.id) return pdb.data.player.id;
    } catch { }
    try {
      const data = await fetchJson(`https://api.mojang.com/users/profiles/minecraft/${enc}`, 600);
      if (data?.id) return formatUuid(data.id);
    } catch { }
    return null;
  }

  function normalizeRegion(reg) {
    if (!reg || typeof reg !== 'string') return 'Unknown';
    const clean = reg.trim().toUpperCase();
    if (clean === 'UNKNOWN' || clean === 'IDK') return 'Unknown';
    if (clean.includes('/')) return clean.split('/')[0];
    return clean;
  }

  function parseRank(rankStr) {
    if (!rankStr || typeof rankStr !== 'string') return null;
    const match = rankStr.trim().match(/(HT|LT)(\d+)/i);
    if (!match) return null;
    const isHT = match[1].toUpperCase() === 'HT';
    const tier = parseInt(match[2], 10);
    const pos = isHT ? 0 : 1;
    return { tier, pos };
  }

  const skinsMeta = {};
  const skinsMetaFile = path.join(dataDir, "skins-meta.json");
  if (fs.existsSync(skinsMetaFile)) {
    try { Object.assign(skinsMeta, JSON.parse(fs.readFileSync(skinsMetaFile, 'utf8'))); } catch { }
  }

  const overallPlayers = [];
  const allModes = ["sword", "pot", "vanilla", "uhc", "smp", "nethop", "axe", "mace"];

  const batchSize = 10;
  for (let i = 0; i < rawImport.length; i += batchSize) {
    const batch = rawImport.slice(i, i + batchSize);
    await Promise.all(batch.map(async (p) => {
      if (!p.minecraftUsername) return;
      const name = p.minecraftUsername.trim();

      let uuid = null;
      let isPlaceholder = true;

      if (skinsMeta[name]) {
        uuid = skinsMeta[name].uuid;
        isPlaceholder = skinsMeta[name].isPlaceholder;
      } else {
        uuid = await resolvePremiumUuid(name);
        if (uuid) {
          isPlaceholder = false;
        } else {
          uuid = getOfflineUuid(name);
          isPlaceholder = true;
        }
      }

      const region = normalizeRegion(p.region);
      const points = Number(p.overallPoints) || 0;
      const rankings = {};

      if (p.ranks && typeof p.ranks === 'object') {
        for (const [modeKey, rankVal] of Object.entries(p.ranks)) {
          const mode = modeKey.toLowerCase();
          if (!allModes.includes(mode)) continue;

          const parsed = parseRank(rankVal);
          if (parsed) {
            rankings[mode] = {
              tier: parsed.tier,
              pos: parsed.pos,
              peak_tier: parsed.tier,
              peak_pos: parsed.pos,
              retired: false
            };
          }
        }
      }

      const skinRender = isPlaceholder
        ? `/skins/${uuid}.webp`
        : `https://render.crafty.gg/3d/bust/${uuid}`;

      if (isPlaceholder) {
        try {
          const crackedSrc = 'C:\\Users\\EXPERT\\Desktop\\portal network image locations\\sx.webp';
          const skinsDir = path.join(dataDir, 'skins');
          if (fs.existsSync(crackedSrc)) {
            fs.mkdirSync(skinsDir, { recursive: true });
            fs.copyFileSync(crackedSrc, path.join(skinsDir, `${uuid}.webp`));
          }
        } catch { }
      }

      skinsMeta[name] = {
        uuid,
        name,
        namemc: isPlaceholder ? `https://namemc.com/search?q=${encodeURIComponent(name)}` : `https://namemc.com/profile/${uuid}`,
        skinRender,
        isPlaceholder
      };

      overallPlayers.push({ uuid, name, region, points, rankings });
    }));
    await new Promise((r) => setTimeout(r, 100));
  }

  overallPlayers.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });

  const modesData = {};
  for (const m of allModes) modesData[m] = {};

  for (const p of overallPlayers) {
    for (const [mode, rankObj] of Object.entries(p.rankings)) {
      const tierStr = String(rankObj.tier);
      if (!modesData[mode][tierStr]) modesData[mode][tierStr] = [];
      modesData[mode][tierStr].push({
        uuid: p.uuid,
        name: p.name,
        region: p.region,
        points: p.points,
        pos: rankObj.pos
      });
    }
  }

  for (const mode of allModes) {
    for (const tierStr of Object.keys(modesData[mode])) {
      const list = modesData[mode][tierStr];
      list.sort((a, b) => {
        if (a.pos !== b.pos) return a.pos - b.pos;
        if (b.points !== a.points) return b.points - a.points;
        return a.name.localeCompare(b.name);
      });
      modesData[mode][tierStr] = list.map(item => ({
        uuid: item.uuid,
        name: item.name,
        region: item.region,
        pos: item.pos
      }));
    }
  }

  const profilesData = {};
  overallPlayers.forEach((p, idx) => {
    const profile = {
      uuid: p.uuid,
      name: p.name,
      region: p.region,
      points: p.points,
      overall: idx + 1,
      rankings: p.rankings,
      namemc: skinsMeta[p.name].namemc
    };
    profilesData[p.name] = profile;
    const cleanUuid = p.uuid.replace(/-/g, '').toLowerCase();
    profilesData[cleanUuid] = profile;
  });

  const finalData = {
    overall: overallPlayers,
    modes: modesData,
    profiles: profilesData
  };

  fs.writeFileSync(playersFile, JSON.stringify(finalData, null, 2), 'utf8');
  fs.writeFileSync(skinsMetaFile, JSON.stringify(skinsMeta, null, 2), 'utf8');
  console.log(`Auto-import: Successfully imported ${overallPlayers.length} players asynchronously.`);
}

function loadPlayers() {
  // Serve from memory cache — only hit disk if cache is cold
  if (_playersCache) return _playersCache;
  const data = readPlayersFromDisk();
  if (data) return data;
  autoImportPlayersAsync().catch(console.error);
  return { overall: [], modes: {}, profiles: {} };
}

function findPlayerByUuid(uuid) {
  const data = loadPlayers();
  const hit = data.overall?.find((p) => p.uuid === uuid);
  if (hit) return hit;
  for (const prof of Object.values(data.profiles || {})) {
    if (prof?.uuid === uuid) return prof;
  }
  return null;
}

function proxyImage(url, res, saveAsUuid) {
  // Check in-memory skin cache first
  if (saveAsUuid && _skinCache.has(saveAsUuid)) {
    const { buf, type } = _skinCache.get(saveAsUuid);
    return send(res, 200, buf, type, { "cache-control": "public, max-age=86400" });
  }

  const target = new URL(url);
  const req = https.get(
    {
      hostname: target.hostname,
      path: target.pathname + target.search,
      headers: { "User-Agent": "PortalNetwork/1.0", accept: "image/*" },
    },
    (up) => {
      const chunks = [];
      up.on("data", (c) => chunks.push(c));
      up.on("end", () => {
        const body = Buffer.concat(chunks);
        const type = up.headers["content-type"] || "image/png";
        const ok = up.statusCode === 200;
        send(res, ok ? 200 : 502, body, type, {
          "cache-control": ok ? "public, max-age=86400" : "no-store",
        });
        // Cache in memory and save to disk for next time
        if (ok && saveAsUuid) {
          _skinCache.set(saveAsUuid, { buf: body, type });
          try {
            fs.mkdirSync(skinsDir, { recursive: true });
            const ext = type.includes("webp") ? ".webp" : ".png";
            fs.writeFileSync(path.join(skinsDir, saveAsUuid + ext), body);
          } catch { }
        }
      });
    }
  );
  req.on("error", () => send(res, 502, "Skin unavailable"));
  req.setTimeout(5000, () => { req.destroy(); });
}

function sliceOverall(list, search) {
  const from = Number(new URLSearchParams(search).get("from")) || 0;
  const count = Number(new URLSearchParams(search).get("count")) || list.length;
  return list.slice(from, from + count);
}

function sliceMode(modeData, search) {
  const from = Number(new URLSearchParams(search).get("from")) || 0;
  const count = Number(new URLSearchParams(search).get("count")) || 10;
  const out = {};
  for (const [tier, players] of Object.entries(modeData || {})) {
    if (Array.isArray(players)) out[tier] = players.slice(from, from + count);
  }
  return out;
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

function handleLocalApi(urlPath, search, res) {
  const players = loadPlayers();

  if (urlPath === "/api/v2/mode/overall") {
    // Only show players with > 0 points in the public API
    const publicOverall = (players.overall || []).filter(p => p.points > 0);
    sendJson(res, 200, sliceOverall(publicOverall, search));
    return true;
  }

  if (urlPath.startsWith("/api/profile/")) {
    const key = decodeURIComponent(urlPath.replace("/api/profile/", ""));
    const lookup = key.replace(/-/g, "");
    const profile =
      players.profiles?.[key] ||
      players.profiles?.[lookup] ||
      Object.values(players.profiles || {}).find(
        (p) =>
          p.uuid === key ||
          p.uuid?.replace(/-/g, "") === lookup ||
          p.name?.toLowerCase() === key.toLowerCase()
      );
    if (profile) {
      sendJson(res, 200, formatModProfile(profile));
      return true;
    }
    sendJson(res, 200, createNotFoundResponse(key));
    return true;
  }

  if (urlPath === "/api/rank") {
    const params = new URLSearchParams(search);
    const identifier = params.get("username");
    if (!identifier) {
      sendJson(res, 400, { error: "Missing identifier" });
      return true;
    }
    const lookup = identifier.replace(/-/g, "");
    const profile =
      players.profiles?.[identifier] ||
      players.profiles?.[lookup] ||
      Object.values(players.profiles || {}).find(
        (p) =>
          p.uuid === identifier ||
          p.uuid?.replace(/-/g, "") === lookup ||
          p.name?.toLowerCase() === identifier.toLowerCase()
      );
    if (profile) {
      sendJson(res, 200, formatModProfile(profile));
      return true;
    }
    sendJson(res, 200, createNotFoundResponse(identifier));
    return true;
  }

  if (urlPath.startsWith("/api/v2/profile/")) {
    let key = decodeURIComponent(urlPath.replace("/api/v2/profile/", ""));
    let nameQuery = null;
    if (key.startsWith("by-name/")) {
      nameQuery = key.slice("by-name/".length);
      key = nameQuery;
    }
    const lookup = key.replace(/-/g, "");
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
      sendJson(res, 200, profile);
      return true;
    }
    sendJson(res, 404, { error: "Player not found" });
    return true;
  }

  const modeMatch = urlPath.match(/^\/api\/v2\/mode\/([^/]+)$/);
  if (modeMatch) {
    const mode = modeMatch[1];
    if (mode === "list") {
      const listPath = path.join(root, "api/v2/mode/list");
      const raw = fs.readFileSync(fs.existsSync(listPath) ? listPath : listPath + ".html", "utf8");
      send(res, 200, raw, "application/json; charset=utf-8");
      return true;
    }
    // "overall" is already handled above
    sendJson(res, 200, sliceMode(players.modes?.[mode] ?? {}, search));
    return true;
  }

  return false;
}

function proxyUpstream(req, res, pathname, search) {
  const target = new URL(`${API_UPSTREAM}${pathname}${search}`);
  const upstream = https.request(
    {
      hostname: target.hostname,
      path: target.pathname + target.search,
      method: req.method,
      headers: { accept: "*/*", "user-agent": "portalnetwork-local-dev" },
    },
    (up) => {
      const chunks = [];
      up.on("data", (c) => chunks.push(c));
      up.on("end", () => {
        const body = Buffer.concat(chunks);
        send(res, up.statusCode || 502, body, up.headers["content-type"] || "application/octet-stream", {
          "access-control-allow-origin": "*",
        });
      });
    }
  );
  upstream.on("error", () => send(res, 502, "Upstream unavailable"));
  upstream.end();
}

async function resolvePremiumUuidAndCacheAsync(name, placeholderUuid) {
  function fetchJson(url, timeoutMs = 800) {
    return new Promise((resolve) => {
      const req = https.get(url, { headers: { "User-Agent": "PortalNetwork/1.0" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode !== 200) return resolve(null);
          try { resolve(JSON.parse(data)); } catch { resolve(null); }
        });
      });
      req.on("error", () => resolve(null));
      req.setTimeout(timeoutMs, () => { req.destroy(); resolve(null); });
    });
  }

  async function resolvePremiumUuid(name) {
    const enc = encodeURIComponent(name);
    try {
      const ash = await fetchJson(`https://api.ashcon.app/mojang/v2/user/${enc}`, 800);
      if (ash?.uuid) return ash.uuid;
    } catch { }
    try {
      const pdb = await fetchJson(`https://playerdb.co/api/player/minecraft/${enc}`, 800);
      if (pdb?.data?.player?.id) return pdb.data.player.id;
    } catch { }
    try {
      const data = await fetchJson(`https://api.mojang.com/users/profiles/minecraft/${enc}`, 800);
      if (data?.id) {
        const id = data.id;
        return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
      }
    } catch { }
    return null;
  }

  const realUuid = await resolvePremiumUuid(name);
  if (!realUuid) return;

  const skinsMetaFile = path.join(dataDir, "skins-meta.json");
  const skinsMeta = fs.existsSync(skinsMetaFile) ? JSON.parse(fs.readFileSync(skinsMetaFile, 'utf8')) : {};
  
  let currentData;
  try {
    currentData = JSON.parse(fs.readFileSync(playersFile, 'utf8'));
  } catch {
    return;
  }

  skinsMeta[name] = {
    uuid: realUuid,
    name,
    namemc: `https://namemc.com/profile/${realUuid}`,
    skinRender: `https://render.crafty.gg/3d/bust/${realUuid}`,
    isPlaceholder: false
  };

  let changed = false;
  if (Array.isArray(currentData.overall)) {
    for (const p of currentData.overall) {
      if (p.name.toLowerCase() === name.toLowerCase()) {
        p.uuid = realUuid;
        changed = true;
      }
    }
  }

  if (currentData.modes && typeof currentData.modes === 'object') {
    for (const [mode, tiers] of Object.entries(currentData.modes)) {
      for (const [tier, players] of Object.entries(tiers)) {
        if (Array.isArray(players)) {
          for (const p of players) {
            if (p.name.toLowerCase() === name.toLowerCase()) {
              p.uuid = realUuid;
              changed = true;
            }
          }
        }
      }
    }
  }

  if (currentData.profiles && typeof currentData.profiles === 'object') {
    const profile = currentData.profiles[name];
    if (profile) {
      profile.uuid = realUuid;
      profile.namemc = skinsMeta[name].namemc;
      currentData.profiles[name] = profile;
      
      const cleanOldUuid = placeholderUuid.replace(/-/g, '').toLowerCase();
      delete currentData.profiles[cleanOldUuid];

      const cleanNewUuid = realUuid.replace(/-/g, '').toLowerCase();
      currentData.profiles[cleanNewUuid] = profile;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(playersFile, JSON.stringify(currentData, null, 2), 'utf8');
    fs.writeFileSync(skinsMetaFile, JSON.stringify(skinsMeta, null, 2), 'utf8');
    _playersCache = currentData;
    _playersCacheTime = Date.now();
    console.log(`[API POST] Async premium UUID resolved for ${name}: ${realUuid}`);

    const destPath = path.join(skinsDir, `${realUuid}.webp`);
    if (!fs.existsSync(destPath)) {
      const targetUrl = `https://render.crafty.gg/3d/bust/${realUuid}`;
      try {
        const target = new URL(targetUrl);
        const req = https.get(
          {
            hostname: target.hostname,
            path: target.pathname + target.search,
            headers: { "User-Agent": "PortalNetwork/1.0", accept: "image/*" },
          },
          (up) => {
            if (up.statusCode === 200) {
              const chunks = [];
              up.on("data", (c) => chunks.push(c));
              up.on("end", () => {
                const body = Buffer.concat(chunks);
                _skinCache.set(realUuid, { buf: body, type: "image/webp" });
                try { fs.writeFileSync(destPath, body); } catch {}
              });
            }
          }
        );
        req.on("error", () => {});
        req.setTimeout(5000, () => { req.destroy(); });
      } catch {}
    }
  }
}

async function mergePlayersDataAsync(newData) {
  const skinsMetaFile = path.join(dataDir, "skins-meta.json");
  const skinsMeta = {};
  if (fs.existsSync(skinsMetaFile)) {
    try { Object.assign(skinsMeta, JSON.parse(fs.readFileSync(skinsMetaFile, 'utf8'))); } catch { }
  }

  const currentData = loadPlayers();
  const existingOverall = currentData.overall || [];
  
  const mergedMap = new Map();
  for (const p of existingOverall) {
    mergedMap.set(p.name.toLowerCase(), { ...p });
  }

  const allModes = ["sword", "pot", "vanilla", "uhc", "smp", "nethop", "axe", "mace"];

  function getOfflineUuid(name) {
    const clean = name.slice(0, 12).padEnd(12, "0").replace(/[^a-f0-9]/gi, "0").slice(0, 12);
    return `00000000-0000-4000-8000-${clean}`;
  }

  function normalizeRegion(reg) {
    if (!reg || typeof reg !== 'string') return 'Unknown';
    const clean = reg.trim().toUpperCase();
    if (clean === 'UNKNOWN' || clean === 'IDK') return 'Unknown';
    if (clean.includes('/')) return clean.split('/')[0];
    return clean;
  }

  function parseRank(rankStr) {
    if (!rankStr || typeof rankStr !== 'string') return null;
    const match = rankStr.trim().match(/(HT|LT)(\d+)/i);
    if (!match) return null;
    const isHT = match[1].toUpperCase() === 'HT';
    const tier = parseInt(match[2], 10);
    const pos = isHT ? 0 : 1;
    return { tier, pos };
  }

  let addedCount = 0;
  let updatedCount = 0;

  for (const inp of newData) {
    if (!inp.minecraftUsername) continue;
    const name = inp.minecraftUsername.trim();
    const nameKey = name.toLowerCase();
    const region = normalizeRegion(inp.region);
    const points = Number(inp.overallPoints) || 0;

    if (inp.remove) {
      if (mergedMap.has(nameKey)) {
        mergedMap.delete(nameKey);
        updatedCount++;
      }
      // Whether or not they existed, skip — do not re-add them
      continue;
    }

    const rankings = {};
    if (inp.ranks && typeof inp.ranks === 'object') {
      for (const [modeKey, rankVal] of Object.entries(inp.ranks)) {
        const mode = modeKey.toLowerCase();
        if (!allModes.includes(mode)) continue;
        const parsed = parseRank(rankVal);
        if (parsed) {
          rankings[mode] = {
            tier: parsed.tier,
            pos: parsed.pos,
            peak_tier: parsed.tier,
            peak_pos: parsed.pos,
            retired: false
          };
        }
      }
    }

    if (mergedMap.has(nameKey)) {
      const old = mergedMap.get(nameKey);
      // Always overwrite rankings from bot — if bot has no ranks for this player,
      // clear the website rankings too. Never keep stale/old rankings.
      mergedMap.set(nameKey, {
        ...old,
        region: region !== 'Unknown' ? region : old.region,
        points: points > 0 ? points : old.points,
        rankings: rankings
      });
      updatedCount++;
    } else {
      let uuid = null;
      let isPlaceholder = true;
      
      if (skinsMeta[name]) {
        uuid = skinsMeta[name].uuid;
        isPlaceholder = skinsMeta[name].isPlaceholder;
      } else {
        uuid = getOfflineUuid(name);
        isPlaceholder = true;
      }

      if (isPlaceholder) {
        try {
          const crackedSrc = path.join(skinsDir, "sx.webp");
          if (fs.existsSync(crackedSrc) && !fs.existsSync(path.join(skinsDir, `${uuid}.webp`))) {
            fs.copyFileSync(crackedSrc, path.join(skinsDir, `${uuid}.webp`));
          }
        } catch {}
      }

      const namemc = isPlaceholder 
        ? `https://namemc.com/search?q=${encodeURIComponent(name)}` 
        : `https://namemc.com/profile/${uuid}`;
      const skinRender = isPlaceholder
        ? `/skins/${uuid}.webp`
        : `https://render.crafty.gg/3d/bust/${uuid}`;

      skinsMeta[name] = { uuid, name, namemc, skinRender, isPlaceholder };
      mergedMap.set(nameKey, { uuid, name, region, points, rankings });
      addedCount++;

      if (isPlaceholder) {
        resolvePremiumUuidAndCacheAsync(name, uuid).catch(console.error);
      }
    }
  }

  const overallPlayers = [...mergedMap.values()];
  
  // Sort overall list: points (desc) then name (asc)
  overallPlayers.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });

  // Create filtered overall: Only show players with > 0 points in the public list
  const filteredOverall = overallPlayers.filter(p => p.points > 0);

  const modesData = {};
  for (const m of allModes) modesData[m] = {};
  // For modes, we use the full list but they naturally won't show up if they have no rankings
  for (const p of overallPlayers) {
    for (const [mode, rankObj] of Object.entries(p.rankings || {})) {
      const tierStr = String(rankObj.tier);
      if (!modesData[mode][tierStr]) modesData[mode][tierStr] = [];
      modesData[mode][tierStr].push({
        uuid: p.uuid,
        name: p.name,
        region: p.region,
        points: p.points,
        pos: rankObj.pos
      });
    }
  }

  for (const mode of allModes) {
    for (const tierStr of Object.keys(modesData[mode])) {
      const list = modesData[mode][tierStr];
      list.sort((a, b) => {
        if (a.pos !== b.pos) return a.pos - b.pos;
        if (b.points !== a.points) return b.points - a.points;
        return a.name.localeCompare(b.name);
      });
      modesData[mode][tierStr] = list.map(item => ({
        uuid: item.uuid,
        name: item.name,
        region: item.region,
        pos: item.pos
      }));
    }
  }

  const profilesData = {};
  // For profiles (search), we include EVERYONE
  overallPlayers.forEach((p) => {
    const meta = skinsMeta[p.name] || {};
    const namemc = meta.namemc || `https://namemc.com/search?q=${encodeURIComponent(p.name)}`;
    
    // logic: If points > 0, find their real position among filtered list.
    // If points === 0, set position to 0 so the frontend can hide it or show "Unranked".
    const overallRank = p.points > 0 
      ? (filteredOverall.findIndex(f => f.uuid === p.uuid) + 1) 
      : 0;

    const profile = {
      uuid: p.uuid,
      name: p.name,
      region: p.region,
      points: p.points,
      overall: overallRank,
      rankings: p.rankings,
      namemc
    };
    profilesData[p.name] = profile;
    const cleanUuid = p.uuid.replace(/-/g, '').toLowerCase();
    profilesData[cleanUuid] = profile;
  });

  const finalData = {
    overall: filteredOverall, // Public list only shows players with points
    modes: modesData,
    profiles: profilesData    // Search still works for everyone
  };

  fs.writeFileSync(playersFile, JSON.stringify(finalData, null, 2), 'utf8');
  fs.writeFileSync(skinsMetaFile, JSON.stringify(skinsMeta, null, 2), 'utf8');

  _playersCache = finalData;
  _playersCacheTime = Date.now();

  console.log(`[API POST] Merged data: ${addedCount} added, ${updatedCount} updated.`);
  return {
    added: addedCount,
    updated: updatedCount,
    totalPlayers: overallPlayers.length
  };
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, "http://localhost");
  let urlPath = decodeURIComponent(parsed.pathname);

  // Simple request logger
  console.log(`[web] ${req.method} ${urlPath}`);

  if (req.method === "POST" && urlPath === "/api/v2/update-players") {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const expectedToken = process.env.BOT_API_TOKEN || "portalnetwork-secret-bot-token-2026";
    
    if (!token || token !== expectedToken) {
      return sendJson(res, 401, { error: "Unauthorized. Invalid or missing token." });
    }
    
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        req.destroy();
      }
    });
    
    req.on("end", async () => {
      try {
        const incomingPlayers = JSON.parse(body);
        if (!Array.isArray(incomingPlayers)) {
          return sendJson(res, 400, { error: "Invalid body format. Expected a JSON array." });
        }
        
        const result = await mergePlayersDataAsync(incomingPlayers);
        sendJson(res, 200, { success: true, ...result });
      } catch (err) {
        sendJson(res, 400, { error: `Failed to parse JSON body: ${err.message}` });
      }
    });
    return;
  }

  if (handleLocalApi(urlPath, parsed.search, res) !== false) return;

  if (urlPath === "/favicon.ico") {
    const faviconPath = path.join(dataDir, "server-logo.gif");
    if (fs.existsSync(faviconPath)) {
      return fs.readFile(faviconPath, (err, data) => {
        if (err) return send(res, 500, "Internal Server Error");
        send(res, 200, data, "image/gif");
      });
    }
  }

  if (urlPath === "/icons/pvpclub.webp" || urlPath === "/icons/pvpclub.png" || urlPath === "/icons/pvpclub.gif") {
    const pvpCandidates = [
      path.join(dataDir, "server-logo.gif"),
      path.join(dataDir, "server-logo.webp"),
      path.join(dataDir, "server-logo.png"),
    ];
    const serverLogo = pvpCandidates.find((p) => fs.existsSync(p));
    if (serverLogo) {
      const ext = path.extname(serverLogo).toLowerCase();
      return fs.readFile(serverLogo, (err, data) => {
        if (err) return send(res, 500, "Internal Server Error");
        send(res, 200, data, mime[ext] || "image/webp");
      });
    }
  }

  const skinMatch = urlPath.match(/^\/skins\/([0-9a-f-]+(?:-[0-9a-f]+)*)\.(webp|png)$/i);
  if (skinMatch) {
    const id = skinMatch[1];

    // 1. Check in-memory skin cache
    if (_skinCache.has(id)) {
      const { buf, type } = _skinCache.get(id);
      return send(res, 200, buf, type, { "cache-control": "public, max-age=86400" });
    }

    // 2. Check disk
    const webp = path.join(skinsDir, `${id}.webp`);
    const png = path.join(skinsDir, `${id}.png`);
    const skinPath =
      skinMatch[2].toLowerCase() === "webp" && fs.existsSync(webp) ? webp
        : skinMatch[2].toLowerCase() === "png" && fs.existsSync(png) ? png
          : fs.existsSync(webp) ? webp
            : fs.existsSync(png) ? png
              : null;

    if (skinPath) {
      return fs.readFile(skinPath, (err, data) => {
        if (err) return send(res, 500, "Internal Server Error");
        const ext = path.extname(skinPath).toLowerCase();
        const type = mime[ext] || "image/webp";
        _skinCache.set(id, { buf: data, type }); // warm memory cache
        send(res, 200, data, type, { "cache-control": "public, max-age=86400" });
      });
    }

    // 3. Serve the local fallback (sx.webp) immediately so the browser request finishes instantly,
    // and start a background download of the real skin so it's cached for the next request.
    const fallbackPath = path.join(skinsDir, "sx.webp");
    fs.readFile(fallbackPath, (err, data) => {
      if (!err) {
        send(res, 200, data, "image/webp", { "cache-control": "no-store" });
      } else {
        const logoPath = path.join(dataDir, "logo.png");
        if (fs.existsSync(logoPath)) {
          fs.readFile(logoPath, (lErr, lData) => {
            if (!lErr) send(res, 200, lData, "image/png");
            else send(res, 502, "Skin unavailable");
          });
        } else {
          send(res, 502, "Skin unavailable");
        }
      }
    });

    // Start background download to cache it for next time
    const targetUrl = `https://render.crafty.gg/3d/bust/${id}`;
    const destPath = path.join(skinsDir, `${id}.webp`);
    try {
      const target = new URL(targetUrl);
      const req = https.get(
        {
          hostname: target.hostname,
          path: target.pathname + target.search,
          headers: { "User-Agent": "PortalNetwork/1.0", accept: "image/*" },
        },
        (up) => {
          if (up.statusCode === 200) {
            const chunks = [];
            up.on("data", (c) => chunks.push(c));
            up.on("end", () => {
              const body = Buffer.concat(chunks);
              const type = up.headers["content-type"] || "image/webp";
              _skinCache.set(id, { buf: body, type });
              try {
                fs.writeFileSync(destPath, body);
              } catch {}
            });
          }
        }
      );
      req.on("error", () => {});
      req.setTimeout(5000, () => { req.destroy(); });
    } catch {}
    return true;
  }

  const avatarMatch = urlPath.match(/^\/avatar\/([^/]+)\/(\d+)\.png$/i);
  if (avatarMatch) {
    const name = decodeURIComponent(avatarMatch[1]);
    return proxyImage(`https://minotar.net/helm/${encodeURIComponent(name)}/${avatarMatch[2]}`, res, null);
  }

  if (urlPath === "/icons/nav_skip.png" || urlPath === "/icons/nav_skip.webp" || urlPath === "/icons/logo.webp") {
    const logoPath = logoCandidates.find((p) => fs.existsSync(p));
    if (logoPath) {
      const ext = path.extname(logoPath).toLowerCase();
      return fs.readFile(logoPath, (err, data) => {
        if (err) return send(res, 500, "Internal Server Error");
        send(res, 200, data, mime[ext] || "image/webp");
      });
    }
  }

  if (urlPath === "/docs/v2") {
    res.writeHead(301, { Location: "/docs/v2/" });
    res.end();
    return;
  }

  if (urlPath.endsWith("/")) urlPath += "index.html";

  const filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root)) return send(res, 403, "Forbidden");

  const tryFile = (p, cb) => {
    fs.stat(p, (err, stat) => {
      if (err) return cb();
      
      if (stat.isDirectory()) {
        // If it's a directory, check for index.html inside
        const indexPath = path.join(p, "index.html");
        return fs.stat(indexPath, (iErr, iStat) => {
          if (!iErr && iStat.isFile()) {
            return tryFile(indexPath, cb);
          }
          cb();
        });
      }

      if (!stat.isFile()) return cb();
      const ext = path.extname(p).toLowerCase();
      fs.readFile(p, (readErr, data) => {
        if (readErr) return send(res, 500, "Internal Server Error");
        send(res, 200, data, mime[ext] || "application/octet-stream");
      });
    });
  };

  tryFile(filePath, () => {
    tryFile(filePath + ".html", () => {
      if (urlPath.startsWith("/titles/")) {
        return proxyUpstream(req, res, urlPath, parsed.search);
      }
      send(res, 404, "Not Found");
    });
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[server] Port ${port} is already in use. Another instance of serve.js may already be running (e.g. via bot's web.js). This instance will exit.`);
    process.exit(0); // exit cleanly — the existing server is handling requests
  } else {
    console.error('[server] Unexpected error:', err);
    process.exit(1);
  }
});

server.listen(port, () => {
  console.log(`Serving ${root}`);
  console.log(`Players: ${playersFile}`);
  console.log(`Logo: ${logoCandidates.find((p) => fs.existsSync(p)) || "missing — add data/logo.webp"}`);
  console.log(`Open http://localhost:${port}/`);

  // Pre-warm player cache on startup
  readPlayersFromDisk();

  // Pre-warm skin image cache from disk
  try {
    fs.mkdirSync(skinsDir, { recursive: true });
    for (const f of fs.readdirSync(skinsDir)) {
      const ext = path.extname(f).toLowerCase();
      if (ext === ".webp" || ext === ".png") {
         const id = path.basename(f, ext);
         try {
           const buf = fs.readFileSync(path.join(skinsDir, f));
           _skinCache.set(id, { buf, type: mime[ext] || "image/webp" });
         } catch { }
      }
    }
    console.log(`[cache] ${_skinCache.size} skins pre-loaded into memory`);
  } catch { }

  // Auto-import only if players file doesn't exist
  if (!fs.existsSync(playersFile)) {
    autoImportPlayersAsync().catch(console.error);
  }
});
