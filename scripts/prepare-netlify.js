const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'mctiers.com');
const dataDir = path.join(__dirname, '..', 'data');

// Helper to copy file if source exists
function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
    return true;
  }
  return false;
}

console.log('Preparing static assets for Netlify...');

// 1. Copy a lightweight icon to favicon.ico in mctiers.com
// Try server-logo.webp (13KB) first, then logo.png (299KB), then fallback to gif
if (!copyIfExists(path.join(dataDir, 'server-logo.webp'), path.join(root, 'favicon.ico'))) {
  if (!copyIfExists(path.join(dataDir, 'logo.png'), path.join(root, 'favicon.ico'))) {
    copyIfExists(path.join(dataDir, 'server-logo.gif'), path.join(root, 'favicon.ico'));
  }
}

// 2. Copy matching format icons to icons/pvpclub.*
copyIfExists(path.join(dataDir, 'server-logo.webp'), path.join(root, 'icons', 'pvpclub.webp'));
copyIfExists(path.join(dataDir, 'server-logo.gif'), path.join(root, 'icons', 'pvpclub.gif'));
copyIfExists(path.join(dataDir, 'logo.png'), path.join(root, 'icons', 'pvpclub.png'));

// 3. Copy logo candidates to nav_skip and logo
const logoCandidates = [
  path.join(dataDir, 'logo.gif'),
  path.join(dataDir, 'logo.webp'),
  path.join(dataDir, 'logo.png')
];

const mainLogo = logoCandidates.find(p => fs.existsSync(p));
if (mainLogo) {
  const ext = path.extname(mainLogo).toLowerCase();
  copyIfExists(mainLogo, path.join(root, 'icons', `nav_skip${ext}`));
  copyIfExists(mainLogo, path.join(root, 'icons', `logo${ext}`));
  
  // Fallbacks if browser requests other formats
  copyIfExists(mainLogo, path.join(root, 'icons', 'nav_skip.png'));
  copyIfExists(mainLogo, path.join(root, 'icons', 'nav_skip.webp'));
  copyIfExists(mainLogo, path.join(root, 'icons', 'logo.webp'));
}

console.log('Static assets prepared successfully for Netlify deployment.');
