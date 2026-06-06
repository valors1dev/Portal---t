const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\EXPERT\\.gemini\\antigravity-ide\\brain\\89d29e65-96b3-4498-b782-4147d6e411cd\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(transcriptPath)) {
  console.error("Transcript file not found!");
  process.exit(1);
}

const fileData = fs.readFileSync(transcriptPath, 'utf8');

const target = 'Flamiifiied';
const targetIndex = fileData.indexOf(target);

let arrayStart = targetIndex;
while (arrayStart >= 0 && fileData[arrayStart] !== '[') {
  arrayStart--;
}

let braceCount = 0;
let arrayEnd = arrayStart;
while (arrayEnd < fileData.length) {
  const char = fileData[arrayEnd];
  if (char === '[') braceCount++;
  else if (char === ']') braceCount--;
  
  if (braceCount === 0) {
    arrayEnd++;
    break;
  }
  arrayEnd++;
}

let extracted = fileData.slice(arrayStart, arrayEnd);
const hasTruncated = extracted.includes('truncated');
console.log(`Does the extracted string contain the word 'truncated'? ${hasTruncated}`);
if (hasTruncated) {
  const trIdx = extracted.indexOf('truncated');
  console.log("Found 'truncated' at sub-index:", trIdx);
  console.log("Surrounding text:");
  console.log(extracted.substring(trIdx - 100, trIdx + 100));
}
