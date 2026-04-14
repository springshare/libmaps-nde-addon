# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 18 microfrontend add-on for Ex Libris Primo's New Discovery Experience (NDE). It integrates SpringShare's LibMaps (LibCal) library map functionality into the NDE search interface using Module Federation. The final build artifact is a ZIP file uploaded to Alma's customization package UI.

This repo is a fork of [ExLibrisGroup/customModule](https://github.com/ExLibrisGroup/customModule), which provides the entire framework (Module Federation wiring, build scripts, proxy setup, app shell). SpringShare's custom code is a single commit on top of that base — all meaningful logic lives in two directories:

- `src/app/libmaps/` — main component, service, and type definitions (SpringShare-owned)
- `src/app/libmaps-modal/` — modal dialog component (SpringShare-owned)

Everything else (`webpack.config.js`, `prebuild.js`, `postbuild.js`, `src/bootstrap.ts`, `src/main.ts`, etc.) is upstream ExLibrisGroup framework code. When ExLibrisGroup releases a new NDE-compatible version, merge from `upstream/main` and resolve conflicts only in those two directories plus the framework wiring files (`app.module.ts`, `customComponentMappings.ts`, `build-settings.env`, `proxy/proxy.const.mjs`).

## Commands

```bash
npm install          # Install dependencies
npm start            # Dev server on port 4201 (with prebundling)
npm run start:proxy  # Dev server proxied against a live Primo instance
npm run build        # Production build → dist/{INST_ID}-{VIEW_ID}.zip
npm test             # Run Karma/Jasmine unit tests
```

Dev URL after `npm start`: `http://localhost:4201/nde/home?vid=EXLDEV1_INST:NDE_SPRINSHARE`

## Architecture

### Module Federation Entry

`src/main.ts` → dynamically loads the bootstrap file (renamed by prebuild.js from `bootstrap.ts` → `bootstrap{ADDON_NAME}.ts`). This is the Module Federation remote entry, exposing `./custom-module`.

### Component Injection Pattern

NDE loads custom components as Web Components (Angular Elements). The mapping from NDE selector hook names to Angular components lives in `src/app/custom1-module/customComponentMappings.ts`. Components are registered via `createCustomElement` in `AppModule`.

LibmapsComponent is injected at two hook points:
- `nde-online-availability-after`
- `nde-physical-availability-line-after`

### Data Flow

1. NDE shell loads this module via Module Federation
2. `AppModule` receives `MODULE_PARAMETERS` (JSON config from Alma) via DI token
3. `LibmapsComponent` receives the host NDE component via `@Input() hostComponent`, extracts availability status, call number, location, collection, and title
4. `LibmapsService.getConfigurationData()` makes an HTTP call to `{LibCalURL}/libmaps/nde` to fetch icon/display config
5. If availability is `'available'` and location/collection match LibCal config, a button is rendered
6. Button opens either a `LibmapsModalComponent` (Material Dialog with iframe to LibCal) or a direct link

### Build System

**`build-settings.env`** — controls `INST_ID`, `VIEW_ID`, `ADDON_NAME`, and optional `ASSET_BASE_URL`.

**`prebuild.js`** — reads `build-settings.env` and:
- Renames `bootstrap.ts` to `bootstrap{ADDON_NAME}.ts`
- Updates `main.ts` and `webpack.config.js` with the addon name
- Generates `src/app/state/asset-base.generated.ts` with the asset base URL

**`postbuild.js`** — ZIPs `dist/custom-module/` into `dist/{INST_ID}-{VIEW_ID}.zip` for upload to Alma.

### Key Injection Tokens

- `MODULE_PARAMETERS` — configuration injected by Alma (LibCal URL, etc.)
- `SHELL_ROUTER` — host app's Angular Router
- `Store` (NgRx) — access to NDE application state

### Assets

The `autoAssetSrc` directive (`src/app/libmaps/auto-asset-src.directive.ts`) prepends `ASSET_BASE_URL` to `src` attributes on `<img>`, `<source>`, `<video>`, `<audio>` elements — needed when assets are served from a CDN separate from the JS bundle.

## Proxy Configuration

`proxy/proxy.conf.mjs` routes requests to a configured remote Primo instance for local testing against real NDE. The target environment is set in `proxy/proxy.const.mjs` (currently `tulane`).

## Branch Compatibility

This branch (`libmaps`) targets the **Primo NDE December 2025** release.
