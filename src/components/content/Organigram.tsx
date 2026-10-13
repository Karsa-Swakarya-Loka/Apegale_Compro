type Person = { name: string; role?: string | null; parentIndex?: number | null }
type Node = Person & { index: number; children: Node[] }

function build(people: Person[]): Node[] {
  const nodes: Node[] = people.map((p, index) => ({ ...p, index, children: [] }))
  const roots: Node[] = []
  for (const n of nodes) {
    const parent = typeof n.parentIndex === 'number' ? nodes[n.parentIndex] : undefined
    if (parent && parent !== n) parent.children.push(n)
    else roots.push(n)
  }
  return roots
}

function Card({ person, lead }: { person: Person; lead?: boolean }) {
  return (
    <div className={`ag-org__card${lead ? ' ag-org__card--lead' : ''}`}>
      <b>{person.name}</b>
      {person.role ? <span>{person.role}</span> : null}
    </div>
  )
}

/**
 * Organisation chart from about.organigram (company profile 2026). A nested list, so it reads in order
 * for screen readers; on wide screens the first level lays out as columns under the director.
 */
export function Organigram({ people, label }: { people: Person[]; label: string }) {
  const roots = build(people.filter(p => p.name))
  if (!roots.length) return null
  return (
    <ul className="ag-org" aria-label={label}>
      {roots.map(root => (
        <li key={root.index} className="ag-org__root">
          <Card person={root} lead />
          {root.children.length ? (
            <ul className="ag-org__level">
              {root.children.map(head => (
                <li key={head.index} className="ag-org__branch">
                  <Card person={head} />
                  {head.children.length ? (
                    <ul className="ag-org__team">
                      {head.children.map(member => <li key={member.index}><Card person={member} /></li>)}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
