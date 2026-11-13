import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/
const GTAG_ID_PATTERN = /^(G|AW|DC|UA)-[A-Z0-9-]+$/

/**
 * Resolve the tracking ID in this order:
 *   1. GTM_ID environment variable (GitHub Actions: vars.GTM_ID / secrets.GTM_ID)
 *   2. public/config.js
 *   3. config.js (project root)
 */
function resolveTrackingId(root: string): string {
  const fromEnv = process.env.GTM_ID?.trim()
  if (fromEnv) return fromEnv

  for (const file of ['public/config.js', 'config.js']) {
    const path = resolve(root, file)
    if (!existsSync(path)) continue
    const match = readFileSync(path, 'utf-8').match(/GTM_ID\s*=\s*['"`]([^'"`]*)['"`]/)
    if (match && match[1].trim()) return match[1].trim()
  }
  return ''
}

function googleTagPlugin(): Plugin {
  let root = process.cwd()
  return {
    name: 'google-tag',
    configResolved(config) {
      root = config.root
    },
    transformIndexHtml() {
      const id = resolveTrackingId(root)
      if (!id) return []

      if (GTM_ID_PATTERN.test(id)) {
        // Google Tag Manager
        const tags: HtmlTagDescriptor[] = [
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`,
          },
          {
            tag: 'noscript',
            injectTo: 'body-prepend',
            children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          },
        ]
        return tags
      }

      if (GTAG_ID_PATTERN.test(id)) {
        // Google tag (gtag.js / GA4)
        const tags: HtmlTagDescriptor[] = [
          {
            tag: 'script',
            injectTo: 'head-prepend',
            attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${id}` },
          },
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`,
          },
        ]
        return tags
      }

      console.warn(`[google-tag] Unrecognized GTM_ID "${id}" — no Google tag was injected.`)
      return []
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), googleTagPlugin()],
})
