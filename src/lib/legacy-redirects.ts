// Old WordPress URLs (apegale.com, checked against wp-sitemap.xml on 09 Oct 2026) → new routes.
// next.config.ts turns each pair into a 301 (decision #25: statusCode 301, never permanent/308),
// for the path with and without its trailing slash. scripts/check-redirects.ts tests every entry.
// Not redirected on purpose: spam posts (/airbrush-…), /tag/*, /author/*, Elementor templates.
export type LegacyRedirect = [from: string, to: string]

const page = (from: string, to: string): LegacyRedirect => [`/${from}`, to]

export const legacyPages: LegacyRedirect[] = [
  // Tentang Kami (ID / EN)
  page('salam-dari-kami', '/tentang-kami#salam'), page('profil-perusahaan', '/tentang-kami#profil'),
  page('founder', '/tentang-kami#founder'), page('organigram', '/tentang-kami#organigram'),
  page('greetings', '/en/about#salam'), page('company-profile', '/en/about#profil'),
  page('founders-en', '/en/about#founder'), page('organigram-en', '/en/about#organigram'),
  // Layanan (ID)
  page('expatriate-hosting', '/layanan/broad-expatriate-hosting'), page('expatriate-formalities', '/layanan/expatriate-formalities'),
  page('layanan-kitas-kitap', '/layanan/kitas-kitap'), page('layanan-visa-paspor', '/layanan/visa-paspor'),
  ...['all-in-one-solutions', 'kitas-lansia', 'legalitas-perusahaan', 'airport-escort', 'hr-system-consulting'].map(slug => page(slug, `/layanan/${slug}`)),
  // Manpower Supply is not offered (owner, 22 Oct 2026): its old pages land on the services index.
  page('manpower-supply', '/layanan'),
  // The six 2021 visa sub-pages were retired (client revision 18 Oct 2026); their URLs land on Visa & Paspor.
  ...['vitas', 'multiple-business-visa', 'visa-kunjungan', 'visa-tinggal-terbatas-penyatuan-keluarga', 'visa-on-arrival', 'visa-pelajar']
    .map(slug => page(slug, '/layanan/visa-paspor')),
  // Services (EN)
  page('expatriate-hosting-en', '/en/services/broad-expatriate-hosting'), page('expatriate-formalities-en', '/en/services/expatriate-formalities'),
  page('manpower-supply-en', '/en/services'), page('company-legalities', '/en/services/legalitas-perusahaan'),
  page('airport-escort-2', '/en/services/airport-escort'), page('hr-system-consulting-en', '/en/services/hr-system-consulting'),
  page('kitas-kitap-services', '/en/services/kitas-kitap'), page('visa-passport-services', '/en/services/visa-paspor'),
  page('all-in-one-solutions-en', '/en/services/all-in-one-solutions'), page('senior-kitas-visa-services', '/en/services/kitas-lansia'),
  ...['vitas-en', 'multiple-business-visa-en', 'visitor-visa-and-visa-for-cultural-and-social-visit-vksb', 'family-unification-limites-stay-visa',
    'visa-on-arrival-en', 'student-visa'].map(slug => page(slug, '/en/services/visa-paspor')),
  // GARIS
  ...['garis-in', 'garis-formalities-in', 'garis-airport-in', 'garis-expat-in'].map(s => page(s, '/garis')),
  ...['garis-en', 'garis-formalities-en', 'garis-airport-en', 'garis-expat-en'].map(s => page(s, '/en/garis')),
  page('coba-gratis-aplikasi-garis', '/garis#coba-gratis'), page('try-garis', '/en/garis#coba-gratis'),
  // Regulasi
  page('enactments-undang-undang-cipta-kerja', '/regulasi?kategori=cipta-kerja'), page('ketentuan-perizinan-tka', '/regulasi?kategori=perizinan-tka'),
  page('ketentuan-keimigrasian-untuk-tka', '/regulasi?kategori=keimigrasian-tka'), page('enactments-ketentuan-manpower-supply', '/regulasi?kategori=manpower-supply'),
  page('enactments-ketentuan-ketentuan-lainnya', '/regulasi?kategori=lainnya'),
  page('enactments-omnibus-law', '/en/regulations?kategori=cipta-kerja'), page('enactments-expatriate-legalities', '/en/regulations?kategori=perizinan-tka'),
  page('enactments-expatriate-immigration', '/en/regulations?kategori=keimigrasian-tka'), page('enactments-manpower-supply', '/en/regulations?kategori=manpower-supply'),
  page('other-regulations', '/en/regulations?kategori=lainnya'),
  // News, contact, home
  page('news-en', '/en/news'), page('category/news', '/news'), page('contact-us', '/en/contact'),
  // 2021 posts are not migrated (docs/02); send them to News instead of a 404.
  ...['kabar-terkini', 'wna-bisa-ikut-vaksinasi-juga', 'addendum-se-satgas-covid-19-no-8-tahun-2021', 'rangkuman-ketentuan-perjalanan-orang-dalam-negeri',
    'peraturan-terbaru-keimigrasian-perihal-ketentuan-visa-tanda-masuk-dan-izin-tinggal-keimigrasian-dalam-masa-ppkm-covid-19',
    'permenkumham-terbaru-mengenai-pembatasan-wna-masuk-ke-indonesia', 'peraturan-menaker-mengenai-penggunaan-tenaga-kerja-asing',
    'se-satgas-covid-19-no-18-tahun-2021', 'update-penggunaan-hotel-untuk-karantina', 'permenkumham-no-34-tahun-2021',
    'kepmenkumham-no-m-hh-03-gr-01-05-tahun-2021', 'se-satgas-covid-terbaru', 'sk-satgas-covid-terbaru', 'addendum-se-satgas-covid-19',
    '8541-2', 'addenum-se-no-23-tahun-2021', 'se-satgas-covid-19-terbaru', 'se-satgas-covid-19-terkini',
    'implementasi-permenkumham-29-2021-imigrasi-sesuaikan-mekanisme-perpanjangan-dan-tarif-izin-tinggal-keimigrasian',
  ].map(s => page(s, '/news')),
]

/** Pages are matched with and without the trailing slash; files (PDF map) only as written. */
export function legacyRedirects(pdfMap: Record<string, string>) {
  const pages = legacyPages.flatMap(([from, to]) => [{ source: from, destination: to }, { source: `${from}/`, destination: to }])
  const files = Object.entries(pdfMap).map(([source, destination]) => ({ source, destination }))
  return [...pages, ...files].map(r => ({ ...r, statusCode: 301 as const }))
}
