const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
const inputFile = path.join(dataDir, 'players_to_import.json');
const outputFile = path.join(dataDir, 'players.json');

// 1. Load unverified/import players
if (!fs.existsSync(inputFile)) {
  console.error("Input file players_to_import.json not found!");
  process.exit(1);
}

const rawImport = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
console.log(`Loaded ${rawImport.length} players from import file.`);

// Deterministic UUID v4 from Discord ID
function getUuid(discordId) {
  const hash = crypto.createHash('md5').update(discordId).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-8${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

// Map regions to uppercase standard codes, defaulting AS
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

// Valid gamemodes
const allModes = ["sword", "pot", "vanilla", "uhc", "smp", "nethop", "axe", "mace"];

// Processed players list
const overallPlayers = [];

for (const p of rawImport) {
  if (!p.minecraftUsername) continue;
  
  const uuid = getUuid(p.discordId || p.minecraftUsername);
  const name = p.minecraftUsername.trim();
  const region = normalizeRegion(p.region);
  const points = Number(p.overallPoints) || 0;
  
  const rankings = {};
  
  // Parse rankings
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
  
  overallPlayers.push({
    uuid,
    name,
    region,
    points,
    rankings
  });
}

// 2. Sort overall by points descending, then name ascending
overallPlayers.sort((a, b) => {
  if (b.points !== a.points) return b.points - a.points;
  return a.name.localeCompare(b.name);
});

// 3. Construct "modes" list
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
      points: p.points, // Keep overall points temporarily for sorting
      pos: rankObj.pos
    });
  }
}

// Sort each mode-tier group:
// first HT (pos: 0), then LT (pos: 1). Within those, sort by overall points desc, then name asc
for (const mode of allModes) {
  for (const tierStr of Object.keys(modesData[mode])) {
    const list = modesData[mode][tierStr];
    list.sort((a, b) => {
      if (a.pos !== b.pos) return a.pos - b.pos; // HT (0) before LT (1)
      if (b.points !== a.points) return b.points - a.points;
      return a.name.localeCompare(b.name);
    });
    
    // Clean up temporary "points" field and update "pos" just in case
    modesData[mode][tierStr] = list.map(item => ({
      uuid: item.uuid,
      name: item.name,
      region: item.region,
      pos: item.pos
    }));
  }
}

// 4. Construct profiles map
const profilesData = {};
overallPlayers.forEach((p, idx) => {
  const profile = {
    uuid: p.uuid,
    name: p.name,
    region: p.region,
    points: p.points,
    overall: idx + 1, // 1-based overall rank
    rankings: p.rankings,
    namemc: `https://namemc.com/profile/${p.uuid}`
  };
  
  // Case-sensitive key
  profilesData[p.name] = profile;
  
  // UUID without hyphens key
  const cleanUuid = p.uuid.replace(/-/g, '').toLowerCase();
  profilesData[cleanUuid] = profile;
});

// Remove points from overall item to match schema exactly
const cleanedOverall = overallPlayers.map(p => ({
  uuid: p.uuid,
  name: p.name,
  region: p.region,
  points: p.points,
  rankings: p.rankings
}));

// Compile full players.json structure
const finalData = {
  overall: cleanedOverall,
  modes: modesData,
  profiles: profilesData
};

fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 2), 'utf8');
console.log(`Successfully generated ${outputFile} with ${cleanedOverall.length} players!`);
