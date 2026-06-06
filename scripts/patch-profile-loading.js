const fs = require("fs");
const path = require("path");

const files = [
  "mctiers.com/_next/static/chunks/3e4bbaeb079a9ddd.js",
  "mctiers.com/_next/static/chunks/413b08870613ebfa.js",
];

for (const rel of files) {
  const p = path.join(__dirname, "..", rel);
  let text = fs.readFileSync(p, "utf8");
  const before = text;
  text = text.replace(
    /children: e \? \(0, t\.jsxs\)\(t\.Fragment, \{\s*children: \[\(0, t\.jsxs\)\("div", \{/g,
    'children: e && !P ? (0, t.jsxs)(t.Fragment, {\n                                children: [(0, t.jsxs)("motion.div", {'
  );
  if (text === before) {
    text = text.replace(
      "children: e ? (0, t.jsxs)(t.Fragment, {\n                                children: [(0, t.jsxs)(\"motion.div\", {",
      "children: e && !P ? (0, t.jsxs)(t.Fragment, {\n                                children: [(0, t.jsxs)(\"motion.div\", {"
    );
  }
  // Second section (POSITION / TIERS)
  text = text.replace(
    /className: "w-full h-fit space-y-6",\s*children: e \?/g,
    'className: "w-full h-fit space-y-6",\n                            children: e && !P ?'
  );
  if (text !== before) {
    fs.writeFileSync(p, text);
    console.log("patched", rel);
  } else {
    console.log("no change", rel);
  }
}
