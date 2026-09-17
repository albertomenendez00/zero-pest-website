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
    css/style.css            ← the entire design system (colours, spacing, components)
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

Everything lives in `src/assets/css/style.css`, controlled by CSS custom properties at the top of the file (`--red`, `--ink`, `--radius`, etc.). Changing `--red` there changes every button, accent, and icon colour site-wide.

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
