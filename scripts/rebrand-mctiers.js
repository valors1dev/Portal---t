const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "mctiers.com");

const replacements = [
  ["MCTIERS - Rankings", "Solitary Tiers - Rankings"],
  ["MCTIERS – Rankings", "Solitary Tiers - Rankings"],
  ["MCTIERS- Rankings", "Solitary Tiers - Rankings"],
  ["SOLITARY TIERS - Rankings", "Solitary Tiers - Rankings"],
  ["MCTIERS", "Solitary Tiers"],
  ["MCTiers", "Solitary Tiers"],
  ["McTiers", "Solitary Tiers"],
  [",mctiers,", ",solitary tiers,"],
  ["mctiers,", "solitary tiers,"],
  [",mctiers", ",solitary tiers"],
  ["minecraft tiers", "solitary tiers"],
  ["mcpvp.club", "xylon.gg"],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (/\.(html|txt|js|json|xml|webmanifest)$/.test(name.name) && !name.name.includes("rebrand-mctiers")) {
      let text = fs.readFileSync(p, "utf8");
      let next = text;
      for (const [from, to] of replacements) {
        if (next.includes(from)) next = next.split(from).join(to);
      }
      if (next !== text) {
        fs.writeFileSync(p, next, "utf8");
        console.log("updated", path.relative(root, p));
      }
    }
  }
}

walk(root);
console.log("done");
