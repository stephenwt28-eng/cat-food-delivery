# RA&A Cat Food Delivery

A frontend portfolio project simulating a customizable cat food subscription service — think Chewy/Ollie, but for cats. Built with React, Vite, and React Router.

> **This is a demo, not a real store.** There is no backend and no real payment processing. All accounts, profiles, orders, and saved cards are simulated client-side with `localStorage`. Please don't enter real personal information when trying it out.

## What it does

- **Landing page** that adapts its call-to-action based on account state (logged out / logged in / returning member with an existing plan)
- **Signup / login** with a simulated session (no real auth backend)
- **Build-a-plan flow**: tell us about your cat, then pick proteins, veggies, supplements, a container type, and a delivery frequency
- **Checkout** with a delivery address and saved payment cards (again, simulated — nothing is sent anywhere)
- **Order confirmation** and a **review/edit plan** flow for returning members
- **Profile management**: edit account info, manage saved cards, log out (clears the simulated session)

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vitejs.dev/) for dev server and bundling
- [React Router](https://reactrouter.com/) for client-side routing
- Plain CSS (no framework) — one stylesheet per page/component

No backend. `@supabase/supabase-js` is listed as a dependency but isn't wired up yet — it's the planned next step for real persistence (accounts, orders, payment) instead of `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
  components/   # Navbar, Footer, and the shared landing page content
  pages/        # one file per route (Login, Signup, build-a-plan, Checkout, Profile, etc.)
  styles/       # one CSS file per page/component
  hooks/        # shared hooks (e.g. useAuth)
  utils/        # shared helpers (e.g. session clearing on logout)
```

## Known limitations

- No real backend — refreshing `localStorage` (or clearing site data) resets everything
- No real payment processing or input encryption — this is strictly a UI/UX demo
- Single currency, no real shipping/tax calculation
