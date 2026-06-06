const https = require("https");
const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "mctiers.com", "docs", "v2-live.html");

https
  .get("https://mctiers.com/docs/v2", { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
    let data = "";
    res.on("data", (c) => (data += c));
    res.on("end", () => {
      fs.writeFileSync(out, data);
      console.log("status", res.statusCode, "bytes", data.length);
      const links = [...data.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
      const interesting = links.filter(
        (u) =>
          u.includes("_next") ||
          u.includes("scalar") ||
          u.includes("openapi") ||
          u.includes("api-reference")
      );
      console.log("interesting links:", [...new Set(interesting)].slice(0, 30));
      console.log(data.slice(0, 2500));
    });
  })
  .on("error", console.error);
