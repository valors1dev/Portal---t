const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\EXPERT\\.gemini\\antigravity-ide\\brain\\89d29e65-96b3-4498-b782-4147d6e411cd\\.system_generated\\logs\\transcript.jsonl';
const outputPath = 'C:\\Users\\EXPERT\\Desktop\\portal network web\\data\\players_to_import.json';

if (!fs.existsSync(transcriptPath)) {
  console.error("Transcript file not found!");
  process.exit(1);
}

const fileData = fs.readFileSync(transcriptPath, 'utf8');

// Find the pivot
const pivot = 'Flamiifiied';
const pivotIdx = fileData.indexOf(pivot);
if (pivotIdx === -1) {
  console.error("Could not find Flamiifiied in transcript!");
  process.exit(1);
}

// Trace backward to find '['
let start = pivotIdx;
while (start >= 0) {
  if (fileData[start] === '[') {
    break;
  }
  start--;
}

if (start === -1) {
  console.error("Could not find start bracket '['!");
  process.exit(1);
}

// Trace forward to find the matching ']'
let depth = 0;
let end = start;
while (end < fileData.length) {
  const char = fileData[end];
  if (char === '[') {
    depth++;
  } else if (char === ']') {
    depth--;
    if (depth === 0) {
      end++;
      break;
    }
  }
  end++;
}

const rawSlice = fileData.slice(start, end);

// The golden unescaping regex for JSON-in-JSON logs:
// 1. Replace triple-escaped quotes \\\" with a clean double quote "
// 2. Replace any standard escaped quotes \" with double quote "
// 3. Replace escaped newlines \\n and \\r with actual newlines
// 4. Replace escaped backslashes \\\\ with a single backslash \
let unescaped = rawSlice
  .replace(/\\{3}"/g, '"')  // Matches \\\" and replaces with "
  .replace(/\\"/g, '"')     // Matches \" and replaces with "
  .replace(/\\n/g, '\n')
  .replace(/\\r/g, '\r')
  .replace(/\\\\/g, '\\');

// Try to parse the clean JSON
try {
  const parsed = JSON.parse(unescaped);
  console.log(`Parsed successfully! Extracted ${parsed.length} players.`);
  fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf8');
  console.log("Wrote players_to_import.json successfully!");
} catch (e) {
  console.error("Manual unescaping failed to parse JSON:", e.message);
  
  // Fallback: If there are truncated parts or any other issues, let's fix it by making it a valid JSON array manually
  // by truncating at the last fully valid player entry!
  console.log("Attempting to recover valid players up to the error point...");
  
  const recovered = [];
  // Let's extract all player object blocks { ... } using a regex
  const playerBlocks = unescaped.match(/\{[^{}]*"ranks"[^{}]*\}/gs);
  if (playerBlocks) {
    for (const block of playerBlocks) {
      try {
        const p = JSON.parse(block);
        if (p.minecraftUsername) {
          recovered.push(p);
        }
      } catch (err) {
        // Skip invalid blocks
      }
    }
  }
  
  if (recovered.length > 0) {
    console.log(`Successfully recovered ${recovered.length} valid players!`);
    fs.writeFileSync(outputPath, JSON.stringify(recovered, null, 2), 'utf8');
  } else {
    process.exit(1);
  }
}
