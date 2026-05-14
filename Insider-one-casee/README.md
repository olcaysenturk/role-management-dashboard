# 6'LI GANYAN CASE

An interactive horse racing simulation built with Vue 3, TypeScript, and Pinia.

## Features
- Fixed horse pool of 20 horses
- Unique color for each horse
- Condition score range: `1-100`
- `Generate Program` creates a 6-round race schedule
- Round distances: `1200, 1400, 1600, 1800, 2000, 2200`
- Each round selects 10 random horses from the 20-horse pool
- `Start Race` runs rounds sequentially
- Live track animation and sequential race results
- TR / EN language support
- Vue Router setup with a single route: `/`

## Tech Stack
- Vue 3
- TypeScript
- Pinia
- Vue Router
- Vue I18n
- Tailwind CSS (Vite plugin)
- Vitest (Unit Test)

## Installation
```bash
npm install
```

## Run in Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Test
```bash
npm test
```

## Project Structure
```text
src/
├── app/          # Page-level components (HomePage, i18n)
├── components/   # UI components (layout, feature, race, shared)
├── data/         # Static data and simulation config
├── lib/          # Utility functions
├── locales/      # TR/EN locale files
├── router/       # Vue Router route definitions
├── services/     # Business logic services
├── store/        # Pinia store
└── types/        # TypeScript types
```

## Route
- `/` -> HomePage

## Notes
- Program generation is blocked while a race is running.
- On mobile, action buttons switch to icon-only mode.
- Simulation settings are managed from `src/data/raceConfig.ts`.
