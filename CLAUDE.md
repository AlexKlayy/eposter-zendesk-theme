# ePoster Zendesk Theme — Notes for Claude

Brief orientation for future Claude instances picking up this repo cold. Read before making changes.

## What this is

A Zendesk Guide theme for Edoc Service's **ePoster** product (labor-law posters / compliance). Sister theme to the Onboard theme (different repo). Owner: alexklaschus@gmail.com.

## Sync flow

Zendesk Help Center pulls this theme from GitHub. There is no `zat`/`zcli` push step.

- Push to `main` on GitHub
- Zendesk re-syncs only when `manifest.json` `version` changes
- **Always bump the version** when committing user-visible changes

## Heads-up: api_version 4 + no React bundles

`manifest.json` is `api_version: 4`, which removed the `{{request_form}}` and `{{form}}` Curlybars helpers. The new request page (`templates/new_request_page.hbs`) contains a `<div id="new-request-form"></div>` mount node, but **this repo does not ship the React bundles or the importmap** that actually mount Zendesk's form into that div.

If the customer reports the request form is blank, this is the cause. The fix is the same pattern used in the **Onboard theme repo**: download Copenhagen's prebuilt bundles (`new-request-form-bundle.js`, `shared-bundle.js`, `wysiwyg-bundle.js`, `flash-notifications-bundle.js`, `ticket-fields-bundle.js`, `new-request-form-translations-bundle.js`, plus `es-module-shims.js`) into `assets/`, add an `<script type="importmap">` block to `templates/document_head.hbs`, and add a `<script type="module">` block to `new_request_page.hbs` that calls `renderNewRequestForm(settings, props, container)`.

Cross-reference: `~/Desktop/onboard-zendesk-theme/templates/document_head.hbs` and `new_request_page.hbs` have a working version of this.

## Layout intent (don't redesign on a whim)

- **Home page (`home_page.hbs`):** flattened **handbook** — a single ordered chapter list across all categories. The customer thinks of ePoster docs as one continuous handbook, not separate audiences. (This is the major layout difference from the Onboard theme, which uses two-up hub cards for Worker/Admin.)
- **Chapter rows:** click to expand inline panels. Section kickers come from a hardcoded map in `script.js` — keep it in sync if section names change in Zendesk.
- **Community is enabled** — `community_post_*`, `community_topic_*`, `contributions_page`, `subscriptions_page` templates exist and are wired up. Onboard does not have community.

## Header/nav rules

- **No "Submit a request" CTA in the nav.** ePoster customers go through articles to find the request link, not a top-level button.
- **No Sign in for anonymous users** (admins authenticate via the Zendesk admin UI; regular visitors don't get prompted).
- Only Sign out is shown when `signed_in`.

## Brand

- Orange `#F19D11` brand color (warmer/yellower than Onboard's `#F66724`)
- Navy `#1a1f2e` (header/nav background — note: darker than Onboard's `#133254`)
- Page background `#f3f4f6` (cool gray, not Onboard's cream)
- No separate "accent" color in manifest — orange brand color is also the accent
- CSS custom prop name is `--eposter-500` / `--eposter-400` (NOT `--brand` / `--accent` like Onboard)

If you bring CSS over from Onboard, **rename the variables** or it will silently no-op.

## Footer

- Support email is `help@edoceposter.com` (not `support@` — different from Onboard).
- Copyright auto-renders the current year via `{{date 'YYYY'}}`.

## Search

The hero search form posts to relative `action="search"`. This works on the home page. If you ever embed search on a nested page, switch to absolute `action="{{help_center.url}}/search"` (this is the fix that was applied to Onboard).

Search tokenization is Zendesk-side. Hyphenated/numbered terms (like `i9` → "I-9") may not match because Zendesk strips hyphens during indexing. Not a theme bug.

## Thumbnail

`thumbnail.png` is a **screenshot** of the home page hero (not PIL-generated like Onboard's). If the home redesigns, take a fresh screenshot. See `preview/` directory for any source images.

## Settings (`manifest.json`)

The `settings` array declares admin-uploadable variables (logo, favicon, brand colors, hero toggle/title). Note: the `favicon` setting is **declared but not currently rendered** — `document_head.hbs` has no `<link rel="icon">`. If a favicon is needed, add `<link rel="icon" href="{{settings.favicon}}">` to the head.

## Conventions

- One-line commit messages preferred, with `Co-Authored-By: Claude` trailer.
- Don't add backward-compat shims, "removed for X" comments, or feature flags. Just change the code.

## Differences vs. Onboard theme (quick reference)

| | ePoster | Onboard |
|---|---|---|
| Home layout | Flattened handbook (one chapter list) | Two-up hub cards (Worker / Admin) |
| Header CTA | None | Submit a request |
| Brand orange | `#F19D11` | `#F66724` |
| Nav background | `#1a1f2e` | `#133254` |
| Page background | `#f3f4f6` (cool gray) | `#FAF9F5` (cream) |
| CSS var prefix | `--eposter-500/400` | `--brand`, `--accent` |
| Support email | `help@edoceposter.com` | `support@edoconboard.com` |
| Community | Enabled | Not used |
| React form bundles | **Not shipped** | Shipped in `assets/*-bundle.js` |
| Thumbnail | Hero screenshot | PIL-generated |
