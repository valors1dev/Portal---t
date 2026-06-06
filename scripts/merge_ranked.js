/**
 * merge_ranked.js
 * Smart merge: updates existing players' ranks & adds brand new players.
 * Uses overallPoints directly from the input data.
 */
const fs   = require("fs");
const path = require("path");
const https = require("https");

const dataDir       = path.join(__dirname, "..", "data");
const playersFile   = path.join(dataDir, "players.json");
const skinsMetaFile = path.join(dataDir, "skins-meta.json");
const inputFile     = path.join(dataDir, "ranked_import.json");

const allModes = ["sword","pot","vanilla","uhc","smp","nethop","axe","mace"];

// ── helpers ───────────────────────────────────────────────────────────────
function normalizeRegion(r) {
  if (!r) return "Unknown";
  const u = r.trim().toUpperCase();
  if (["IDK","UNKNOWN","INDIA IDK REGION","ASIA"].includes(u) || u.includes("INDIA")) return "AS";
  if (u.startsWith("AS") || u === "A.S") return "AS";
  if (u.startsWith("EU")) return "EU";
  if (u === "NA") return "NA";
  if (u === "AU") return "AU";
  return "Unknown";
}

function parseRank(rankStr) {
  if (!rankStr || typeof rankStr !== "string") return null;
  const m = rankStr.trim().match(/^(HT|LT)(\d+)$/i);
  if (!m) return null;
  const isHT = m[1].toUpperCase() === "HT";
  return { tier: parseInt(m[2], 10), pos: isHT ? 0 : 1 };
}

function normalizeModeName(raw) {
  const map = {
    sword:"sword", pot:"pot", vanilla:"vanilla", uhc:"uhc",
    smp:"smp", nethop:"nethop", axe:"axe", mace:"mace",
    nethod:"nethop", "neth op":"nethop"
  };
  return map[raw.toLowerCase()] || null;
}

function offlineUuid(name) {
  let hash = 0;
  const str = "OfflinePlayer:" + name;
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  const h = (n) => Math.abs(n).toString(16).padStart(12, "0");
  return `${h(hash).slice(0,8)}-${h(hash*31+7).slice(0,4)}-4${h(hash*13+3).slice(0,3)}-8${h(hash*7+11).slice(0,3)}-${h(hash*17+19).slice(0,12)}`;
}

function fetchJson(url, ms=900) {
  return new Promise(resolve => {
    const req = https.get(url, {headers:{"User-Agent":"PortalNetwork/1.0"}}, res => {
      let d = ""; res.on("data",c=>d+=c);
      res.on("end", () => { if(res.statusCode!==200) return resolve(null); try{resolve(JSON.parse(d))}catch{resolve(null)} });
    });
    req.on("error",()=>resolve(null));
    req.setTimeout(ms,()=>{req.destroy();resolve(null)});
  });
}

async function resolveUuid(name) {
  const enc = encodeURIComponent(name);
  try { const r = await fetchJson(`https://api.ashcon.app/mojang/v2/user/${enc}`,900); if(r?.uuid) return r.uuid; } catch{}
  try { const r = await fetchJson(`https://api.mojang.com/users/profiles/minecraft/${enc}`,900); if(r?.id){const id=r.id;return`${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`;} } catch{}
  return null;
}

// ── load existing data ────────────────────────────────────────────────────
const existing = fs.existsSync(playersFile) ? JSON.parse(fs.readFileSync(playersFile, "utf8")) : { overall: [] };
const skinsMeta = fs.existsSync(skinsMetaFile) ? JSON.parse(fs.readFileSync(skinsMetaFile,"utf8")) : {};
const newData   = JSON.parse(fs.readFileSync(inputFile,"utf8"));

// Build lookup: name (case-insensitive) → existing player entry
const existingByName = new Map();
for (const p of existing.overall) {
  existingByName.set(p.name.toLowerCase(), p);
}

async function main() {
  console.log(`Input: ${newData.length} entries | Existing: ${existing.overall.length} players`);

  const mergedMap = new Map(); // name.lower → final entry

  // Start fresh without old mock players to ensure only new ones are populated


  // Batch-process new data
  const batchSize = 10;
  let added = 0, updated = 0;

  for (let i = 0; i < newData.length; i += batchSize) {
    const batch = newData.slice(i, i + batchSize);
    await Promise.all(batch.map(async inp => {
      const name    = inp.minecraftUsername.trim();
      const nameKey = name.toLowerCase();
      const region  = normalizeRegion(inp.region);
      const points  = Number(inp.overallPoints) || 0;

      // Parse ranks
      const rankings = {};
      for (const [modeRaw, rankStr] of Object.entries(inp.ranks || {})) {
        const mode = normalizeModeName(modeRaw);
        if (!mode) continue;
        const parsed = parseRank(rankStr);
        if (!parsed) continue;
        rankings[mode] = { tier: parsed.tier, pos: parsed.pos, peak_tier: parsed.tier, peak_pos: parsed.pos, retired: false };
      }

      if (mergedMap.has(nameKey)) {
        // UPDATE existing — always overwrite rankings from new data
        // If bot has no ranks, clear the website rankings too.
        const old = mergedMap.get(nameKey);
        mergedMap.set(nameKey, {
          ...old,
          region: region !== "Unknown" ? region : old.region,
          points: points > 0 ? points : old.points,
          rankings: rankings
        });
        updated++;
      } else {
        // NEW player — resolve UUID
        let uuid, isPlaceholder;
        if (skinsMeta[name]) {
          uuid = skinsMeta[name].uuid;
          isPlaceholder = skinsMeta[name].isPlaceholder;
        } else {
          const real = await resolveUuid(name);
          if (real) { uuid = real; isPlaceholder = false; }
          else      { uuid = offlineUuid(name); isPlaceholder = true; }
        }

        const namemc    = isPlaceholder ? `https://namemc.com/search?q=${encodeURIComponent(name)}` : `https://namemc.com/profile/${uuid}`;
        const skinRender = `https://render.crafty.gg/3d/bust/${uuid}`;

        skinsMeta[name] = { uuid, name, namemc, skinRender, isPlaceholder };
        mergedMap.set(nameKey, { uuid, name, region, points, rankings });
        added++;
        console.log(`  [NEW] ${name} → ${uuid} | pts=${points}`);
      }
    }));
    await new Promise(r => setTimeout(r, 150));
  }

  // Build final array sorted by points desc, then name
  const finalList = [...mergedMap.values()].sort((a,b) => b.points - a.points || a.name.localeCompare(b.name));

  // Build modes
  const modesData = {};
  for (const m of allModes) modesData[m] = {};
  for (const p of finalList) {
    for (const [mode, rankObj] of Object.entries(p.rankings || {})) {
      const t = String(rankObj.tier);
      if (!modesData[mode][t]) modesData[mode][t] = [];
      modesData[mode][t].push({ uuid: p.uuid, name: p.name, region: p.region, pos: rankObj.pos });
    }
  }
  for (const mode of allModes) {
    for (const t of Object.keys(modesData[mode])) {
      modesData[mode][t].sort((a,b) => a.pos - b.pos || a.name.localeCompare(b.name));
    }
  }

  // Build profiles
  const profilesData = {};
  finalList.forEach((p, idx) => {
    const meta    = skinsMeta[p.name] || {};
    const namemc  = meta.namemc || `https://namemc.com/search?q=${encodeURIComponent(p.name)}`;
    const profile = { uuid: p.uuid, name: p.name, region: p.region, points: p.points, overall: idx+1, rankings: p.rankings, namemc };
    profilesData[p.name] = profile;
    profilesData[(p.uuid||"").replace(/-/g,"").toLowerCase()] = profile;
  });

  const out = {
    overall: finalList.map(p => ({ uuid: p.uuid, name: p.name, region: p.region, points: p.points, rankings: p.rankings })),
    modes: modesData,
    profiles: profilesData
  };

  fs.writeFileSync(playersFile,   JSON.stringify(out, null, 2), "utf8");
  fs.writeFileSync(skinsMetaFile, JSON.stringify(skinsMeta, null, 2), "utf8");

  const withRanks = finalList.filter(p => Object.keys(p.rankings||{}).length > 0).length;
  console.log(`\n✅ Done!`);
  console.log(`   Total players : ${finalList.length}`);
  console.log(`   With ranks    : ${withRanks}`);
  console.log(`   New added     : ${added}`);
  console.log(`   Ranks updated : ${updated}`);
}

main().catch(console.error);
