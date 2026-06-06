const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "mctiers.com");

const replacements = [
  ["xylon.gg", "portalnetwork.fun"],
  ["XYLON.GG", "PORTALNETWORK.FUN"],
  ["Xylon.gg", "Portalnetwork.fun"],
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
console.log("Replacing Server IP to portalnetwork.fun completed!");
