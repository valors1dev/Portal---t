const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "mctiers.com");

const replacements = [
  ['<meta name="theme-color" content="#ff0000"/>', '<meta name="theme-color" content="#110620"/>'],
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
        console.log("updated theme-color in", path.relative(root, p));
      }
    }
  }
}

walk(root);
console.log("Theme color replacement completed!");
