import { useEffect, useRef, useState } from 'react'
import { X, Copy, Check, Lock, Plus, Trash2, Save, AlignJustify, AlertCircle } from 'lucide-react'
import { STAGES, TYPE_LABEL, hasOptions, type Field, type FieldType, type Requirement } from '../types'

interface Props { field: Field; onSave: (f: Field) => void; onClose: () => void; onDelete: () => void }
type Errors = { label?: string; options?: string; stage?: string; optionIdx: number[] }

const REQ: { id: Requirement; title: string; hint: string }[] = [
  { id: 'optional', title: 'Optional', hint: 'Can be blank' },
  { id: 'required', title: 'Required', hint: 'Required on save' },
  { id: 'stage', title: 'Stage-based', hint: 'Required at specific stage' },
]

function validate(d: Field): Errors {
  const e: Errors = { optionIdx: [] }
  if (!d.label.trim()) e.label = 'Field name is required.'
  else if (d.label.trim().length > 60) e.label = 'Keep the name under 60 characters.'
  if (hasOptions(d.type)) {
    const seen = new Set<string>()
    d.options.forEach((o, i) => {
      const k = o.trim().toLowerCase()
      if (!k || seen.has(k)) e.optionIdx.push(i)
      seen.add(k)
    })
    if (d.options.length < 2) e.options = 'Add at least 2 options.'
    else if (e.optionIdx.length) e.options = 'Options can’t be blank or duplicated.'
  }
  if (d.requirement === 'stage' && !STAGES.some((s) => s.id === d.stageId)) e.stage = 'Choose the stage where this becomes required.'
  return e
}
const hasErrors = (e: Errors) => !!(e.label || e.options || e.stage)

export function EditDrawer({ field, onSave, onClose, onDelete }: Props) {
  const [draft, setDraft] = useState<Field>(field)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const optsRef = useRef<HTMLDivElement>(null)
  const errors = validate(draft)
  const show = submitted ? errors : ({ optionIdx: [] } as Errors)
  const set = <K extends keyof Field>(k: K, v: Field[K]) => setDraft((d) => ({ ...d, [k]: v }))
  const shortKey = field.key.replace(/^lead\./, '')

  useEffect(() => { nameRef.current?.focus() }, [])
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const copyKey = () => { navigator.clipboard?.writeText(shortKey).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const save = () => {
    setSubmitted(true)
    if (hasErrors(errors)) {
      document.querySelector<HTMLElement>('.drawer [aria-invalid="true"]')?.focus()
      return
    }
    onSave({ ...draft, label: draft.label.trim(), description: draft.description.trim(), options: hasOptions(draft.type) ? draft.options.map((o) => o.trim()) : [] })
  }
  const addOption = () => {
    set('options', [...draft.options, ''])
    setTimeout(() => optsRef.current?.querySelectorAll('input')[draft.options.length]?.focus(), 0)
  }
  const setOption = (i: number, v: string) => set('options', draft.options.map((o, j) => (j === i ? v : o)))
  const removeOption = (i: number) => set('options', draft.options.filter((_, j) => j !== i))
  const changeType = (t: FieldType) => setDraft((d) => ({ ...d, type: t, options: hasOptions(t) && d.options.length === 0 ? ['Option 1', 'Option 2'] : d.options }))

  return (
    <div className="drawer-wrap">
      <div className="overlay" onClick={onClose} aria-hidden />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-title">
        <header className="dr-head">
          <span className="dr-icon"><AlignJustify size={16} /></span>
          <div className="grow">
            <div className="title-row"><h2 id="dr-title">{field.label}</h2>
              {field.system && <span className="chip gray"><Lock size={10} />System Field</span>}</div>
            <code className="sub">{shortKey}</code>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close drawer"><X size={18} /></button>
        </header>

        <div className="dr-body">
          <div className="fg">
            <label htmlFor="f-name">Field Name <span className="req">*</span></label>
            <input id="f-name" ref={nameRef} value={draft.label} onChange={(e) => set('label', e.target.value)}
              aria-invalid={!!show.label} aria-describedby="f-name-h" className={show.label ? 'err' : ''} />
            <p id="f-name-h" className={show.label ? 'help error' : 'help'}>
              {show.label ? <><AlertCircle size={12} />{show.label}</> : 'This is the name your team sees when working with leads.'}</p>
          </div>

          <div className="fg">
            <div className="split"><label htmlFor="f-key">Field Key</label><span className="ro"><Lock size={11} />Read-only system key</span></div>
            <div className="key-box"><input id="f-key" className="mono" value={shortKey} readOnly aria-readonly="true" />
              <button type="button" className="icon-btn sm" onClick={copyKey} aria-label="Copy field key">{copied ? <Check size={14} /> : <Copy size={14} />}</button></div>
            <p className="help">Used internally to identify this field across integrations and API payloads.</p>
          </div>

          <div className="fg">
            <label htmlFor="f-desc">Description</label>
            <input id="f-desc" value={draft.description} onChange={(e) => set('description', e.target.value)} maxLength={120} />
            <p className="help">Help your team choose the right option.</p>
          </div>

          <div className="fg split top">
            <div><label htmlFor="f-type">Field Type</label><p className="help">Determines the input format in lead capture.</p></div>
            <select id="f-type" className="type-pill" value={draft.type} onChange={(e) => changeType(e.target.value as FieldType)}>
              {(Object.keys(TYPE_LABEL) as FieldType[]).map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
            </select>
          </div>

          {hasOptions(draft.type) && (
            <div className={`options ${show.options ? 'err' : ''}`}>
              <div className="split"><strong id="opt-h">Options ({draft.options.length})</strong>
                <button type="button" className="link" onClick={addOption}><Plus size={13} />Add Option</button></div>
              <div className="opt-grid" ref={optsRef} role="group" aria-labelledby="opt-h">
                {draft.options.map((o, i) => (
                  <div key={i} className={`opt ${show.optionIdx.includes(i) ? 'err' : ''}`}>
                    <input value={o} onChange={(e) => setOption(i, e.target.value)} aria-label={`Option ${i + 1}`}
                      aria-invalid={show.optionIdx.includes(i)} placeholder="Option name" />
                    <button type="button" onClick={() => removeOption(i)} aria-label={`Remove option ${o || i + 1}`}><X size={12} /></button>
                  </div>
                ))}
              </div>
              {show.options && <p className="help error"><AlertCircle size={12} />{show.options}</p>}
            </div>
          )}

          <fieldset className="fg">
            <legend>Field Requirement</legend>
            <div className="req-grid">
              {REQ.map((r) => (
                <label key={r.id} className={`req-card ${draft.requirement === r.id ? 'on' : ''}`}>
                  <input type="radio" name="req" checked={draft.requirement === r.id} onChange={() => set('requirement', r.id)} />
                  <span className="radio" aria-hidden /><strong>{r.title}</strong><small>{r.hint}</small>
                </label>
              ))}
            </div>
            {draft.requirement === 'stage' && (
              <div className="stage-box">
                <label htmlFor="f-stage">Required starting at</label>
                <select id="f-stage" value={draft.stageId} onChange={(e) => set('stageId', e.target.value)} aria-invalid={!!show.stage}>
                  {STAGES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <p className="help">Leads can’t move to this stage or beyond until the field is filled.</p>
              </div>
            )}
          </fieldset>

          <fieldset className="fg">
            <legend>Where This Field Appears</legend>
            {([['leadForm', 'Lead form', 'Shown when creating or editing a lead.'], ['quickAdd', 'Quick add', 'Shown in the quick-add lead flow.']] as const).map(([k, t, d]) => (
              <label key={k} className="check-row">
                <span><strong>{t}</strong><small>{d}</small></span>
                <input type="checkbox" checked={draft[k]} onChange={(e) => set(k, e.target.checked)} />
                <span className="box" aria-hidden><Check size={13} strokeWidth={3} /></span>
              </label>
            ))}
          </fieldset>
        </div>

        <footer className="dr-foot">
          <button type="button" className="btn ghost-danger" onClick={onDelete}><Trash2 size={14} />Delete Field</button>
          <div className="grow" />
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="button" className="btn primary" onClick={save}><Save size={14} />Save Field</button>
        </footer>
      </aside>
    </div>
  )
}
