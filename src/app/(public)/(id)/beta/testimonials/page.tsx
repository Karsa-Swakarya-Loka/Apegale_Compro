// /beta/testimonials: design preview of the "Kata klien" section with 1 to 12 SAMPLE quotes (?n=8). Not linked anywhere,
// noindex, and clearly labelled; delete this folder once the layout is approved.
import type { Metadata } from 'next'
import type { Testimonial } from '@/payload-types'
import { getMessages } from '@/i18n/messages'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

export const metadata: Metadata = { title: 'Beta: testimoni', robots: { index: false, follow: false } }

const SAMPLES = [
  'Contoh kutipan pendek untuk melihat tata letak kartu.',
  'Contoh kutipan sedang. Teks ini hanya mengisi ruang agar terlihat bagaimana kartu dengan beberapa kalimat tersusun di dalam deretan, termasuk saat tinggi kartu berbeda-beda.',
  'Contoh kutipan panjang. Teks ini sengaja dibuat lebih panjang supaya terlihat bagaimana kartu menangani beberapa kalimat sekaligus. Kalimat kedua menambah tinggi kartu, dan kalimat ketiga memastikan baris tetap rapi ketika tinggi antar kartu berbeda jauh. Semua kartu dalam satu baris tetap sama tinggi.',
]

export default async function Page({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const n = Math.min(12, Math.max(1, Number((await searchParams).n) || 8))
  const m = getMessages('id')
  const items = Array.from({ length: n }, (_, i) => ({
    id: i + 1, quote: SAMPLES[i % SAMPLES.length], name: `Nama Klien ${i + 1}`, role: 'Jabatan', company: 'Perusahaan Contoh',
  })) as unknown as Testimonial[]
  return (
    <>
      <div className="ag-container" style={{ paddingTop: 140 }}>
        <p style={{ background: 'var(--maroon)', color: '#fff', padding: '12px 16px', fontWeight: 700 }}>
          Pratinjau beta: {n} testimoni CONTOH, bukan testimoni klien. Ubah jumlahnya lewat ?n=3, ?n=8, ?n=12.
        </p>
      </div>
      <TestimonialsSection title={m.home.testimonialsTitle} highlight={m.home.testimonialsHighlight} items={items} labels={m.home.testimonialsNav} />
    </>
  )
}
