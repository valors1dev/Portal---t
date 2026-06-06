/**
 * Build data/players.json — 5 players, explicit tiers.
 * Run: node scripts/build-players.js
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "data", "players.json");
const SKINS_DIR = path.join(__dirname, "..", "data", "skins");
const SKINS_META = path.join(__dirname, "..", "data", "skins-meta.json");

const POINTS = {
  1: { high: 60, low: 45 },
  2: { high: 30, low: 20 },
  3: { high: 10, low: 6 },
  4: { high: 4, low: 3 },
  5: { high: 2, low: 1 },
};

const OTHER_MODES = ["vanilla", "pot", "uhc", "smp", "nethop", "axe", "mace"];

/** Order = overall rank 1–5. [tier, pos] per mode (pos 0=high, 1=low). */
const PLAYERS = [
  {
    name: "9ry6n",
    region: "AS",
    sword: [1, 0],
    modes: {
      vanilla: [1, 1],
      pot: [1, 0],
      uhc: [1, 0],
      smp: [2, 0],
      nethop: [1, 1],
      axe: [2, 0],
      mace: [1, 0],
    },
  },
  {
    name: "xiots_",
    region: "EU",
    sword: [1, 1],
    modes: {
      vanilla: [1, 0],
      pot: [2, 0],
      uhc: [1, 1],
      smp: [1, 1],
      nethop: [2, 1],
      axe: [1, 0],
      mace: [2, 0],
    },
  },
  {
    name: "yMiau",
    region: "NA",
    sword: [2, 0],
    modes: {
      vanilla: [2, 0],
      pot: [1, 1],
      uhc: [2, 1],
      smp: [2, 0],
      nethop: [1, 0],
      axe: [2, 1],
      mace: [1, 1],
    },
  },
  {
    name: "360Mall",
    region: "AS",
    sword: [2, 1],
    modes: {
      vanilla: [2, 1],
      pot: [2, 0],
      uhc: [2, 0],
      smp: [3, 0],
      nethop: [2, 1],
      axe: [2, 0],
      mace: [2, 1],
    },
  },
  {
    name: "Tqmen",
    region: "EU",
    sword: [3, 0],
    modes: {
      vanilla: [3, 0],
      pot: [2, 1],
      uhc: [3, 1],
      smp: [2, 1],
      nethop: [3, 0],
      axe: [3, 0],
      mace: [2, 0],
    },
  },
];

function rankEntry(tier, pos) {
  return { tier, pos, peak_tier: tier, peak_pos: pos, retired: false };
}

function rankPoints(tier, pos) {
  const row = POINTS[tier];
  if (!row) return 0;
  return pos === 0 ? row.high : row.low;
}

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "PortalNetwork/1.0" } }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode === 204 || res.statusCode === 404) return resolve(null);
          if (res.statusCode !== 200) return reject(new Error(`${url} -> ${res.statusCode}`));
          try {
            resolve(JSON.parse(d));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

function formatUuid(id) {
  if (id.includes("-")) return id;
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

async function resolveUuid(name) {
  const enc = encodeURIComponent(name);
  try {
    const ash = await get(`https://api.ashcon.app/mojang/v2/user/${enc}`);
    if (ash?.uuid) return ash.uuid;
  } catch {
    /* continue */
  }
  try {
    const pdb = await get(`https://playerdb.co/api/player/minecraft/${enc}`);
    if (pdb?.data?.player?.id) return pdb.data.player.id;
  } catch {
    /* continue */
  }
  const data = await get(`https://api.mojang.com/users/profiles/minecraft/${enc}`);
  if (!data?.id) return null;
  return formatUuid(data.id);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "PortalNetwork/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          if (res.statusCode !== 200) return reject(new Error(`download ${res.statusCode}`));
          resolve(Buffer.concat(chunks));
        });
      })
      .on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(SKINS_DIR, { recursive: true });

  const players = [];
  const skinsMeta = {};

  for (const row of PLAYERS) {
    await sleep(350);
    let uuid = await resolveUuid(row.name);
    if (!uuid) {
      console.warn("UUID not found for", row.name, "- using offline placeholder");
      uuid = `00000000-0000-4000-8000-${row.name.slice(0, 12).padEnd(12, "0").replace(/[^a-f0-9]/gi, "0").slice(0, 12)}`;
    }

    const rankings = {
      sword: rankEntry(row.sword[0], row.sword[1]),
    };
    for (const mode of OTHER_MODES) {
      const [tier, pos] = row.modes[mode];
      rankings[mode] = rankEntry(tier, pos);
    }

    let points = 0;
    for (const r of Object.values(rankings)) {
      points += rankPoints(r.tier, r.pos);
    }

    const isPlaceholder = uuid.startsWith("00000000-0000-4000");
    const namemc = isPlaceholder
      ? `https://namemc.com/search?q=${encodeURIComponent(row.name)}`
      : `https://namemc.com/profile/${uuid}`;
    const skinRender = isPlaceholder
      ? `https://minotar.net/bust/${encodeURIComponent(row.name)}/128`
      : `https://render.crafty.gg/3d/bust/${uuid}`;
    skinsMeta[row.name] = { uuid, name: row.name, namemc, skinRender, isPlaceholder };

    try {
      const img = await download(skinRender);
      const ext = isPlaceholder ? "png" : "webp";
      fs.writeFileSync(path.join(SKINS_DIR, `${uuid}.${ext}`), img);
      console.log("skin saved", row.name, isPlaceholder ? "(minotar)" : "");
    } catch (e) {
      console.warn("skin download failed", row.name, e.message);
    }

    players.push({
      uuid,
      name: row.name,
      region: row.region,
      points,
      rankings,
    });
  }

  players.sort((a, b) => b.points - a.points);
  players.forEach((p, i) => {
    p.overall = i + 1;
  });

  const modes = { sword: {}, pot: {}, vanilla: {}, uhc: {}, smp: {}, nethop: {}, axe: {}, mace: {} };
  for (const mode of Object.keys(modes)) {
    for (const p of players) {
      const r = p.rankings[mode];
      if (!r) continue;
      const key = String(r.tier);
      if (!modes[mode][key]) modes[mode][key] = [];
      modes[mode][key].push({
        uuid: p.uuid,
        name: p.name,
        region: p.region,
        pos: r.pos,
      });
    }
    for (const tier of Object.keys(modes[mode])) {
      modes[mode][tier].sort((a, b) => a.pos - b.pos);
    }
  }

  const overall = players.map(({ uuid, name, region, points, rankings }) => ({
    uuid,
    name,
    region,
    points,
    rankings,
  }));

  const profiles = {};
  for (const p of players) {
    profiles[p.name] = {
      uuid: p.uuid,
      name: p.name,
      region: p.region,
      points: p.points,
      overall: p.overall,
      rankings: p.rankings,
      namemc: skinsMeta[p.name].namemc,
    };
    profiles[p.uuid.replace(/-/g, "")] = profiles[p.name];
  }

  const out = { overall, modes, profiles };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  fs.writeFileSync(SKINS_META, JSON.stringify(skinsMeta, null, 2));
  console.log("Wrote", OUT, "with", players.length, "players");
  players.forEach((p) => console.log(`  #${p.overall} ${p.name} (${p.region}) — ${p.points} pts`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
