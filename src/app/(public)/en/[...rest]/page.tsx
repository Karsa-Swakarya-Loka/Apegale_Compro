import { notFound } from 'next/navigation'

// Any path without a page in this locale answers 404 inside the localized shell.
export default function CatchAll() {
  notFound()
}
