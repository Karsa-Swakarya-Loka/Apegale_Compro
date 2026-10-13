import type { Config } from 'payload'

// Indonesian CMS texts Payload lacks (the Lexical editor ships no Indonesian, so its labels showed as raw keys) or words
// awkwardly (empty cells, empty lists, untitled documents).
export const adminTranslations = {
  id: {
    general: {
      noLabel: '—',
      noResultsFound: 'Belum ada isi.',
      noResultsDescription: 'Belum ada data di sini, atau tidak ada yang cocok dengan pencarian dan filter.',
      untitled: 'Belum berjudul',
    },
    lexical: {
      general: {
        placeholder: 'Mulai menulis, atau ketik / untuk memilih format…',
        slashMenuBasicGroupLabel: 'Dasar',
        slashMenuListGroupLabel: 'Daftar',
        toolbarItemsActive: '{{count}} aktif',
      },
      align: { alignCenterLabel: 'Rata tengah', alignJustifyLabel: 'Rata kiri-kanan', alignLeftLabel: 'Rata kiri', alignRightLabel: 'Rata kanan' },
      blockquote: { label: 'Kutipan' },
      blocks: { label: 'Blok', inlineBlocks: { create: 'Buat {{label}}', edit: 'Ubah {{label}}', label: 'Blok dalam teks', remove: 'Hapus {{label}}' } },
      heading: { label: 'Judul {{headingLevel}}' },
      horizontalRule: { label: 'Garis pemisah' },
      indent: { decreaseLabel: 'Kurangi indentasi', increaseLabel: 'Tambah indentasi' },
      link: { label: 'Tautan', loadingWithEllipsis: 'Memuat…' },
      checklist: { label: 'Daftar centang' },
      orderedList: { label: 'Daftar bernomor' },
      unorderedList: { label: 'Daftar poin' },
      paragraph: { label: 'Paragraf', label2: 'Teks biasa' },
      relationship: { label: 'Tautan ke dokumen' },
      textState: { defaultStyle: 'Gaya bawaan' },
      upload: { label: 'Foto atau file' },
    },
  },
} as NonNullable<Config['i18n']>['translations']
