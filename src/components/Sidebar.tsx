import { Zap, ChevronsUpDown, User, ShieldCheck, Bell, Phone, MessageCircle, Building2, Users, FileClock,
  ClipboardList, BarChart3, ListChecks, Package, LogOut, type LucideIcon } from 'lucide-react'

type Item = { label: string; icon: LucideIcon; active?: boolean }
const GROUPS: { title: string; items: Item[] }[] = [
  { title: 'Account', items: [
    { label: 'Profile', icon: User }, { label: 'Password & Security', icon: ShieldCheck },
    { label: 'Notifications', icon: Bell }, { label: 'Call Settings', icon: Phone },
    { label: 'WhatsApp Digest', icon: MessageCircle } ] },
  { title: 'Workspace', items: [
    { label: 'Organization', icon: Building2 }, { label: 'Users', icon: Users }, { label: 'Audit Log', icon: FileClock } ] },
  { title: 'Customization', items: [
    { label: 'Lead Fields', icon: ClipboardList, active: true }, { label: 'Lead Stages', icon: BarChart3 },
    { label: 'Call Dispositions', icon: ListChecks }, { label: 'Products', icon: Package } ] },
]

export function Sidebar({ open }: { open: boolean }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Settings navigation">
      <div className="brand"><span className="brand-mark"><Zap size={16} fill="currentColor" /></span>
        <b>LeadZam</b><span className="chip gray">CRM</span></div>
      <button className="workspace" type="button">
        <span><small>WORKSPACE</small><strong>Acme Sales Team</strong></span><ChevronsUpDown size={14} />
      </button>
      <nav>
        {GROUPS.map((g) => (
          <div key={g.title} className="nav-group">
            <h2>{g.title}</h2>
            {g.items.map(({ label, icon: Icon, active }) => (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} className={active ? 'active' : ''}
                aria-current={active ? 'page' : undefined}><Icon size={16} />{label}</a>
            ))}
          </div>
        ))}
      </nav>
      <div className="user"><span className="avatar">SG</span>
        <span><strong>Sam Gupta</strong><small>Admin</small></span>
        <button type="button" aria-label="Log out"><LogOut size={16} /></button></div>
    </aside>
  )
}
