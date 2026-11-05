export type FieldType = 'text' | 'email' | 'phone' | 'number' | 'dropdown' | 'multiselect' | 'date'
export type Requirement = 'optional' | 'required' | 'stage'
export type SectionId = 'pinned' | 'core' | 'location' | 'acquisition'

export interface Field {
  id: string
  section: SectionId
  label: string
  key: string
  description: string
  type: FieldType
  options: string[]
  requirement: Requirement
  stageId: string
  leadForm: boolean
  quickAdd: boolean
  system?: boolean
}

export const TYPE_LABEL: Record<FieldType, string> = {
  text: 'Single Line Text',
  email: 'Email Address',
  phone: 'Phone Number',
  number: 'Number',
  dropdown: 'Dropdown (single select)',
  multiselect: 'Multi-select',
  date: 'Date',
}
export const TYPE_ICON: Record<FieldType, string> = {
  text: '—', email: '@', phone: '\u{1F4DE}\uFE0E', number: '#', dropdown: '○', multiselect: '☑', date: '▦',
}
export const hasOptions = (t: FieldType) => t === 'dropdown' || t === 'multiselect'

export const STAGES = [
  { id: 's1', name: 'Stage 1 - New Lead' },
  { id: 's2', name: 'Stage 2 - Contacted' },
  { id: 's3', name: 'Stage 3 - Proposal Sent' },
  { id: 's4', name: 'Stage 4 - Negotiation' },
  { id: 's5', name: 'Stage 5 - Won' },
]
