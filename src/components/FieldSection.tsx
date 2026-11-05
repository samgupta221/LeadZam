import { ChevronDown, IdCard, AlignLeft, MapPin, PieChart, GripVertical } from 'lucide-react'
import type { Field } from '../types'
import { TYPE_ICON, TYPE_LABEL } from '../types'
import type { SECTIONS } from '../data'

const ICONS = { id: IdCard, list: AlignLeft, pin: MapPin, chart: PieChart }
type Section = (typeof SECTIONS)[number]

interface Props {
  section: Section; fields: Field[]; expanded: boolean; onToggle: () => void
  activeId: string | null; onEdit: (f: Field) => void
}

export function FieldSection({ section, fields, expanded, onToggle, activeId, onEdit }: Props) {
  const Icon = ICONS[section.icon]
  const showType = section.id !== 'core'
  const badge = section.badge === 'Fields' ? `${fields.length} Fields` : section.badge
  return (
    <section className="card">
      <button type="button" className="card-head" onClick={onToggle} aria-expanded={expanded}>
        <span className={`sec-icon ${section.badgeClass}`}><Icon size={15} /></span>
        <span className="grow">
          <span className="title-row"><strong>{section.title}</strong><span className={`chip ${section.badgeClass}`}>{badge}</span></span>
          <span className="blurb">{section.blurb}</span>
        </span>
        <ChevronDown size={16} className={`chev ${expanded ? 'up' : ''}`} />
      </button>
      {expanded && (
        <table className="ftable">
          <thead><tr>
            {!showType && <th className="c-num">#</th>}
            <th>Field label &amp; API key</th>{showType && <th className="c-type">Type</th>}
          </tr></thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={f.id} className={activeId === f.id ? 'active' : ''}>
                {!showType && <td className="c-num"><GripVertical size={14} aria-hidden /><span className="sr">{i + 1}</span></td>}
                <td>
                  <button type="button" className="row-btn" onClick={() => onEdit(f)} aria-label={`Edit field ${f.label}`}>
                    <span className="flabel">{f.label}
                      {activeId === f.id && <span className="chip tiny blue">Active in Drawer</span>}</span>
                    <code>{f.key}</code>
                  </button>
                </td>
                {showType && <td className="c-type"><span className="ticon" aria-hidden>{TYPE_ICON[f.type]}</span>{TYPE_LABEL[f.type].replace(' (single select)', '')}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
