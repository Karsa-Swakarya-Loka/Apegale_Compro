// Stable identities: keep these keys even when the wording changes.
export const faqKeys = [
 'faq-kitas-kitap', 'faq-documents', 'faq-garis', 'faq-nationwide', 'faq-consultation', 'faq-mou-discount',
] as const
// Services removed from the seed on purpose; the seed deletes them wherever they still exist.
// 18 Oct 2026: the six 2021 visa sub-pages were replaced by Visa Indonesia and Visa Global under Visa & Paspor.
// 22 Oct 2026: Manpower Supply is not an Ape Gale service (owner decision #46).
export const retiredServices = [
 'vitas', 'multiple-business-visa', 'visa-kunjungan', 'visa-tinggal-terbatas-penyatuan-keluarga', 'visa-on-arrival', 'visa-pelajar',
 'manpower-supply',
] as const
export const mediaAlt: Record<string, { id: string; en: string }> = {
 'design/assets/Photography/hero-meeting-city.jpg': { id: 'Empat orang berbincang di ruang rapat dengan latar gedung kota.', en: 'Four people talking in a meeting room overlooking city buildings.' },
 'design/assets/Photography/founder-deny-imran.png': { id: 'Deny Yandi Imran duduk mengenakan batik dan kacamata.', en: 'Deny Yandi Imran seated, wearing batik and glasses.' },
 'design/assets/Photography/garis-dashboard.png': { id: 'Tampilan dashboard GARIS dengan menu samping, ringkasan dan grafik.', en: 'GARIS dashboard showing a sidebar, summary panels and a chart.' },
 'design/assets/Photography/garis-expat-monitoring.png': { id: 'Tampilan dashboard mobile GARIS dengan ringkasan persyaratan dokumen.', en: 'GARIS mobile dashboard showing a summary of document requirements.' },
 'design/assets/Clients/official/affirmate.png': { id: 'Logo Affirmate.', en: 'Affirmate logo.' },
 'design/assets/Clients/official/ksb.png': { id: 'Logo KSB.', en: 'KSB logo.' },
 'design/assets/Clients/official/adakami.png': { id: 'Logo AdaKami.', en: 'AdaKami logo.' },
 'design/assets/Clients/official/unicharm.png': { id: 'Logo unicharm.', en: 'unicharm logo.' },
 'design/assets/Clients/official/chint.png': { id: 'Logo CHINT.', en: 'CHINT logo.' },
 'design/assets/Clients/official/ferbeck.png': { id: 'Logo Ferbeck International.', en: 'Ferbeck International logo.' },
 'design/assets/Clients/official/allnex.png': { id: 'Logo allnex.', en: 'allnex logo.' },
 'design/assets/Clients/official/lalamove.png': { id: 'Logo Lalamove.', en: 'Lalamove logo.' },
 'design/assets/Clients/official/apple.png': { id: 'Logo Apple.', en: 'Apple logo.' },
 'design/assets/Clients/official/neo-energy.png': { id: 'Logo Neo Energy.', en: 'Neo Energy logo.' },
 'design/assets/Clients/official/taiheiyo-cement.png': { id: 'Logo Taiheiyo Cement.', en: 'Taiheiyo Cement logo.' },
}
export const seedFiles = ['site','home','about','garis','services','clients','faqs','ui-dictionary'] as const

