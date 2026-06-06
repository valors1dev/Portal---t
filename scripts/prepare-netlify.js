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

// 1. Copy server-logo.gif to favicon.ico in mctiers.com
copyIfExists(
  path.join(dataDir, 'server-logo.gif'),
  path.join(root, 'favicon.ico')
);

// 2. Copy server-logo.gif (or logo alternatives) to icons/pvpclub.webp etc.
const serverLogoSrc = path.join(dataDir, 'server-logo.gif');
if (fs.existsSync(serverLogoSrc)) {
  copyIfExists(serverLogoSrc, path.join(root, 'icons', 'pvpclub.webp'));
  copyIfExists(serverLogoSrc, path.join(root, 'icons', 'pvpclub.png'));
  copyIfExists(serverLogoSrc, path.join(root, 'icons', 'pvpclub.gif'));
} else {
  // Try server-logo.webp or png
  const serverLogoWebp = path.join(dataDir, 'server-logo.webp');
  const serverLogoPng = path.join(dataDir, 'server-logo.png');
  if (fs.existsSync(serverLogoWebp)) {
    copyIfExists(serverLogoWebp, path.join(root, 'icons', 'pvpclub.webp'));
  } else if (fs.existsSync(serverLogoPng)) {
    copyIfExists(serverLogoPng, path.join(root, 'icons', 'pvpclub.png'));
  }
}

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
