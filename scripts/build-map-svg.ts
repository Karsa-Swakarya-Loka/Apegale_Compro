// Writes public/brand/indonesia-land.svg from src/lib/indonesia-map.ts. The outline is used as a CSS mask
// (colour stays a token) instead of being inlined, which kept ~50 KB out of every Home/About response.
// Run: npx tsx scripts/build-map-svg.ts
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { INDONESIA_MAP, INDONESIA_PATH } from '../src/lib/indonesia-map.ts'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${INDONESIA_MAP.width} ${INDONESIA_MAP.height}"><path d="${INDONESIA_PATH}"/></svg>\n`
writeFileSync(path.resolve(import.meta.dirname, '../public/brand/indonesia-land.svg'), svg)
console.log(`public/brand/indonesia-land.svg written (${svg.length} bytes)`)
