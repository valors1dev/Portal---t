/**
 * scripts/prepare_skins.js
 * Pre-cache skins on disk to eliminate frontend lag:
 * 1. For cracked/placeholder players: copy the cat hoodie Steve skin (sx.webp)
 * 2. For premium players: download the 3D bust skin from render.crafty.gg
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const dataDir = path.join(__dirname, '..', 'data');
const skinsDir = path.join(dataDir, 'skins');
const skinsMetaFile = path.join(dataDir, 'skins-meta.json');
const crackedSrc = 'C:\\Users\\EXPERT\\Desktop\\portal network image locations\\sx.webp';

if (!fs.existsSync(skinsDir)) {
  fs.mkdirSync(skinsDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'PortalNetworkSkins/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => resolve(false));
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    });
    req.on('error', () => {
      file.close();
      fs.unlink(dest, () => resolve(false));
      resolve(false);
    });
    req.setTimeout(5000, () => {
      req.destroy();
      file.close();
      fs.unlink(dest, () => resolve(false));
      resolve(false);
    });
  });
}

async function main() {
  if (!fs.existsSync(skinsMetaFile)) {
    console.error("skins-meta.json not found!");
    process.exit(1);
  }

  if (!fs.existsSync(crackedSrc)) {
    console.error(`sx.webp not found at ${crackedSrc}!`);
    process.exit(1);
  }

  const meta = JSON.parse(fs.readFileSync(skinsMetaFile, 'utf8'));
  const entries = Object.values(meta);
  console.log(`Processing ${entries.length} player skins...`);

  let crackedCount = 0;
  let premiumCount = 0;
  let downloaded = 0;
  let failed = 0;

  for (const p of entries) {
    const uuid = p.uuid;
    const name = p.name;
    const isPlaceholder = p.isPlaceholder || uuid.startsWith("00000000-0000-4000-8000-");
    const destWebp = path.join(skinsDir, `${uuid}.webp`);
    const destPng = path.join(skinsDir, `${uuid}.png`);

    if (isPlaceholder) {
      // Cracked player -> Copy sx.webp
      try {
        fs.copyFileSync(crackedSrc, destWebp);
        crackedCount++;
      } catch (e) {
        console.error(`Failed to copy sx.webp for ${name}:`, e.message);
      }
    } else {
      // Premium player -> Download skin from crafty.gg
      premiumCount++;
      // Check if already cached (either webp or png)
      if (fs.existsSync(destWebp) || fs.existsSync(destPng)) {
        continue;
      }
      const url = `https://render.crafty.gg/3d/bust/${uuid}`;
      console.log(`Downloading premium skin for ${name} (${uuid})...`);
      const ok = await downloadImage(url, destWebp);
      if (ok) {
        downloaded++;
      } else {
        console.log(`  Failed to download skin for ${name}, will copy sx.webp as fallback.`);
        try {
          fs.copyFileSync(crackedSrc, destWebp);
          failed++;
        } catch {}
      }
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100));
    }
  }

  console.log(`\nSkins preparation complete!`);
  console.log(`- Cracked players set to cat hoodie (sx.webp): ${crackedCount}`);
  console.log(`- Premium players processed: ${premiumCount}`);
  console.log(`- Premium skins downloaded: ${downloaded}`);
  console.log(`- Premium fallbacks copied: ${failed}`);
}

main().catch(console.error);
