const https = require("https");
const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "mctiers.com", "api", "openapi.json");

https
  .get("https://mctiers.com/api/openapi.json", (res) => {
    let data = "";
    res.on("data", (c) => (data += c));
    res.on("end", () => {
      let t = data
        .replace(/MCTiers/g, "Portal Network")
        .replace(/MCTIERS/g, "PORTAL NETWORK")
        .replace(/Solitary Tiers/g, "Portal Network")
        .replace(/SOLITARY/g, "PORTAL NETWORK")
        .replace(/mctiers\.com/g, "portalnetwork.local")
        .replace(/solitary\.local/g, "portalnetwork.local")
        .replace(/https:\/\/portalnetwork\.local\/api\/v2/g, "/api/v2")
        .replace(/https:\/\/solitary\.local\/api\/v2/g, "/api/v2")
        .replace(/https:\/\/mctiers\.com\/api\/v2/g, "/api/v2");
      fs.writeFileSync(out, t);
      const left = (t.match(/mctiers|solitary/gi) || []).length;
      console.log("openapi saved", t.length, "bytes; remaining mctiers/solitary refs:", left);
    });
  })
  .on("error", console.error);
