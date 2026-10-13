// Builds raster brand derivatives: public/brand/og-default.jpg (1200×630 share image used when a page has no own OG image) and the favicons.
// Same composition as the Home hero: maroon panel with the white logo, photo cut diagonally on the right.
// Run: node scripts/build-og-image.mjs
import sharp from 'sharp'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const W = 1200, H = 630, PHOTO_X = 600
const photo = await sharp(path.join(root, 'design/assets/Photography/hero-meeting-city.jpg'))
  .resize(W - PHOTO_X + 140, H, { fit: 'cover', position: 'centre' }).toBuffer()
// Diagonal mask so the photo edge matches the hero cut.
const mask = Buffer.from(`<svg width="${W - PHOTO_X + 140}" height="${H}"><polygon points="140,0 ${W},0 ${W},${H} 0,${H}" fill="#fff"/></svg>`)
const cutPhoto = await sharp(photo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
const stripes = Buffer.from(`<svg width="${W}" height="${H}">
  <polygon points="${PHOTO_X + 112},0 ${PHOTO_X + 140},0 ${PHOTO_X},${H} ${PHOTO_X - 28},${H}" fill="#8c1722"/>
  <polygon points="${PHOTO_X + 96},0 ${PHOTO_X + 110},0 ${PHOTO_X - 30},${H} ${PHOTO_X - 44},${H}" fill="#bf1e2e"/>
</svg>`)
const logo = await sharp(path.join(root, 'design/assets/Logos/apegale-logo-white.png')).resize(420).toBuffer()
const logoMeta = await sharp(logo).metadata()

await sharp({ create: { width: W, height: H, channels: 3, background: '#5e0e17' } })
  .composite([
    { input: cutPhoto, left: PHOTO_X, top: 0 },
    { input: stripes, left: 0, top: 0 },
    { input: logo, left: 72, top: Math.round((H - (logoMeta.height ?? 143)) / 2) },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(root, 'public/brand/og-default.jpg'))
console.log('public/brand/og-default.jpg written')

// Favicons from apegale-mark.png (docs/04): small files instead of the 45 KB original on every page.
const mark = path.join(root, 'design/assets/Logos/apegale-mark.png')
for (const [name, size] of [['icon-32.png', 32], ['icon-192.png', 192], ['apple-touch-icon.png', 180]]) {
  await sharp(mark).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public/brand', name))
  console.log(`public/brand/${name} written`)
}
