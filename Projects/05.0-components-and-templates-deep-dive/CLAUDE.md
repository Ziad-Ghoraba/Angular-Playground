# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is an Angular 18 learning/playground project ("cmp-deep-dive") built while working through a "Components & Templates Deep Dive" course. The app itself is a fake server-monitoring dashboard, but its real purpose is to demonstrate Angular component/template APIs in isolation: signal-based `input()`, host bindings/listeners via the `host` metadata property, attribute selectors, `ViewEncapsulation`, and lifecycle hooks. When making changes, preserve this "one concept per component" teaching style rather than consolidating or abstracting things away.

## Commands

- `npm start` / `ng serve` — run the dev server at `http://localhost:4200/`
- `ng build` — production build to `dist/cmp-deep-dive`
- `ng build --configuration development` (or `npm run watch`) — dev build with watch, no optimization
- `ng test` — run unit tests via Karma/Jasmine
  - There are currently no `*.spec.ts` files in `src/`, so this launches Karma with zero specs
  - `ng generate component <path>` scaffolds a spec file automatically if adding tests
- `ng generate component <path>` — scaffold a new standalone component (this project uses standalone components exclusively, no NgModules)

There is no lint script configured in `package.json`.

## Architecture

Single standalone-component Angular app, bootstrapped directly from `main.ts` via `bootstrapApplication(AppComponent)` (no `AppModule`, no router).

Component tree (`src/app/`):
- `AppComponent` (root) — owns `currentStatus`, randomized on a `setInterval` started in `ngOnInit` and cleared in `ngOnDestroy`; passes it down to `ServerStatusComponent`
  - `HeaderComponent` — uses `ButtonComponent` via its attribute selector
  - `ServerStatusComponent` (`dashboard/server-status`) — receives `currentStatus` via signal `input.required<string>()`
  - `TrafficComponent` (`dashboard/traffic`) — holds its own dummy traffic data array, no inputs
  - `TicketsComponent` (`dashboard/tickets`) — wraps `NewTicketComponent`
    - `NewTicketComponent` (`dashboard/tickets/new-ticket`) — uses shared `ButtonComponent` and `ControlComponent`
    - `TicketComponent` (`dashboard/tickets/ticket`) — currently standalone, not yet wired into `TicketsComponent`
  - `DashboardItemComponent` (`dashboard/dashboard-item`) — generic tile taking `title` and `img: {src, alt}` as required signal inputs

Shared components (`src/app/shared/`):
- `ButtonComponent` — selector is `button[appButton]` (attribute selector on a native `<button>`, not `app-button`); consumers write `<button appButton>`
- `ControlComponent` — selector `app-control`; demonstrates host metadata (`host: { class: 'control', '(click)': 'onClick()' }`) as the preferred alternative to `@HostBinding`/`@HostListener` decorators (kept commented out in the file for reference); uses `ViewEncapsulation.None` and injects `ElementRef` via `inject()` to read `offsetWidth`

Every component follows the same triplet: `<name>.component.ts` + `.html` + `.css`, each declared standalone with its own `imports` array — there is no shared/barrel module. When adding a new component that uses another, import it directly into the consuming component's `imports` array.

Angular compiler is run in strict mode (`strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers` all on in `tsconfig.json`), so template type-checking errors surface at build/serve time, not just in the editor.
