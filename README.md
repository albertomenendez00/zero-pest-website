# Zero Pest Control — Website

A fast, modern static website for Zero Pest Control, built with [Eleventy](https://www.11ty.dev/) (11ty) and deployed to Netlify. No database, no CMS login — every page is a plain text file in this repository.

## Quick facts

- **Framework:** Eleventy 2 (static site generator), Nunjucks templates, plain CSS (no framework).
- **Hosting:** Netlify, built from this Git repo.
- **Forms:** The quote request form on `/contact/` uses Netlify Forms (no backend needed).
- **Content:** Every editable page is a `.md` or `.njk` file under `src/`.

## Local development

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install       # first time only
npm start         # runs a local dev server at http://localhost:8080 with live reload
npm run build     # builds the production site into _site/
```

## Project structure

```
src/
  _data/
    site.js                  ← business info: phone, email, hours, service areas
    localBusinessSchema.js   ← generates the LocalBusiness/PestControl SEO schema
  _includes/
    layouts/                 ← page templates (base, service, plan, industry, pest)
    partials/                ← header, footer, icon library, quote form
  assets/
    css/variables.css        ← every font, font size, colour, and spacing value (edit here)
    css/style.css            ← the design system's components/layout (reads variables.css)
    js/main.js                ← mobile menu, scroll animation, form handling
    images/                  ← logo, favicons
  services/                  ← the 8 "pest treatment" pages (Ant Control, Bed Bugs, etc.)
  industries/                ← the 5 industry pages (Restaurants, Hotels, etc.)
  pest-library/              ← the 17 Pest Library identification pages
  index.njk, residential.njk, commercial.njk, contact.njk, faq.njk, etc.
    ← the one-off pages
```

## How to edit content

Almost everything is plain text. You do not need to touch any `.njk` template files to update wording, prices, hours, or add a new pest/service/industry page.

### Change business info (phone, email, hours, service areas)

Edit `src/_data/site.js`. This one file feeds the header, footer, every "Call Now" button, and the SEO schema.

### Edit an existing page's text

Open the matching file in `src/` and edit the text between the `---` frontmatter markers or in the body. For example:

- Homepage → `src/index.njk`
- Residential → `src/residential.njk`
- Commercial → `src/commercial.njk`
- Contact → `src/contact.njk`
- FAQ → `src/faq.njk`

### Add a new pest control service (e.g. "Silverfish Treatment")

1. Copy an existing file in `src/services/`, e.g. `src/services/spider-control.md`.
2. Rename it to match the new page's URL, e.g. `silverfish-treatment.md`.
3. Edit the frontmatter fields at the top (`title`, `description`, `pestName`, `pestIcon`, the `comeFrom`/`doAtHome`/`attracts`/`concern`/`faqs` lists, and `closing`).
4. Save. The new page automatically appears at `/silverfish-treatment/`, in the Services nav dropdown, the footer, and the `/services/` index — no other file needs to change.

Available icon names for `pestIcon` are listed in `src/_includes/partials/icons.njk` (e.g. `ant`, `roach`, `rodent`, `spider`, `wasp`, `bedbug`, `fly`, `bee`, `silverfish`, `bug` as a generic fallback).

### Add a new industry page

Same pattern, in `src/industries/`. Copy `restaurants.md`, rename it, and edit the frontmatter (`h1`, `navLabel`, `problems`, `benefits`, `stepInspect`/`stepTreat`/`stepMaintain`, `closingHeading`, `closingText`).

### Add a new Pest Library entry

Same pattern, in `src/pest-library/`. Copy any file (e.g. `house-mouse.md`), rename it, and fill in `commonName`, `category`, `pestIcon`, `summary`, `appearance`, `habitat`, `risks`, `preventionTips`, and `relatedService`. It will automatically appear on `/pest-library/`, grouped under its `category`.

**Every Pest Library entry currently on the site is marked `[DRAFT – REVIEW]`** — the original site's Pest Library posts had no content at all, so these were written from scratch using general, publicly known pest-identification facts. Please have a technician confirm each one is accurate before removing the draft notice (delete the `draft-notice` block in `src/_includes/layouts/pest.njk`'s usage, or simply leave individual entries as-is once reviewed — the notice is site-wide, so remove it from `layouts/pest.njk` once every entry has been checked).

### Change colours, fonts, spacing

Every font, font size, colour, and spacing value used anywhere on the site is a CSS custom property defined in one file: **`src/assets/css/variables.css`**. `src/assets/css/style.css` (the actual page styling) only ever references these variables — it has no hardcoded fonts, sizes, colours, or spacing of its own. Change a value in `variables.css` and it updates everywhere that value is used across the whole site. See [Design tokens](#design-tokens) below for the full list.

## Design tokens

All design tokens live in `src/assets/css/variables.css`, inside a single `:root { ... }` block, grouped into the sections below. Nothing else in the codebase defines a font, font size, colour, or spacing value — they all come from here.

Sizes named after their value (e.g. `--text-88`, `--space-125`) are named that way because the original design uses many closely tuned values rather than a small handful of steps (e.g. `--text-88` = `0.88rem`, `--space-125` = `1.25rem` — take the number, divide by 100, that's the rem value). Everything else is named by what it's for.

### Fonts

| Variable | Value | Used for |
|---|---|---|
| `--font-display` | `"Poppins", "Segoe UI", system-ui, -apple-system, sans-serif` | All headings (`h1`–`h4`), the logo wordmark, step numbers |
| `--font-body` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | Body text, nav, buttons, everything else |
| `--fw-medium` | `500` | Dropdown nav links |
| `--fw-semibold` | `600` | Nav links, form labels, footer links, pills |
| `--fw-bold` | `700` | Headings, buttons, section eyebrows, most emphasis |
| `--fw-extrabold` | `800` | `h1`, the logo wordmark, step-number circles |

### Font sizes

Responsive (scale with viewport width):

| Variable | Value | Used for |
|---|---|---|
| `--text-h1` | `clamp(2.1rem, 4.6vw, 3.4rem)` | `h1` |
| `--text-h2` | `clamp(1.6rem, 3.2vw, 2.35rem)` | `h2` |
| `--text-h3` | `clamp(1.15rem, 1.8vw, 1.4rem)` | `h3` |
| `--text-lede` | `clamp(1.05rem, 1.6vw, 1.2rem)` | `.lede` intro paragraphs |

Fixed:

| Variable | Value | Variable | Value |
|---|---|---|---|
| `--text-base` | `16px` (body base size) | `--text-92` | `0.92rem` |
| `--text-62` | `0.62rem` | `--text-94` | `0.94rem` |
| `--text-75` | `0.75rem` | `--text-95` | `0.95rem` |
| `--text-78` | `0.78rem` | `--text-96` | `0.96rem` |
| `--text-80` | `0.8rem` | `--text-98` | `0.98rem` |
| `--text-82` | `0.82rem` | `--text-100` | `1rem` |
| `--text-85` | `0.85rem` | `--text-105` | `1.05rem` (also `--text-h4`) |
| `--text-88` | `0.88rem` | `--text-110` | `1.1rem` |
| `--text-90` | `0.9rem` | | |

### Colours

Base palette:

| Variable | Value | Used for |
|---|---|---|
| `--ink` | `#16181b` | Primary text, dark section/footer backgrounds |
| `--ink-soft` | `#4c5258` | Secondary/body text |
| `--ink-faint` | `#585e64` | Tertiary text (tagline, hints, breadcrumbs) |
| `--paper` | `#ffffff` | Page background, card/input backgrounds |
| `--paper-soft` | `#f6f7f8` | Alternating section backgrounds |
| `--paper-tint` | `#fbf4f2` | Hero/page-hero background tint |
| `--line` | `#e7e9eb` | Borders, dividers |
| `--line-soft` | `#f0f1f2` | Lighter borders (mobile nav) |
| `--red` | `#d6291e` | **The one accent colour** — buttons, links, icons, focus outline |
| `--red-dark` | `#a91f16` | Accent hover state |
| `--red-tint` | `#fdeceb` | Accent background tint (badges, focus ring, error background) |
| `--ink-invert` | `#ffffff` | White text/icons placed on dark or red backgrounds |
| `--black` | `#000000` | `.btn--dark` hover background |

White overlays & text-on-dark (translucent white, used on dark backgrounds):

| Variable | Value | Used for |
|---|---|---|
| `--overlay-header` | `rgba(255,255,255,0.92)` | Sticky header background |
| `--overlay-badge` | `rgba(255,255,255,0.96)` | Hero visual badge background |
| `--overlay-border` | `rgba(255,255,255,0.4)` | Outline button border, on dark backgrounds |
| `--overlay-texture` | `rgba(255,255,255,0.06)` | Photo-placeholder diagonal texture |
| `--overlay-icon-dark` | `rgba(255,255,255,0.08)` | Icon badge background on dark sections |
| `--text-on-dark` | `rgba(255,255,255,0.85)` | Footer base text colour |
| `--text-on-dark-soft` | `rgba(255,255,255,0.75)` | CTA banner paragraph, footer-bottom link |
| `--text-on-dark-muted` | `rgba(255,255,255,0.68)` | Footer column links |
| `--text-on-dark-faint` | `rgba(255,255,255,0.62)` | Footer paragraph |
| `--text-on-dark-faintest` | `rgba(255,255,255,0.55)` | Photo-placeholder caption, footer copyright text |
| `--border-on-dark` | `rgba(255,255,255,0.12)` | Footer-bottom top border |

Shadows & glows:

| Variable | Value | Used for |
|---|---|---|
| `--shadow-sm` | `0 2px 10px -4px rgba(22,24,27,0.12)` | Small lift (skip link etc.) |
| `--shadow` | `0 16px 40px -18px rgba(22,24,27,0.28)` | Cards, dropdowns, form card on hover/default |
| `--shadow-lg` | `0 26px 60px -20px rgba(22,24,27,0.32)` | Hero visual |
| `--shadow-mobile-bar` | `0 -8px 24px -12px rgba(0,0,0,0.18)` | Sticky mobile call bar |
| `--glow-red` | `rgba(214,41,30,0.55)` | Primary button shadow |
| `--glow-red-strong` | `rgba(214,41,30,0.6)` | Primary button hover shadow |

Component-specific:

| Variable | Value | Used for |
|---|---|---|
| `--success-bg` / `--success-text` / `--success-border` | `#ecf8f0` / `#1f6b3a` / `#cdeed8` | Form success message |
| `--error-border` | `#f8d3d0` | Form error message border (bg/text reuse `--red-tint`/`--red-dark`) |
| `--draft-bg` / `--draft-border` / `--draft-text` / `--draft-icon` | `#fff8e6` / `#f3e2ad` / `#7a5a00` / `#a97c00` | The `[DRAFT – REVIEW]` notice on Pest Library pages |
| `--eyebrow-on-dark` | `#ff9a90` | Section eyebrow label on dark (`.section--ink`) backgrounds |
| `--placeholder-gradient-start` | `#2a2d31` | Photo-placeholder background gradient (paired with `--ink`) |

### Spacing

Fixed scale (used for padding, margin, and gap):

| Variable | Value | Variable | Value | Variable | Value |
|---|---|---|---|---|---|
| `--space-10` | `0.1rem` | `--space-75` | `0.75rem` | `--space-150` | `1.5rem` |
| `--space-15` | `0.15rem` | `--space-80` | `0.8rem` | `--space-160` | `1.6rem` |
| `--space-25` | `0.25rem` | `--space-85` | `0.85rem` | `--space-175` | `1.75rem` |
| `--space-30` | `0.3rem` | `--space-90` | `0.9rem` | `--space-190` | `1.9rem` |
| `--space-35` | `0.35rem` | `--space-95` | `0.95rem` | `--space-200` | `2rem` |
| `--space-40` | `0.4rem` | `--space-100` | `1rem` | `--space-225` | `2.25rem` |
| `--space-45` | `0.45rem` | `--space-110` | `1.1rem` | `--space-250` | `2.5rem` |
| `--space-50` | `0.5rem` | `--space-115` | `1.15rem` | | |
| `--space-55` | `0.55rem` | `--space-120` | `1.2rem` | | |
| `--space-60` | `0.6rem` | `--space-125` | `1.25rem` | | |
| `--space-65` | `0.65rem` | `--space-130` | `1.3rem` | | |
| `--space-70` | `0.7rem` | `--space-140` | `1.4rem` | `--space-300` | `3rem` |

Responsive (section and component padding/gaps that scale with viewport width):

| Variable | Value | Used for |
|---|---|---|
| `--space-section` | `clamp(3.5rem, 7vw, 6rem)` | Standard section top/bottom padding |
| `--space-section-tight` | `clamp(2.5rem, 5vw, 4rem)` | `.section--tight` padding |
| `--space-section-head` | `clamp(2rem, 4vw, 3rem)` | Space below a section heading block |
| `--space-hero` | `clamp(2.75rem, 7vw, 5.5rem)` | Homepage hero padding |
| `--space-page-hero` | `clamp(2.75rem, 6vw, 4rem)` | Inner-page hero padding |
| `--space-footer-top` | `clamp(3rem, 6vw, 4.5rem)` | Footer top padding |
| `--space-cta-banner` | `clamp(2rem, 5vw, 3.25rem)` | CTA banner padding |
| `--space-form-card` | `clamp(1.5rem, 4vw, 2.5rem)` | Quote form card padding |
| `--gap-grid` | `clamp(1.25rem, 2.5vw, 2rem)` | Default grid gap |
| `--gap-steps` | `clamp(1.5rem, 3vw, 2.5rem)` | 3-step process grid gap |
| `--gap-split` | `clamp(2rem, 5vw, 4rem)` | Two-column split section gap |
| `--gutter` | `clamp(1.25rem, 4vw, 2.5rem)` | Page side margins (`.container`) |

### Other tokens (layout & shape)

These aren't fonts, sizes, colours, or spacing, but live in `variables.css` alongside them since they were already variables before this change:

| Variable | Value | Used for |
|---|---|---|
| `--radius-sm` / `--radius` / `--radius-lg` | `8px` / `14px` / `22px` | Corner rounding, small to large |
| `--container` / `--container-narrow` | `1200px` / `820px` | Max page width |
| `--header-h` | `76px` | Sticky header height |

**Not tokenized:** a handful of one-off, structural values (e.g. the skip-link's off-screen `-3rem`, the honeypot field's `-9999px`, the `74px` mobile-call-bar body offset, small decorative pixel sizes like icon widths/heights and underline thickness) are implementation details rather than design choices, and were left as plain values to avoid any risk of changing layout behaviour.

## The quote form (Netlify Forms)

The form on `/contact/` (`src/_includes/partials/quote-form.njk`) is wired for [Netlify Forms](https://docs.netlify.com/manage/forms/setup/):

- `data-netlify="true"` and a hidden `form-name` field register it with Netlify at build time — no extra setup needed once deployed.
- `data-netlify-honeypot="bot-field"` adds a hidden spam-trap field.
- `src/assets/js/main.js` submits the form via `fetch()` so visitors see an inline success message instead of a page reload, and shows the browser's built-in validation messages for missing required fields.
- **After your first deploy**, go to your Netlify site dashboard → **Forms** to see submissions, and set up **email notifications** so submissions land in your inbox (Site settings → Forms → Form notifications).

## Deploying to Netlify

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**, and select this repo.
3. Build settings (already set in `netlify.toml`, Netlify should detect them automatically):
   - **Build command:** `npm run build`
   - **Publish directory:** `_site`
4. Deploy. Netlify will automatically detect the Netlify Form in the built HTML — no extra configuration required.
5. Add your custom domain (`zeropestcontrol.ca`) under **Domain settings**, and enable HTTPS (Netlify does this automatically via Let's Encrypt).

## SEO

- Every page has a unique `<title>` and meta description targeting the relevant town(s).
- `LocalBusiness`/`PestControl` structured data is included site-wide (`src/_data/localBusinessSchema.js`); `FAQPage` structured data is added on the FAQ page and every service page.
- `/sitemap.xml` and `/robots.txt` are generated automatically at build time.
- Update `src/_data/site.js` → `address` and `url` once the production domain and street address are confirmed (see placeholders below).

## Known placeholders — do this before launch

Search the codebase for `[ADD:` and `[DRAFT` to find every spot flagged during this rebuild. As of this build, that includes:

- **Photos.** No real photos of your team, vehicles, or completed jobs were available to include (the original site's stock photography wasn't something I could safely relicense for you, and no new photos were provided). Every hero/section image is currently a dark placeholder block. Replace `.photo-placeholder` `<div>` blocks in `src/index.njk`, `src/residential.njk`, and `src/commercial.njk` with real `<img>` tags once you have photos — drop image files into `src/assets/images/` and reference them.
- **Street address & postal code** — `src/_data/site.js` (`address` object), used in the SEO schema.
- **Pest Library entries** — all 17 are marked `[DRAFT – REVIEW]`; written from general pest-identification knowledge since the originals were empty. Please have a technician verify accuracy.
- **Honey bee removal policy** — `src/pest-library/honey-bees.md` flags that we don't know whether you offer live removal/relocation or refer out to a beekeeper.
- **Privacy Policy & Terms of Service** — both are general small-business templates, not legal advice. Have a lawyer review before launch, especially the guarantee/liability language in the Terms and the data-retention specifics in the Privacy Policy.
- **Social/Google Business Profile links** — `src/_data/site.js` (`social` object) is empty; add if you have active profiles.
- **Reviews, awards, certifications, and specific pricing** were not in the WordPress export, and none have been invented — none appear on the site. Add them once you can confirm the exact wording/numbers.

## What didn't carry over from the old site

- **Elementor page-builder data, popups, and theme settings** were intentionally ignored, per the rebuild brief — only the actual text content was reused.
- **Draft and unpublished content** (the draft "Ants" post, and a stray empty `Elementor #3708` page with no real content) was not rebuilt.
- **Menus** from the WordPress export were ignored; navigation was redesigned from scratch based on the site's actual page structure.
