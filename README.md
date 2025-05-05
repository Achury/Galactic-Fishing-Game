# Bloque Fishing Challenge 🎣

> A competitive fishing game with real-time leaderboard and market system

## Features ✨

- 🏆 **Rankings**: Medal icons for top 3 players (🥇🥈🥉)
- 💰 **Gold Formatting**: Displays as 250.000 instead of 250000
- 🏪 **Market**: Buy items to gain competitive advantages
- 🌙 **Dark Theme**: Sleek dark-mode interface
- 📱 **Responsive**: Works on mobile & desktop
- ⚡ **PWA**: Works offline after first load

## Tech Stack 🛠️

| Frontend     | Backend    | Tooling |
| ------------ | ---------- | ------- |
| Vue 3        | Bloque API | Vite    |
| TypeScript   |            | Pinia   |
| Tailwind CSS |            | Axios   |

## Quick Start 🚀

```bash
# 1. Clone repository
git clone https://github.com/yourusername/bloque-challenge.git

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

##Project Structure
src/
├── assets/       # Static assets
├── components/   # Reusable components
│   ├── LeaderboardPanel.vue
│   ├── MarketSystem.vue
│   └── ...
├── stores/       # State management
│   ├── gameStore.ts
│   └── ...
├── types/        # Type definitions
│   └── gameTypes.ts
├── App.vue       # Root component
└── main.ts       # Application entry

# Production build
npm run build

# Preview build locally
npm run preview
```
