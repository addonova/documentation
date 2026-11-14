# Addonova documentation

Source for the Addonova documentation website, built with
[Guchho](https://github.com/guchho/guchho) and deployed to GitHub Pages at
<https://addonova.github.io/documentation/>.

## How it works

The Markdown in the [addonova/addonova](https://github.com/addonova/addonova)
repository (`docs/`) is the single source of truth. This repository renders it
into a static site at build time; it does not duplicate the content.

```
addonova/addonova/docs/*.md
  => scripts/build-docs.mjs (render)
  => src/pages/**/index.html
  => guchho build
  => dist/
```

- `scripts/build-docs.mjs` renders the docs, validates internal links, writes
  entrypoints, runs `guchho build`, and emits `sitemap.xml`, `robots.txt`,
  `404.html`, `search-index.json`, and the blog feed.
- `scripts/routes.mjs` maps files to routes: `foo/bar.md` → `/foo/bar/`,
  `dir/README.md` → `/dir/`, root `README.md` → `/docs/`.
- `scripts/markdown.mjs` renders Markdown (markdown-it + anchor + highlight.js)
  and rewrites relative `.md` links into site routes.
- `scripts/nav.mjs` builds the sidebar from `site.config.mjs`.
- `scripts/validate-links.mjs` fails the build on broken links or anchors.
- `src/components/` holds the layout/header/footer templates; `src/site/` holds
  the home page; `src/styles/` and `src/main.js` are the shipped CSS/JS.

The published site has no runtime dependencies.

## Requirements

- Node.js ≥ 20

## Development

```bash
npm install

# Render docs + authored pages and check internal links
npm run build:docs        # alias: --render-only
npm run validate          # --validate-only

# Full build (render + bundle with guchho) into dist/
npm run build

# Build, then serve dist/ at http://localhost:3000
npm run dev
```

The docs source defaults to `../addonova/docs`. Override it with `--docs` or
`ADDONOVA_DOCS`:

```bash
# POSIX
ADDONOVA_DOCS=/path/to/addonova/docs npm run build

# Windows PowerShell
$env:ADDONOVA_DOCS="C:/path/to/addonova/docs"; npm run build
```

When deploying to a GitHub Pages project site, set the base path:

```bash
SITE_BASE_PATH=/documentation SITE_URL=https://addonova.github.io/documentation npm run build
```

The deploy workflow does this automatically.

### Guchho output-path workaround

Guchho drops the final path separator when writing nested HTML entries on some
versions. `scripts/build-docs.mjs` repairs this after the build by moving each
page to its intended path and prefixing its relative URLs with one `../`. The
step is a no-op once Guchho is fixed, and the build hard-fails in CI if any
expected page is still missing.

## Deployment

`.github/workflows/deploy.yml` checks out this repository and
`addonova/addonova`, runs the build with `ADDONOVA_DOCS` pointing at the checked
out docs, and publishes `dist/` to GitHub Pages.

## License

Addonova is licensed under **MIT**. Copyright © [CodeHemu](https://github.com/code-hemu).
