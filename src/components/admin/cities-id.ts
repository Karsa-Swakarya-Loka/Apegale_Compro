// Approximate centres of Indonesian cities for the CMS map picker (lat, lng). Names are matched case-insensitively,
// aliases point to the same place. Enough precision for a dot on the national map.
export const CITIES: { name: string; lat: number; lng: number; alias?: string[] }[] = [
  { name: 'Banda Aceh', lat: 5.548, lng: 95.324, alias: ['Aceh'] }, { name: 'Lhokseumawe', lat: 5.18, lng: 97.15 },
  { name: 'Medan', lat: 3.595, lng: 98.672 }, { name: 'Pematangsiantar', lat: 2.96, lng: 99.06 },
  { name: 'Padang', lat: -0.947, lng: 100.417 }, { name: 'Bukittinggi', lat: -0.305, lng: 100.369 },
  { name: 'Pekanbaru', lat: 0.507, lng: 101.448, alias: ['Riau'] }, { name: 'Dumai', lat: 1.666, lng: 101.447 },
  { name: 'Batam', lat: 1.045, lng: 104.03 }, { name: 'Tanjung Pinang', lat: 0.918, lng: 104.446, alias: ['Tanjungpinang'] },
  { name: 'Jambi', lat: -1.61, lng: 103.613 }, { name: 'Palembang', lat: -2.976, lng: 104.775 },
  { name: 'Pangkal Pinang', lat: -2.129, lng: 106.113, alias: ['Pangkalpinang', 'Bangka'] }, { name: 'Bengkulu', lat: -3.795, lng: 102.259 },
  { name: 'Bandar Lampung', lat: -5.397, lng: 105.266, alias: ['Lampung'] },
  { name: 'Serang', lat: -6.12, lng: 106.15, alias: ['Banten'] }, { name: 'Cilegon', lat: -6.002, lng: 106.011 }, { name: 'Tangerang', lat: -6.178, lng: 106.63 },
  { name: 'Jakarta', lat: -6.2, lng: 106.817, alias: ['DKI Jakarta', 'Jakarta Selatan', 'Jakarta Pusat'] },
  { name: 'Bogor', lat: -6.595, lng: 106.816 }, { name: 'Depok', lat: -6.402, lng: 106.794 }, { name: 'Bekasi', lat: -6.238, lng: 106.976 },
  { name: 'Cikarang', lat: -6.26, lng: 107.15 }, { name: 'Karawang', lat: -6.306, lng: 107.3 }, { name: 'Purwakarta', lat: -6.556, lng: 107.443 },
  { name: 'Bandung', lat: -6.917, lng: 107.619 }, { name: 'Cirebon', lat: -6.732, lng: 108.552 }, { name: 'Tasikmalaya', lat: -7.327, lng: 108.22 },
  { name: 'Tegal', lat: -6.869, lng: 109.14 }, { name: 'Pekalongan', lat: -6.889, lng: 109.675 }, { name: 'Cilacap', lat: -7.727, lng: 109.009 },
  { name: 'Semarang', lat: -6.967, lng: 110.417 }, { name: 'Kudus', lat: -6.805, lng: 110.84 },
  { name: 'Surakarta', lat: -7.566, lng: 110.817, alias: ['Solo'] }, { name: 'Yogyakarta', lat: -7.797, lng: 110.37, alias: ['Jogja', 'Jogjakarta', 'DIY'] },
  { name: 'Surabaya', lat: -7.257, lng: 112.752 }, { name: 'Gresik', lat: -7.157, lng: 112.656 }, { name: 'Sidoarjo', lat: -7.447, lng: 112.718 },
  { name: 'Tuban', lat: -6.897, lng: 112.05 }, { name: 'Malang', lat: -7.983, lng: 112.621 }, { name: 'Kediri', lat: -7.817, lng: 112.012 },
  { name: 'Pasuruan', lat: -7.645, lng: 112.907 }, { name: 'Probolinggo', lat: -7.754, lng: 113.216 }, { name: 'Jember', lat: -8.172, lng: 113.7 },
  { name: 'Banyuwangi', lat: -8.219, lng: 114.369 },
  { name: 'Denpasar', lat: -8.65, lng: 115.216, alias: ['Bali'] }, { name: 'Mataram', lat: -8.583, lng: 116.116, alias: ['Lombok'] },
  { name: 'Labuan Bajo', lat: -8.497, lng: 119.889 }, { name: 'Kupang', lat: -10.177, lng: 123.607 },
  { name: 'Pontianak', lat: -0.026, lng: 109.342 }, { name: 'Singkawang', lat: 0.906, lng: 108.985 }, { name: 'Palangka Raya', lat: -2.21, lng: 113.92, alias: ['Palangkaraya'] },
  { name: 'Banjarmasin', lat: -3.316, lng: 114.59 }, { name: 'Banjarbaru', lat: -3.442, lng: 114.83 },
  { name: 'Balikpapan', lat: -1.265, lng: 116.831 }, { name: 'Samarinda', lat: -0.502, lng: 117.154 }, { name: 'Bontang', lat: 0.133, lng: 117.5 },
  { name: 'Ibu Kota Nusantara', lat: -0.97, lng: 116.7, alias: ['IKN', 'Nusantara'] }, { name: 'Tarakan', lat: 3.3, lng: 117.633 }, { name: 'Tanjung Selor', lat: 2.84, lng: 117.37 },
  { name: 'Manado', lat: 1.475, lng: 124.842 }, { name: 'Bitung', lat: 1.44, lng: 125.18 }, { name: 'Gorontalo', lat: 0.543, lng: 123.06 },
  { name: 'Palu', lat: -0.898, lng: 119.87 }, { name: 'Morowali', lat: -2.83, lng: 122.15 }, { name: 'Kendari', lat: -3.997, lng: 122.512 },
  { name: 'Makassar', lat: -5.148, lng: 119.432 }, { name: 'Parepare', lat: -4.014, lng: 119.62 }, { name: 'Mamuju', lat: -2.678, lng: 118.888 },
  { name: 'Ambon', lat: -3.695, lng: 128.181 }, { name: 'Ternate', lat: 0.79, lng: 127.38 }, { name: 'Sofifi', lat: 0.737, lng: 127.558 },
  { name: 'Sorong', lat: -0.876, lng: 131.255 }, { name: 'Manokwari', lat: -0.861, lng: 134.062 }, { name: 'Nabire', lat: -3.366, lng: 135.496 },
  { name: 'Timika', lat: -4.547, lng: 136.887 }, { name: 'Wamena', lat: -4.096, lng: 138.95 }, { name: 'Jayapura', lat: -2.533, lng: 140.717, alias: ['Papua'] },
  { name: 'Merauke', lat: -8.493, lng: 140.401 },
]

const norm = (s: string) => s.toLowerCase().replace(/^kota\s+|^kabupaten\s+|^kab\.?\s+/, '').replace(/\s+/g, ' ').trim()
export function findCity(name: string | null | undefined) {
  if (!name) return null
  const q = norm(name)
  return CITIES.find(c => norm(c.name) === q || c.alias?.some(a => norm(a) === q)) ?? null
}
export function nearestCity(lat: number, lng: number) {
  let best = CITIES[0], d = Infinity
  for (const c of CITIES) { const e = (c.lat - lat) ** 2 + (c.lng - lng) ** 2; if (e < d) { d = e; best = c } }
  return best
}
