const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const playersFile = path.join(dataDir, 'players.json');

if (!fs.existsSync(playersFile)) {
  console.error("players.json not found!");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(playersFile, 'utf8'));

// 1. Filter overall list to only players with points > 0
const rankedPlayers = (data.overall || []).filter(p => p.points > 0);

// 2. Sort by points descending, then name ascending (case-insensitive or localeCompare)
rankedPlayers.sort((a, b) => {
  if (b.points !== a.points) return b.points - a.points;
  return a.name.localeCompare(b.name);
});

// Update the overall array in the file to only contain sorted ranked players
data.overall = rankedPlayers;

// 3. Update the profiles overall rank
if (data.profiles && typeof data.profiles === 'object') {
  for (const [key, profile] of Object.entries(data.profiles)) {
    if (profile.points > 0) {
      const idx = rankedPlayers.findIndex(p => p.uuid === profile.uuid);
      if (idx !== -1) {
        profile.overall = idx + 1;
      } else {
        profile.overall = 0; // Unranked fallback
      }
    } else {
      profile.overall = 0; // Unranked
    }
  }
}

// 4. Save the corrected data
fs.writeFileSync(playersFile, JSON.stringify(data, null, 2), 'utf8');
console.log("Successfully repaired overall ranks in players.json!");
console.log(`Top player: ${rankedPlayers[0]?.name} - points: ${rankedPlayers[0]?.points} - overall rank: ${data.profiles[rankedPlayers[0]?.name]?.overall}`);
