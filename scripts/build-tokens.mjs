// Generates design/tokens.css and src/styles/tokens.css from design/tokens.json.
// Run: npm run tokens. Never hand-edit the generated CSS.
import { readFileSync, writeFileSync } from 'node:fs'

const t = JSON.parse(readFileSync('design/tokens.json', 'utf8'))
const themes = t.color.themes.map(th => th.id)
const first = themes[0]
const val = (v, theme) => (typeof v === 'string' ? v : v[theme] ?? v[first])
const themed = theme => [...t.color.tokens, ...(t.shadow?.tokens ?? [])].map(x => `  --${x.name}: ${val(x.value, theme)};`).join('\n')
const flatFamilies = Object.entries(t).filter(([k, v]) => !['color', 'shadow', 'type'].includes(k) && v && Array.isArray(v.tokens))
const flat = flatFamilies.flatMap(([, v]) => v.tokens.map(x => `  --${x.name}: ${x.value};`))
const fonts = Object.entries(t.type.families).map(([k, v]) => `  --font-${k}: ${v};`)
const styles = t.type.groups.flatMap(g => g.styles.map(s => {
  let d = `font-family: var(--font-${s.family ?? g.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};`
  if (s.letterSpacing) d += ` letter-spacing: ${s.letterSpacing};`
  if (s.name === 'eyebrow') d += ' text-transform: uppercase;'
  return `.${s.name} { ${d} }`
}))
const css = `/* Ape Gale Indonesia — generated from tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */
:root, [data-theme="${first}"] {
${themed(first)}
}
${themes.slice(1).map(th => `[data-theme="${th}"] {\n${themed(th)}\n}`).join('\n')}
:root {
${[...flat, ...fonts].join('\n')}
}
${styles.join('\n')}
`
writeFileSync('design/tokens.css', css)
writeFileSync('src/styles/tokens.css', css)
console.log(`tokens.css: ${css.split('\n').length} lines`)
