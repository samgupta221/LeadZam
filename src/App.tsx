import { useCallback, useMemo, useState } from 'react'
import { Search, Menu, X, FilterX } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { FieldSection } from './components/FieldSection'
import { EditDrawer } from './components/EditDrawer'
import { Toast, ConfirmDelete } from './components/Feedback'
import { INITIAL_FIELDS, SECTIONS } from './data'
import type { Field, SectionId } from './types'

export default function App() {
  const [fields, setFields] = useState<Field[]>(INITIAL_FIELDS)
  // `?edit=lead.lead_source` deep-links to the open-drawer state (handy for screenshots/demo)
  const [editingId, setEditingId] = useState<string | null>(() => new URLSearchParams(location.search).get('edit'))
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Record<SectionId, boolean>>({ pinned: true, core: true, location: false, acquisition: false })
  const [confirming, setConfirming] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [navOpen, setNavOpen] = useState(false)

  const editing = fields.find((f) => f.id === editingId) ?? null
  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () => fields.filter((f) => !q || f.label.toLowerCase().includes(q) || f.key.toLowerCase().includes(q)),
    [fields, q],
  )
  const closeDrawer = useCallback(() => setEditingId(null), [])
  const clearToast = useCallback(() => setToast(null), [])

  const save = (next: Field) => {
    setFields((fs) => fs.map((f) => (f.id === next.id ? next : f)))
    setEditingId(null); setToast(`“${next.label}” saved.`)
  }
  const remove = () => {
    if (!editing) return
    setFields((fs) => fs.filter((f) => f.id !== editing.id))
    setToast(`“${editing.label}” deleted.`); setConfirming(false); setEditingId(null)
  }

  return (
    <div className="app">
      <Sidebar open={navOpen} />
      {navOpen && <div className="nav-scrim" onClick={() => setNavOpen(false)} aria-hidden />}
      <main className="main">
        <div className="crumbs">
          <button type="button" className="icon-btn menu" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation">
            {navOpen ? <X size={18} /> : <Menu size={18} />}</button>
          <nav aria-label="Breadcrumb"><span>Settings</span><i>›</i><span>Customization</span><i>›</i><b aria-current="page">Lead Fields</b></nav>
        </div>
        <div className="content">
          <div className="title-row page-title"><h1>Lead Fields</h1><span className="chip gray">Configuration</span></div>
          <p className="lede">Manage, categorize, and prioritize the data points captured during lead intake and qualification.</p>

          <div className="search">
            <Search size={16} aria-hidden />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search fields"
              placeholder="Search by field label or API key (e.g., phone)" />
          </div>

          {q && filtered.length === 0 ? (
            <div className="empty" role="status">
              <FilterX size={22} /><h2>No fields match “{query.trim()}”</h2>
              <p>Check the spelling, or search by API key such as <code>utm_source</code>.</p>
              <button type="button" className="btn" onClick={() => setQuery('')}>Clear search</button>
            </div>
          ) : SECTIONS.map((s) => {
            const items = filtered.filter((f) => f.section === s.id)
            if (q && items.length === 0) return null
            return <FieldSection key={s.id} section={s} fields={items} expanded={q ? true : open[s.id]}
              onToggle={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))} activeId={editingId} onEdit={(f) => setEditingId(f.id)} />
          })}
        </div>
      </main>

      {editing && <EditDrawer key={editing.id} field={editing} onSave={save} onClose={closeDrawer} onDelete={() => setConfirming(true)} />}
      {confirming && editing && <ConfirmDelete name={editing.label} onCancel={() => setConfirming(false)} onConfirm={remove} />}
      {toast && <Toast message={toast} onDone={clearToast} />}
    </div>
  )
}
