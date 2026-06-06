# Player data (Portal Network)

- **Main file:** `data/players.json` — rankings, profiles, search
- **Skins:** `data/skins/` — saved bust images (`{uuid}.webp` or `.png`)
- **NameMC links:** `data/skins-meta.json`

## Rebuild after editing tiers

```bash
node scripts/build-players.js
```

Edit the player list in `scripts/build-players.js` (`RAW` array), then run the script.

## Sword tiers

Sword uses the **exact** tier you provided (High/Low Tier 1–5).

## Other gamemodes

Other modes are auto-filled between **LT2** and **HT3** based on sword tier.

## API docs

AI Agent is disabled in `mctiers.com/docs/v2/index.html` (`agent: { disabled: true }`).
