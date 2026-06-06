const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const urlPath = decodeURIComponent(event.path);
  const skinMatch = urlPath.match(/^\/skins\/([0-9a-f-]+(?:-[0-9a-f]+)*)\.(webp|png)$/i);
  
  if (!skinMatch) {
    return {
      statusCode: 400,
      body: "Invalid skin request format"
    };
  }
  
  const id = skinMatch[1];
  
  // If it's a placeholder UUID (starts with 00000000-0000-4000-8000-), serve local placeholder
  if (id.startsWith("00000000-0000-4000-8000-")) {
    try {
      const fallbackPath = path.join(process.cwd(), 'data', 'skins', 'sx.webp');
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath);
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "image/webp",
            "Cache-Control": "public, max-age=86400"
          },
          body: fileContent.toString('base64'),
          isBase64Encoded: true
        };
      }
    } catch (e) {
      console.error("Failed to read fallback skin sx.webp:", e);
    }
    
    // Redirect to Minotar if sx.webp not found or failed
    return {
      statusCode: 302,
      headers: {
        "Location": "https://minotar.net/helm/steve/100.png"
      }
    };
  }
  
  // Otherwise, it is a premium UUID, redirect to crafty.gg
  return {
    statusCode: 302,
    headers: {
      "Location": `https://render.crafty.gg/3d/bust/${id}`,
      "Cache-Control": "public, max-age=86400"
    }
  };
};
