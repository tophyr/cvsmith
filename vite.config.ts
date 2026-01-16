import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function cvMetaPlugin() {
  return {
    name: 'cv-meta',
    transformIndexHtml(html: string) {
      const cvPath = path.resolve(process.cwd(), 'public/data/cv.json')
      const cv = JSON.parse(fs.readFileSync(cvPath, 'utf8'))

      const title = cv.name ?? 'CV'
      const ogTitle = `${cv.name ?? ''}${cv.title ? `: ${cv.title}` : ''}`.trim()
      const ogDesc = cv.summary ?? ''
      const ogUrl = cv.contact_info.website

      const repl: Record<string, string> = {
        '%TITLE%': escapeHtml(title),
        '%OG_TITLE%': escapeHtml(ogTitle),
        '%OG_DESC%': escapeHtml(ogDesc),
        '%OG_URL%': escapeHtml(ogUrl),
      }

      for (const [k, v] of Object.entries(repl)) {
        html = html.split(k).join(v)
      }
      return html
    },
  }
}

function escapeHtml(s: unknown) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export default defineConfig({
  base: '',
  plugins: [react(), cvMetaPlugin(), viteStaticCopy({targets: [{src: 'public/data/profile.jpg', dest: ''}]})],
})
