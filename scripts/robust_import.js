const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const transcriptPath = 'C:\\Users\\EXPERT\\.gemini\\antigravity-ide\\brain\\89d29e65-96b3-4498-b782-4147d6e411cd\\.system_generated\\logs\\transcript.jsonl';
const dataDir = path.join(__dirname, '..', 'data');
const outputFile = path.join(dataDir, 'players.json');
const skinsMetaFile = path.join(dataDir, 'skins-meta.json');

if (!fs.existsSync(transcriptPath)) {
  console.error("Transcript file not found!");
  process.exit(1);
}

const fileData = fs.readFileSync(transcriptPath, 'utf8');

// Find all occurrences of Flamiifiied in fileData to locate the untruncated USER_INPUT step
let pos = 0;
let arrayStart = -1;
let arrayEnd = -1;
let rawSlice = "";

while (true) {
  const matchIdx = fileData.indexOf('Flamiifiied', pos);
  if (matchIdx === -1) break;
  
  // Trace backward to find the start of the step '{"step_index":'
  let stepStart = matchIdx;
  while (stepStart >= 0) {
    if (fileData.slice(stepStart, stepStart + 14) === '{"step_index":') {
      break;
    }
    stepStart--;
  }
  
  if (stepStart >= 0) {
    // Find the end of this step by looking for the next step start or end of file
    let stepEnd = fileData.indexOf('\n{"step_index":', stepStart + 10);
    if (stepEnd === -1) stepEnd = fileData.indexOf('\r\n{"step_index":', stepStart + 10);
    if (stepEnd === -1) stepEnd = fileData.length;
    
    const stepStr = fileData.slice(stepStart, stepEnd);
    
    // We want the untruncated USER_INPUT step
    if (stepStr.includes('"type":"USER_INPUT"') && !stepStr.includes('"type":"CONVERSATION_HISTORY"')) {
      const startBracket = stepStr.indexOf('[');
      if (startBracket !== -1) {
        // Trace bracket depth to find matching ']'
        let depth = 0;
        let p = startBracket;
        while (p < stepStr.length) {
          const char = stepStr[p];
          if (char === '[') depth++;
          else if (char === ']') {
            depth--;
            if (depth === 0) {
              arrayStart = stepStart + startBracket;
              arrayEnd = stepStart + p + 1;
              rawSlice = stepStr.slice(startBracket, p + 1);
              break;
            }
          }
          p++;
        }
      }
    }
  }
  
  if (rawSlice) {
    console.log(`Found untruncated players list in USER_INPUT step (length: ${rawSlice.length} bytes).`);
    break;
  }
  
  pos = matchIdx + 11;
}

if (!rawSlice) {
  console.error("Could not find untruncated USER_INPUT player list in transcript logs!");
  process.exit(1);
}

// Robust unescaping regex for JSON-in-JSON logs
let unescaped = rawSlice
  .replace(/\\\\\\"/g, '"') // Matches triple-escaped \\\" -> "
  .replace(/\\"/g, '"')     // Matches single-escaped \" -> "
  .replace(/\\n/g, '\n')
  .replace(/\\r/g, '\r')
  .replace(/\\\\/g, '\\');

let rawImport = [];
try {
  rawImport = JSON.parse(unescaped);
  console.log(`Parsed successfully! Found ${rawImport.length} players in logs.`);
} catch (e) {
  console.log("Full JSON parsing failed, running robust brace-matching parser...");
  
  // Robust brace-matching recovery parser
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
    } catch (err) {
      // Quietly skip invalid blocks or comments
    }
    
    idx = Math.max(endBrace, startBrace + 1);
  }
  
  console.log(`Brace-matching parser successfully extracted ${rawImport.length} players.`);
}

if (rawImport.length === 0) {
  console.error("No players could be extracted!");
  process.exit(1);
}

// Deterministic offline UUID format
function getOfflineUuid(name) {
  const clean = name.slice(0, 12).padEnd(12, "0").replace(/[^a-f0-9]/gi, "0").slice(0, 12);
  return `00000000-0000-4000-8000-${clean}`;
}

// Format raw Mojang UUID without hyphens to standard UUID with hyphens
function formatUuid(id) {
  if (id.includes("-")) return id;
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

// Fetch helper with timeout
function fetchJson(url, timeoutMs = 600) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": "PortalNetwork/1.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        if (res.statusCode !== 200) return resolve(null);
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });
    req.on("error", () => resolve(null));
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve(null);
    });
  });
}

// Resolve UUID for premium players, otherwise return null
async function resolvePremiumUuid(name) {
  const enc = encodeURIComponent(name);
  // Try Ashcon Mojang API
  try {
    const ash = await fetchJson(`https://api.ashcon.app/mojang/v2/user/${enc}`, 600);
    if (ash?.uuid) return ash.uuid;
  } catch {}
  
  // Try PlayerDB API
  try {
    const pdb = await fetchJson(`https://playerdb.co/api/player/minecraft/${enc}`, 600);
    if (pdb?.data?.player?.id) return pdb.data.player.id;
  } catch {}
  
  // Try Official Mojang API
  try {
    const data = await fetchJson(`https://api.mojang.com/users/profiles/minecraft/${enc}`, 600);
    if (data?.id) return formatUuid(data.id);
  } catch {}
  
  return null;
}

// Normalize regions
function normalizeRegion(reg) {
  if (!reg || typeof reg !== 'string') return 'Unknown';
  const clean = reg.trim().toUpperCase();
  if (clean === 'UNKNOWN' || clean === 'IDK') return 'Unknown';
  if (clean.includes('/')) return clean.split('/')[0];
  return clean;
}

// Convert rank string (e.g. "LT3", "HT4") to tier & pos
function parseRank(rankStr) {
  if (!rankStr || typeof rankStr !== 'string') return null;
  const match = rankStr.trim().match(/(HT|LT)(\d+)/i);
  if (!match) return null;
  const isHT = match[1].toUpperCase() === 'HT';
  const tier = parseInt(match[2], 10);
  const pos = isHT ? 0 : 1;
  return { tier, pos };
}

// Main logic
async function main() {
  console.log("Resolving UUIDs for all players (checking premium vs cracked)...");
  
  const skinsMeta = {};
  if (fs.existsSync(skinsMetaFile)) {
    try {
      Object.assign(skinsMeta, JSON.parse(fs.readFileSync(skinsMetaFile, 'utf8')));
    } catch {}
  }
  
  const overallPlayers = [];
  const allModes = ["sword", "pot", "vanilla", "uhc", "smp", "nethop", "axe", "mace"];
  
  // Concurrency helper to resolve UUIDs in parallel batches to prevent rate limits
  const batchSize = 10;
  for (let i = 0; i < rawImport.length; i += batchSize) {
    const batch = rawImport.slice(i, i + batchSize);
    await Promise.all(batch.map(async (p) => {
      if (!p.minecraftUsername) return;
      const name = p.minecraftUsername.trim();
      
      let uuid = null;
      let isPlaceholder = true;
      
      // Check cache first
      if (skinsMeta[name]) {
        uuid = skinsMeta[name].uuid;
        isPlaceholder = skinsMeta[name].isPlaceholder;
      } else {
        // Look up premium UUID
        uuid = await resolvePremiumUuid(name);
        if (uuid) {
          isPlaceholder = false;
          console.log(`Resolved PREMIUM player: ${name} -> ${uuid}`);
        } else {
          uuid = getOfflineUuid(name);
          isPlaceholder = true;
          console.log(`CRACKED player: ${name} -> ${uuid}`);
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
      
      // Update skins meta cache
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
            console.log(`Copied custom cracked skin for player: ${name}`);
          }
        } catch (e) {
          console.warn(`Failed to copy cracked skin for ${name}:`, e.message);
        }
      }
        
      skinsMeta[name] = {
        uuid,
        name,
        namemc: isPlaceholder ? `https://namemc.com/search?q=${encodeURIComponent(name)}` : `https://namemc.com/profile/${uuid}`,
        skinRender,
        isPlaceholder
      };
      
      overallPlayers.push({
        uuid,
        name,
        region,
        points,
        rankings
      });
    }));
    
    // Tiny sleep between batches to respect rate limits
    await new Promise((r) => setTimeout(r, 100));
  }
  
  // Sort overall by points descending, then name ascending
  overallPlayers.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });
  
  // Construct modes list
  const modesData = {};
  for (const m of allModes) {
    modesData[m] = {};
  }
  
  for (const p of overallPlayers) {
    for (const [mode, rankObj] of Object.entries(p.rankings)) {
      const tierStr = String(rankObj.tier);
      if (!modesData[mode][tierStr]) {
        modesData[mode][tierStr] = [];
      }
      modesData[mode][tierStr].push({
        uuid: p.uuid,
        name: p.name,
        region: p.region,
        points: p.points,
        pos: rankObj.pos
      });
    }
  }
  
  // Sort each mode-tier group:
  // First HT (pos: 0) then LT (pos: 1). Then by overall points desc, then name asc
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
  
  // Construct profiles map
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
  
  fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 2), 'utf8');
  fs.writeFileSync(skinsMetaFile, JSON.stringify(skinsMeta, null, 2), 'utf8');
  
  console.log(`\nSUCCESS! Generated ${outputFile} with ${overallPlayers.length} players.`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
