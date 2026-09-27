# Matrion

Marketing site for **Matrion** (https://matrion.in), a deep tech company. Current focus: **GPS-denied navigation for drones**.

## Layout
- `web/` — Vite + React + TypeScript single-page site. No backend.
  - `src/App.tsx` — all page sections and their copy (content arrays at the top).
  - `src/components/NavViz.tsx` — hero canvas: a *simulated* VIO + terrain-fix estimator. Labelled "Simulation"; never present it as flight data.
  - `src/index.css` — design tokens on `:root`, light theme via `prefers-color-scheme`. NavViz reads its colours from the `--viz-*` / `--accent` tokens and throws if one is missing.
  - `src/config.ts` — required env (`VITE_CONTACT_EMAIL` in `web/.env`); throws at startup when unset.

## Commands (run in `web/`)
- `npm run dev` · `npm run build` · `npm run lint`
- `npm test` — Vitest + Testing Library; JUnit written to `web/reports/junit.xml`.

## Rules
- Tests first: the specs in `src/App.test.tsx` pin the content contract (brand, deep-tech positioning, GPS-denied focus, nav anchors resolve).
- Copy must not claim performance numbers, customers or milestones that haven't been confirmed.
