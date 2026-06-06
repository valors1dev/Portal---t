const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "mctiers.com");
const replacements = [
  ["Copyrights © mctiers 2025", "Copyrights © Portal Network 2026"],
  ["Copyrights \\u00a9 mctiers 2025", "Copyrights \\u00a9 Portal Network 2026"],
  ["mctiers 2025", "Portal Network 2026"],
  ["Copyrights © solitary 2026", "Copyrights © Portal Network 2026"],
  ["Copyrights \\u00a9 solitary 2026", "Copyrights \\u00a9 Portal Network 2026"],
  ["solitary 2026", "Portal Network 2026"],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (/\.(html|txt|js)$/.test(name.name) && !p.includes("fix-copyright")) {
      let text = fs.readFileSync(p, "utf8");
      let changed = false;
      for (const [from, to] of replacements) {
        if (text.includes(from)) {
          text = text.split(from).join(to);
          changed = true;
        }
      }
      if (!changed) continue;
      fs.writeFileSync(p, text);
      console.log("updated", path.relative(root, p));
    }
  }
}

walk(root);
