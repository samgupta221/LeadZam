import { useEffect, useRef } from 'react'
import { CheckCircle2, Trash2 } from 'lucide-react'

export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t) }, [message, onDone])
  return <div className="toast" role="status"><CheckCircle2 size={16} />{message}</div>
}

export function ConfirmDelete({ name, onCancel, onConfirm }: { name: string; onCancel: () => void; onConfirm: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <div className="modal-wrap" onKeyDown={(e) => e.key === 'Escape' && onCancel()}>
      <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="del-t" aria-describedby="del-d">
        <span className="modal-icon"><Trash2 size={18} /></span>
        <h2 id="del-t">Delete “{name}”?</h2>
        <p id="del-d">This removes the field from the lead form, quick add and API payloads. Values already saved on leads will no longer be visible. This can’t be undone.</p>
        <div className="modal-actions">
          <button ref={ref} type="button" className="btn" onClick={onCancel}>Keep field</button>
          <button type="button" className="btn danger" onClick={onConfirm}>Delete field</button>
        </div>
      </div>
    </div>
  )
}
