const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "mctiers.com");
const target = "Copyrights \u00a9 Portal Network 2026";

const patterns = [
  /Copyrights\s*(?:&copy;|©|\u00a9|Â©|Ã‚Â©|Ã‚©|Ã\u0082\u00a9)\s*(?:solitary|mctiers)\s*(?:2025|2026)/gi,
  /Copyrights\\u00a9\s*(?:solitary|mctiers)\s*(?:2025|2026)/gi,
];

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (/\.(html|txt)$/.test(name.name)) {
      let text = fs.readFileSync(p, "utf8");
      let next = text;
      for (const re of patterns) {
        next = next.replace(re, target);
      }
      if (next !== text) {
        fs.writeFileSync(p, next, "utf8");
        console.log("updated", path.relative(root, p));
      }
    }
  }
}

walk(root);
