const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\EXPERT\\.gemini\\antigravity-ide\\brain\\89d29e65-96b3-4498-b782-4147d6e411cd\\.system_generated\\logs\\transcript.jsonl';
const outputPath = 'C:\\Users\\EXPERT\\Desktop\\portal network web\\data\\players_to_import.json';

if (!fs.existsSync(transcriptPath)) {
  console.error("Transcript file not found!");
  process.exit(1);
}

const fileData = fs.readFileSync(transcriptPath, 'utf8');

// Find the unique Discord ID of the first player
const pivot = '"1105434073868029972"';
const pivotIndex = fileData.indexOf(pivot);

if (pivotIndex === -1) {
  console.error("Could not find the player data pivot in logs!");
  process.exit(1);
}

// Walk backward to find the start of the array '['
let arrayStart = pivotIndex;
while (arrayStart >= 0 && fileData[arrayStart] !== '[') {
  arrayStart--;
}

if (arrayStart === -1) {
  console.error("Could not find the opening square bracket '[' for the array!");
  process.exit(1);
}

// Walk forward and count brackets to find the end of the array ']'
let bracketCount = 0;
let arrayEnd = arrayStart;
while (arrayEnd < fileData.length) {
  const char = fileData[arrayEnd];
  if (char === '[') bracketCount++;
  else if (char === ']') bracketCount--;
  
  if (bracketCount === 0) {
    arrayEnd++; // include the closing bracket
    break;
  }
  arrayEnd++;
}

let playersJson = fileData.slice(arrayStart, arrayEnd);

// If the string contains escaped double quotes (e.g. \"), we need to unescape them
if (playersJson.includes('\\"')) {
  // Replace escaped quotes, but first check if it is encoded as a JSON string inside logs
  // Since it was inside content, the quotes are escaped. We can unescape the JSON format properly.
  // A simple way to unescape is JSON.parse(JSON.stringify(playersJson)) or regex
  playersJson = playersJson.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
}

// Verify that it is valid JSON
try {
  const parsed = JSON.parse(playersJson);
  console.log(`Successfully parsed player array! Found ${parsed.length} players.`);
  fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf8');
  console.log(`Saved clean player list to ${outputPath}`);
} catch (e) {
  console.error("Failed to parse extracted JSON array! Error:", e.message);
  // Let's print a small snippet to see if there's any escaping residual
  console.error("Start snippet:", playersJson.slice(0, 150));
  console.error("End snippet:", playersJson.slice(-150));
  process.exit(1);
}
