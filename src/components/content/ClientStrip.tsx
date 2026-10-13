import Image from 'next/image'
import type { Client } from '@/payload-types'
import { asMedia } from '@/lib/cms'

type Labels = { title: string }

function Logos({ clients, hidden }: { clients: Client[]; hidden?: boolean }) {
  return (
    <ul className="ag-marquee__track" aria-hidden={hidden || undefined}>
      {clients.map(c => {
        const logo = asMedia(c.logo)
        const img = logo?.url && logo.width && logo.height
          ? <Image src={logo.url} alt={hidden ? '' : c.name} width={logo.width} height={logo.height} sizes="(max-width: 767px) 160px, 220px" loading="eager" fetchPriority="low" />
          : <span className="ag-clients__name">{c.name}</span>
        return (
          <li key={c.id}>
            {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>{img}</a> : img}
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Client logos as a permanent ticker (owner decision, 09 Oct 2026): no pause button and no stop on hover.
 * Two identical tracks loop seamlessly; the second is hidden from assistive tech. The only exception is the
 * OS "reduce motion" setting, where the logos become a static, centred row.
 */
export function ClientStrip({ clients, labels }: { clients: Client[]; labels: Labels }) {
  if (!clients.length) return null
  return (
    <section className="ag-clients" aria-label={labels.title}>
      {labels.title ? <p className="ag-eyebrow ag-clients__label">{labels.title}</p> : null}
      <div className="ag-marquee">
        <Logos clients={clients} />
        <Logos clients={clients} hidden />
      </div>
    </section>
  )
}
