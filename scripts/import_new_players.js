/**
 * import_new_players.js
 * Converts the new Discord-format player data into the players.json structure.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const dataDir = path.join(__dirname, "..", "data");
const playersFile = path.join(dataDir, "players.json");
const skinsMetaFile = path.join(dataDir, "skins-meta.json");

// ── Input data ──────────────────────────────────────────────────────────────
const rawInput = {
  "1472416768512495777": { discordTag: "__blazenyx", minecraftUsername: "__BlazeNYX", region: "AS/AU", accountType: "Cracked", ranks: { "Mace": "LT3" } },
  "1186708282203709584": { discordTag: "echosensei.exe", minecraftUsername: "The_Echo_Sensei", region: "AS", accountType: "Premium" },
  "1495829308285911053": { discordTag: "byteelite.", minecraftUsername: "ByteElite05", region: "As", accountType: "Cracked" },
  "1379293765205754018": { discordTag: "flickwarsyt", minecraftUsername: "PhanomPlayzz", region: "AS", accountType: "CRACKED", waitlist: true, gamemode: "sword" },
  "1456894469235544199": { discordTag: "anirudh_70157", minecraftUsername: "AnirudhXD", region: "AS", accountType: "premium", waitlist: true, gamemode: "sword", ranks: {} },
  "1479601840600645694": { discordTag: "azanxd_12", minecraftUsername: "4kaiido", region: "as", accountType: "both", waitlist: true, gamemode: "nethop", ranks: {} },
  "1109045706938929214": { discordTag: "gameomenia1234", minecraftUsername: "DraxoGamerYT", region: "AS", accountType: "Premium", waitlist: true, gamemode: "smp", ranks: {} },
  "1359616175214035237": { discordTag: "suleman_zyl0nx_85707", minecraftUsername: "Test", region: "Idk", accountType: "Cracked", waitlist: true, gamemode: "mace", ranks: {} },
  "1185969656394158162": { discordTag: "happy67._.", minecraftUsername: "VoltxD_", region: "AS", accountType: "Premium", waitlist: true, gamemode: "nethop", ranks: {} },
  "1443977882593398952": { discordTag: "0sasuke01", minecraftUsername: "Sasuke_Plays", region: "As", accountType: "Crack", waitlist: false, ranks: {} },
  "1440315813663080653": { discordTag: "it4chi_uchih4.", minecraftUsername: "_M4D4R4", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1414250389745827931": { discordTag: "faizzog", minecraftUsername: "Aisha_op", region: "As", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1456173567212257394": { discordTag: "sambhav_12.", minecraftUsername: "Axxoryn", region: "As", accountType: "Premium", waitlist: true, gamemode: "pot", ranks: {} },
  "1195949750877421579": { discordTag: "darks_shadows1", minecraftUsername: "Darks_Shadows", region: "AS", accountType: "Premium", waitlist: false, ranks: {} },
  "1398972988996714617": { discordTag: "hamidplayz7", minecraftUsername: "HamiPlayZ", region: "A.S", accountType: "Cracked", waitlist: true, gamemode: "mace", ranks: {} },
  "1308809540342517800": { discordTag: "mr_shivam1334", minecraftUsername: "CS_SHIVAM", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1329474926251479090": { discordTag: "virataura_47858", minecraftUsername: "CreationIsLive", region: "as", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1280560796132315335": { discordTag: "purpleswing", minecraftUsername: "AKinfinitezzz", region: "AS", accountType: "Cracked", waitlist: false, ranks: {} },
  "1493936034004598956": { discordTag: "era2306", minecraftUsername: "Era_Plays23", region: "AS", accountType: "CRACKED", waitlist: true, gamemode: "sword", ranks: {} },
  "1420385273971216424": { discordTag: "shadow_strike804", minecraftUsername: "RafyPlayz", region: "AS", accountType: "Premium", waitlist: true, gamemode: "nethop", ranks: {} },
  "1449606186327609486": { discordTag: "axen.exe", minecraftUsername: "IconicH4sib", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1367599121644654694": { discordTag: "zapdoyt", minecraftUsername: "ZapDo_YT", region: "As", accountType: "Premium", waitlist: true, gamemode: "sword", ranks: {} },
  "1124112619821858887": { discordTag: "ds_dragonyt9", minecraftUsername: "Ripxo69Gamer", region: "AS", accountType: "Premium", waitlist: true, gamemode: "mace", ranks: {} },
  "889476095693434920":  { discordTag: "zoomapro1144", minecraftUsername: "SensiXD", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "mace", ranks: {} },
  "1484552943817723926": { discordTag: "noiripper.exe", minecraftUsername: "RipperSensei", region: "AS", accountType: "Premium", waitlist: true, gamemode: "mace", ranks: {} },
  "1105434073868029972": { discordTag: "flam1fied", minecraftUsername: "Flamiifiied", region: "AS", accountType: "Cracked", waitlist: false, ranks: {} },
  "1361247361652756641": { discordTag: "the_ay4n", minecraftUsername: "The_Ay4n", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "uhc", ranks: {} },
  "1203664633148219395": { discordTag: "hawre_123", minecraftUsername: "hawrekurdish102", region: "EU", accountType: "cracked", waitlist: true, gamemode: "mace", ranks: {} },
  "1485839356961751121": { discordTag: "miskatalam_", minecraftUsername: "NotDaddyMiskat", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1048968741121179679": { discordTag: "68np", minecraftUsername: "Aizer_xD", region: "As", accountType: "Premium", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1482001667174957078": { discordTag: "arjun._021", minecraftUsername: "SPARZKTURN", region: "Asia", accountType: "PREMIUM", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1498702691109699726": { discordTag: "lt3crystal", minecraftUsername: "ItzNoman25", region: "NA", accountType: "Cracked", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1460459117981470834": { discordTag: "taznixyt", minecraftUsername: "TaznixYT_", region: "AS", accountType: "Cracked", waitlist: false, ranks: {} },
  "1258408097538637887": { discordTag: "susgamer_legend", minecraftUsername: "x21xWasTaken", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1478261681129000971": { discordTag: "suprim688_29495", minecraftUsername: "RIP_Skk", region: "as", accountType: "cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1266653277332963390": { discordTag: "nahin_psd", minecraftUsername: "Nahin1233", region: "As", accountType: "Cracked", waitlist: false, ranks: {} },
  "1501613562358005900": { discordTag: "_lyric_xd_", minecraftUsername: "LYRICXDOLT4", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1350426166196179015": { discordTag: "luffygamerz1882", minecraftUsername: ".LuffyGamerz1182", region: "AS", accountType: "Premium", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1499061366768537861": { discordTag: "nanu07137", minecraftUsername: "ANMOL_GAMERZ", region: "As", accountType: "Cracked", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1421355960693428324": { discordTag: "yuvraj9990663", minecraftUsername: "yuvraj999", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1318576620604358794": { discordTag: "r.s_gamer23", minecraftUsername: "VoiDxRS", region: "AS", accountType: "Premium", waitlist: false, ranks: {} },
  "963086640027414638":  { discordTag: "toofast_1", minecraftUsername: "SkibiddyVanity", region: "As", accountType: "Premium", waitlist: true, gamemode: "mace", ranks: {} },
  "1489949405263040623": { discordTag: "notflexxyog", minecraftUsername: "FlexxyXP", region: "AS", accountType: "Premium", waitlist: true, gamemode: "smp", ranks: {} },
  "1427575094393307148": { discordTag: "valtheron_.", minecraftUsername: "Valtheron", region: "As", accountType: "Cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1274656646559174667": { discordTag: "m6rgamer", minecraftUsername: "Feyzo_", region: "AS", accountType: "both", waitlist: true, gamemode: "smp", ranks: {} },
  "1485975531924095047": { discordTag: "malfunctionous", minecraftUsername: "unrealArcn", region: "As", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1398760860242939986": { discordTag: "crafty12345_", minecraftUsername: "DemonKing522", region: "AS", accountType: "Cracked", waitlist: false, ranks: {} },
  "1434451480718475316": { discordTag: "adanking0420_36079", minecraftUsername: "Senpa_Playz", region: "ASIA", accountType: "Cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1044961970798993538": { discordTag: "gamerrajan", minecraftUsername: "RajaVerse", region: "AS/AU", accountType: "Cracked", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1355953554719772822": { discordTag: "rijuff0849_61886", minecraftUsername: "Riju_playz#", region: "As", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1391601285291048963": { discordTag: "nishanog_0860", minecraftUsername: "ShivamPlayz_", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "sword", ranks: {} },
  "1507031725853638807": { discordTag: "strenght_yt_88277", minecraftUsername: "STRENGHT_YT", region: "EU", accountType: "Preium", waitlist: false, ranks: {} },
  "1232538541817335808": { discordTag: "monkey_thepvper", minecraftUsername: "Itz_BlinkStrike", region: "AS", accountType: "Cracked", waitlist: false, ranks: {} },
  "1444259969246691331": { discordTag: "arxxchizz", minecraftUsername: "arChizZzz", region: "AS", accountType: "Craked", waitlist: true, gamemode: "sword", ranks: {} },
  "1183303957502754816": { discordTag: "3x3gaming", minecraftUsername: "3x3gaming", region: "As", accountType: "Premium", waitlist: true, gamemode: "mace", ranks: {} },
  "1226130217970438144": { discordTag: "_blueicefrost_", minecraftUsername: "BlueIceFrost", region: "AS", accountType: "premium", waitlist: false, ranks: {} },
  "1392016392441696317": { discordTag: "havadonyt", minecraftUsername: "Havadon_YT", region: "AS", accountType: "Cracked", waitlist: true, gamemode: "mace", ranks: {} },
  "1304384724495634467": { discordTag: "eagle_anant_23", minecraftUsername: "Eagle_Anant", region: "As", accountType: "premium", waitlist: true, gamemode: "nethop", ranks: {} },
  "1320343327723491332": { discordTag: "skyascute", minecraftUsername: "TOXIC_4C3", region: "AS", accountType: "Premium", waitlist: true, gamemode: "nethop", ranks: {} },
  "1450027860998754417": { discordTag: "xvertrex", minecraftUsername: "_NgsYash_", region: "As", accountType: "Cracked", waitlist: true, gamemode: "vanilla", ranks: {} },
  "862274969160646688":  { discordTag: "jayopkillersg", minecraftUsername: "JayOp21", region: "AS", accountType: "Premium", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1440493776421261494": { discordTag: "gamergx_yt.", minecraftUsername: "GAMERGX_YT", region: "INDIA IDK REGION", accountType: "Cracked", waitlist: true, gamemode: "nethop", ranks: {} },
  "1099327976522395649": { discordTag: "backbag6969", minecraftUsername: "OGMINERZ", region: "as", accountType: "Premium", waitlist: true, gamemode: "vanilla", ranks: {} },
  "1273582196577271894": { discordTag: "alons_boy4", minecraftUsername: "itz_ishu", region: "As", accountType: "Cracked", waitlist: false, ranks: {} },
  "1378313151988371526": { discordTag: "prime_marhan", minecraftUsername: "Sv2Bladeezr", region: "AS", accountType: "Premium", waitlist: true, gamemode: "sword", ranks: {} },
  "1217825431781117973": { discordTag: "simplydhruv_", minecraftUsername: "Wild_Mish", region: "AS", accountType: "Premium", waitlist: true, gamemode: "mace", ranks: {} },
  "980909211032645632":  { discordTag: "hisokazen_", minecraftUsername: "St4enth", region: "AS", accountType: "premium", waitlist: true, gamemode: "sword", ranks: {} },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function normalizeRegion(r) {
  if (!r || typeof r !== "string") return "Unknown";
  const u = r.trim().toUpperCase();
  if (u === "IDK" || u === "UNKNOWN" || u.includes("INDIA")) return "AS";
  if (u.startsWith("AS")) return "AS";
  if (u.startsWith("EU")) return "EU";
  if (u === "NA") return "NA";
  if (u === "AU") return "AU";
  return "AS"; // default fallback
}

// Generate a deterministic offline UUID from the player's name
function offlineUuid(name) {
  // Simple deterministic hash-based UUID
  let hash = 0;
  const str = "OfflinePlayer:" + name;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  const h1 = Math.abs(hash).toString(16).padStart(8, "0");
  const h2 = Math.abs(hash * 31 + 7).toString(16).padStart(4, "0");
  const h3 = Math.abs(hash * 13 + 3).toString(16).padStart(4, "0");
  const h4 = Math.abs(hash * 7  + 11).toString(16).padStart(4, "0");
  const h5 = Math.abs(hash * 17 + 19).toString(16).padStart(12, "0");
  return `${h1.slice(0,8)}-${h2.slice(0,4)}-4${h3.slice(0,3)}-8${h4.slice(0,3)}-${h5.slice(0,12)}`;
}

function parseRank(rankStr) {
  if (!rankStr || typeof rankStr !== "string") return null;
  const m = rankStr.trim().match(/^(HT|LT)(\d+)$/i);
  if (!m) return null;
  const isHT = m[1].toUpperCase() === "HT";
  const tier  = parseInt(m[2], 10);
  const pos   = isHT ? 0 : 1;
  // Points: HT1=200, LT1=180, HT2=160, LT2=140, HT3=120, LT3=100, ...
  const points = Math.max(0, 220 - tier * 40 + (isHT ? 20 : 0));
  return { tier, pos, points };
}

function isPremium(accountType) {
  const t = (accountType || "").toLowerCase();
  return t === "premium" || t === "both";
}

// HTTP fetch with timeout
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

async function resolveUuid(name, premium) {
  if (!premium) return null;
  const enc = encodeURIComponent(name);
  // Try ashcon first (fast)
  try {
    const r = await fetchJson(`https://api.ashcon.app/mojang/v2/user/${enc}`, 800);
    if (r?.uuid) return r.uuid;
  } catch {}
  // Try playerdb
  try {
    const r = await fetchJson(`https://playerdb.co/api/player/minecraft/${enc}`, 800);
    if (r?.data?.player?.id) return r.data.player.id;
  } catch {}
  // Try mojang
  try {
    const r = await fetchJson(`https://api.mojang.com/users/profiles/minecraft/${enc}`, 800);
    if (r?.id) {
      const id = r.id;
      return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`;
    }
  } catch {}
  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Load existing skins-meta
  let skinsMeta = {};
  if (fs.existsSync(skinsMetaFile)) {
    try { skinsMeta = JSON.parse(fs.readFileSync(skinsMetaFile, "utf8")); } catch {}
  }

  const allModes = ["sword", "pot", "vanilla", "uhc", "smp", "nethop", "axe", "mace"];
  const players = Object.values(rawInput);

  console.log(`Processing ${players.length} players...`);

  // Batch-resolve UUIDs (premium only), 8 at a time
  const batchSize = 8;
  const resolved = [];

  for (let i = 0; i < players.length; i += batchSize) {
    const batch = players.slice(i, i + batchSize);
    await Promise.all(batch.map(async (p) => {
      const name = p.minecraftUsername.trim();
      const region = normalizeRegion(p.region);
      const premium = isPremium(p.accountType);

      // Parse ranks
      const rankings = {};
      let totalPoints = 0;
      for (const [modeRaw, rankStr] of Object.entries(p.ranks || {})) {
        const mode = modeRaw.toLowerCase();
        if (!allModes.includes(mode)) continue;
        const parsed = parseRank(rankStr);
        if (!parsed) continue;
        rankings[mode] = {
          tier: parsed.tier,
          pos: parsed.pos,
          peak_tier: parsed.tier,
          peak_pos: parsed.pos,
          retired: false
        };
        totalPoints += parsed.points;
      }

      // UUID resolution
      let uuid, isPlaceholder;
      if (skinsMeta[name]) {
        uuid = skinsMeta[name].uuid;
        isPlaceholder = skinsMeta[name].isPlaceholder;
      } else {
        const realUuid = await resolveUuid(name, premium);
        if (realUuid) {
          uuid = realUuid;
          isPlaceholder = false;
        } else {
          uuid = offlineUuid(name);
          isPlaceholder = true;
        }
      }

      const skinRender = isPlaceholder
        ? `/skins/${uuid}.webp`
        : `https://render.crafty.gg/3d/bust/${uuid}`;

      const namemc = isPlaceholder
        ? `https://namemc.com/search?q=${encodeURIComponent(name)}`
        : `https://namemc.com/profile/${uuid}`;

      skinsMeta[name] = { uuid, name, namemc, skinRender, isPlaceholder };

      resolved.push({ uuid, name, region, points: totalPoints, rankings, namemc });
      console.log(`  [${premium ? "Premium" : "Cracked"}] ${name} → ${uuid} | pts=${totalPoints}`);
    }));

    // Small gap between batches to be polite to APIs
    if (i + batchSize < players.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  // Sort: by points desc, then name asc
  resolved.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  // Build modes data
  const modesData = {};
  for (const m of allModes) modesData[m] = {};

  for (const p of resolved) {
    for (const [mode, rankObj] of Object.entries(p.rankings)) {
      const tierStr = String(rankObj.tier);
      if (!modesData[mode][tierStr]) modesData[mode][tierStr] = [];
      modesData[mode][tierStr].push({
        uuid: p.uuid,
        name: p.name,
        region: p.region,
        pos: rankObj.pos
      });
    }
  }

  // Sort within tiers: HT (pos 0) before LT (pos 1), then by name
  for (const mode of allModes) {
    for (const tierStr of Object.keys(modesData[mode])) {
      modesData[mode][tierStr].sort((a, b) => a.pos - b.pos || a.name.localeCompare(b.name));
    }
  }

  // Build profiles
  const profilesData = {};
  resolved.forEach((p, idx) => {
    const profile = {
      uuid: p.uuid,
      name: p.name,
      region: p.region,
      points: p.points,
      overall: idx + 1,
      rankings: p.rankings,
      namemc: p.namemc
    };
    profilesData[p.name] = profile;
    profilesData[p.uuid.replace(/-/g, "").toLowerCase()] = profile;
  });

  const finalData = {
    overall: resolved.map((p) => ({
      uuid: p.uuid,
      name: p.name,
      region: p.region,
      points: p.points,
      rankings: p.rankings
    })),
    modes: modesData,
    profiles: profilesData
  };

  fs.writeFileSync(playersFile, JSON.stringify(finalData, null, 2), "utf8");
  fs.writeFileSync(skinsMetaFile, JSON.stringify(skinsMeta, null, 2), "utf8");

  console.log(`\n✅ Done! ${resolved.length} players written to players.json`);
  console.log(`   ${resolved.filter(p => Object.keys(p.rankings).length > 0).length} players have ranks`);
  console.log(`   ${resolved.filter(p => !skinsMeta[p.name]?.isPlaceholder).length} premium UUIDs resolved`);
}

main().catch(console.error);
