const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "mctiers.com");

const replacements = [
  ["Solitary Tiers - Rankings", "Portal Network - Rankings"],
  ["Solitary Tiers - Not Found", "Portal Network - Not Found"],
  ["Solitary Tiers", "Portal Network"],
  ["solitary tiers", "portal network"],
  ["Solitary Server", "Portal Network Server"],
  ["Connecting To Solitary Tiers.com", "Connecting To Portal Network"],
  ["Copyrights © solitary 2026", "Copyrights © Portal Network 2026"],
  ["Copyrights \\u00a9 solitary 2026", "Copyrights \\u00a9 Portal Network 2026"],
  ["solitary 2026", "Portal Network 2026"],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) {
      walk(p);
    } else if (/\.(html|txt|js|json|xml|webmanifest)$/.test(name.name)) {
      let text = fs.readFileSync(p, "utf8");
      let next = text;
      for (const [from, to] of replacements) {
        if (next.includes(from)) {
          next = next.split(from).join(to);
        }
      }
      if (next !== text) {
        fs.writeFileSync(p, next, "utf8");
        console.log("updated", path.relative(root, p));
      }
    }
  }
}

walk(root);
console.log("Rebranding to Portal Network completed!");
