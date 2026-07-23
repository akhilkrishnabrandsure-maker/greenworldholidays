# Migrate Frontend from Vite to Next.js

Given the goal to scale the application to over 100 SEO-optimized landing pages, Next.js is the optimal framework choice as it provides built-in Server-Side Rendering (SSR) and file-based routing out-of-the-box. 

## User Review Required

> [!WARNING]
> This is a major architectural shift. We will replace the current Vite + React setup (`frontend/` directory) with a fresh Next.js application using the App Router (`app/` directory). We will migrate your existing components to the new structure.
> 
> Also, Git is still failing to run due to PATH issues. Please ensure you have **completely closed and restarted your VS Code/Code Editor window** (not just the terminal panel) for the environment variables to refresh. We can retry the Git push after the migration or whenever you're ready.

## Open Questions

> [!IMPORTANT]
> 1. Should we name the new Next.js directory `frontend` and rename the old one to `frontend-old` for reference, or just replace it outright? (I recommend keeping the old one as `frontend-old` during the transition).
> 2. Do you want to continue using the `backend` Express server for API calls, or would you like to migrate your backend logic into Next.js API Routes eventually? (For now, we'll keep using your existing backend).

## Proposed Changes

We will execute this migration in phases.

### 1. Scaffolding the Next.js App

#### [NEW] `frontend/` (Next.js Project)
We will run `npx create-next-app@latest frontend` (after renaming the old one) to scaffold a modern Next.js 15+ application with TypeScript and Tailwind CSS.

### 2. Migrating Assets & Configurations

#### [NEW] `frontend/public/`
We will move all static assets (images, icons) from the old Vite `public` and `src/assets` folders into the Next.js `public` directory.

#### [MODIFY] `frontend/tailwind.config.ts`
We will migrate your custom Tailwind colors, fonts, and theme configurations from the old Vite project to the new Next.js configuration.

### 3. Migrating Global Styles & Layout

#### [NEW] `frontend/src/app/layout.tsx`
We will create a global Root Layout that includes the `<Navbar>` and `<Footer>` so they appear on every page, replacing the monolithic structure of the old `App.tsx`.

#### [NEW] `frontend/src/app/globals.css`
We will migrate your global CSS rules here.

### 4. Component & Page Migration

#### [NEW] `frontend/src/components/`
We will move all existing reusable UI components (e.g., `Destinations.tsx`, `Vehicles.tsx`, `Services.tsx`) into the new components directory.

#### [NEW] `frontend/src/app/page.tsx`
We will construct the main homepage using the migrated components, effectively replacing the old SPA behavior with a Server-Rendered page.

#### [NEW] `frontend/src/app/(routes)/...`
We will begin breaking out the "hardcoded" sections into their own dedicated routes (e.g., `/destinations`, `/vehicles`) to prepare for the 100+ SEO pages.

## Verification Plan

### Automated Tests
- Run `npm run build` in the new Next.js directory to ensure there are no TypeScript or build errors.

### Manual Verification
- Start the Next.js development server (`npm run dev`) and verify that the homepage renders identically to the old Vite application, but now with proper Next.js routing and SSR.
