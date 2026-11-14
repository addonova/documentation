// Site configuration for the Addonova documentation website.
//
// The Markdown source of truth lives in the addonova/addonova repository under
// `docs/`. Override the location with `--docs <path>` or `ADDONOVA_DOCS`.

// A base path is a URL path, never a filesystem path. Git Bash on Windows can
// rewrite values such as "/documentation" into "C:/Program Files/Git/documentation"
// before the process sees them, so recover the final URL segment.
function normalizeBasePath(value) {
  let base = (value || '').trim()
  if (!base || base === '/') return ''
  if (/^[A-Za-z]:[\\/]/.test(base)) {
    const parts = base.split(/[\\/]/).filter(Boolean)
    base = '/' + parts[parts.length - 1]
  } else if (!base.startsWith('/')) {
    base = '/' + base
  }
  return base.replace(/\/+$/, '')
}

const basePath = normalizeBasePath(process.env.SITE_BASE_PATH)
const siteUrl = (process.env.SITE_URL || 'https://addonova.github.io/documentation').replace(/\/+$/, '')

export default {
  site: {
    name: 'Addonova',
    tagline: 'Next-generation browser extension framework',
    description:
      'Addonova builds browser extensions from TypeScript and JavaScript with file-based entrypoints, manifest synthesis, MV2/MV3 conversion, browser launching, auto-reload, and packaging.',
    url: siteUrl,
    basePath,
    github: 'https://github.com/addonova/addonova',
    npm: 'https://www.npmjs.com/package/addonova',
    licenseUrl: 'https://github.com/addonova/addonova/blob/main/LICENSE',
    sponsorUrl: 'https://github.com/sponsors/code-hemu',
    copyright: 'CodeHemu',
    ogImage: '/addonova-og.svg',
    ogImageAlt: 'Addonova — next-generation browser extension framework',
    ogImageWidth: 1200,
    ogImageHeight: 630,
  },

  // Primary Markdown root. The default expects the addonova repo checked out as
  // a sibling directory. Override with ADDONOVA_DOCS or --docs.
  docsRoot: '../addonova/docs',

  docsSources: [],

  // Route-level social preview overrides. The longest matching prefix wins.
  ogRoutes: [
    {
      prefix: '/guide/',
      ogImage: '/guide-og.svg',
      ogImageAlt: 'Addonova Guide — learn the extension framework',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
    {
      prefix: '/api/',
      ogImage: '/api-og.svg',
      ogImageAlt: 'Addonova API — programmatic build and packaging surface',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
    {
      prefix: '/reference/',
      ogImage: '/reference-og.svg',
      ogImageAlt: 'Addonova Reference — CLI, configuration, and error codes',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
    {
      prefix: '/recipes/',
      ogImage: '/recipes-og.svg',
      ogImageAlt: 'Addonova Recipes — copy-paste solutions for real extensions',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
    {
      prefix: '/resources/',
      ogImage: '/resources-og.svg',
      ogImageAlt: 'Addonova Resources — FAQ, glossary, and platform support',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
    {
      prefix: '/blog/',
      ogImage: '/blog-og.svg',
      ogImageAlt: 'Addonova Blog — news and release announcements',
      ogImageWidth: 1200,
      ogImageHeight: 630,
    },
  ],

  nav: [
    {
      title: 'Start',
      icon: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
      links: [
        { href: '/docs/', label: 'Documentation' },
        { href: '/guide/getting-started/', label: 'Getting started' },
        { href: '/guide/introduction/', label: 'Introduction' },
        { href: '/guide/why-addonova/', label: 'Why Addonova' },
        { href: '/guide/core-concepts/', label: 'Core concepts' },
        { href: '/guide/configuration/', label: 'Configuration' },
        { href: '/guide/cli-overview/', label: 'CLI overview' },
      ],
    },
    {
      title: 'Guide',
      icon: '<path d="M12 6C9.5 4.5 6.5 4 4 4v13c2.5 0 5.5.5 8 2 2.5-1.5 5.5-2 8-2V4c-2.5 0-5.5.5-8 2z"/><path d="M12 6v13"/>',
      autodir: 'guide',
    },
    {
      title: 'Reference',
      icon: '<path d="M6 4h12v16l-6-4-6 4V4z"/>',
      autodir: 'reference',
    },
    {
      title: 'API',
      icon: '<path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>',
      links: [
        { href: '/api/', label: 'API reference' },
        { href: '/api/config/', label: 'Configuration types' },
        { href: '/api/defines/', label: 'Define helpers' },
        { href: '/api/modules/', label: 'Modules' },
        { href: '/api/hooks/', label: 'Hooks' },
        { href: '/api/build/', label: 'Build' },
        { href: '/api/packaging/', label: 'Packaging' },
        { href: '/api/utilities/', label: 'Utilities' },
      ],
    },
    {
      title: 'Recipes',
      icon: '<path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"/>',
      autodir: 'recipes',
    },
    {
      title: 'Resources',
      icon: '<path d="M3 7a2 2 0 0 1 2-2h3.5l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>',
      autodir: 'resources',
    },
    {
      title: 'More',
      icon: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      links: [
        { href: '/blog/', label: 'Blog' },
        { href: '/release-notes/', label: 'Release notes' },
        { href: '/versions/', label: 'Versions' },
      ],
    },
  ],

  sideanchor: true,
}
