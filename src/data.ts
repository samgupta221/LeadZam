import type { Field, SectionId, FieldType } from './types'

const f = (
  section: SectionId, label: string, key: string, type: FieldType = 'text',
  extra: Partial<Field> = {},
): Field => ({
  id: key, section, label, key, type, description: '', options: [], requirement: 'optional',
  stageId: 's1', leadForm: true, quickAdd: false, ...extra,
})

export const SECTIONS: { id: SectionId; title: string; badge: string; blurb: string; icon: 'id' | 'list' | 'pin' | 'chart'; badgeClass: string }[] = [
  { id: 'pinned', title: 'Pinned Identity Fields', badge: 'Fields', icon: 'id', badgeClass: 'blue',
    blurb: 'Permanent records utilized for lead deduplication, phone verification, and identity matching.' },
  { id: 'core', title: 'Core Lead Details', badge: 'Customizable Flow', icon: 'list', badgeClass: 'violet',
    blurb: 'Drag handle to define placement on new lead creation screens and card summaries.' },
  { id: 'location', title: 'Location & Geography', badge: 'Fields', icon: 'pin', badgeClass: 'blue',
    blurb: 'Lead address coordinates, regional routing, timezone detection, and territory maps.' },
  { id: 'acquisition', title: 'Acquisition & Campaign Details', badge: 'Fields', icon: 'chart', badgeClass: 'blue',
    blurb: 'UTM parameters, referral channels, ad click IDs, tracking tokens, and touchpoints.' },
]

export const INITIAL_FIELDS: Field[] = [
  f('pinned', 'Full Name', 'lead.full_name', 'text', { system: true, requirement: 'required', quickAdd: true }),
  f('pinned', 'Primary Email', 'lead.primary_email', 'email', { system: true }),
  f('pinned', 'Primary Phone', 'lead.primary_phone', 'phone', { system: true, requirement: 'required', quickAdd: true }),
  f('pinned', 'Alternate Phone', 'lead.secondary_phone', 'phone', { system: true }),

  f('core', 'Company Name', 'lead.company_name'),
  f('core', 'Job Title', 'lead.job_title'),
  f('core', 'Lead Source', 'lead.lead_source', 'dropdown', {
    system: true, description: 'Where did this lead come from?', requirement: 'stage', stageId: 's3', quickAdd: true,
    options: ['Website', 'Google Ads', 'Meta Ads', 'LinkedIn', 'Referral', 'WhatsApp'],
  }),
  f('core', 'Industry Vertical', 'lead.industry_segment', 'dropdown', { options: ['SaaS', 'Retail', 'Education', 'Healthcare'] }),

  f('location', 'City', 'lead.city'),
  f('location', 'State / Region', 'lead.state', 'dropdown', { options: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Delhi'] }),
  f('location', 'Country', 'lead.country'),
  f('location', 'Postal Code', 'lead.postal_code'),
  f('location', 'Timezone', 'lead.timezone', 'dropdown', { options: ['IST (UTC+5:30)', 'GST (UTC+4)', 'SGT (UTC+8)'] }),
  f('location', 'Sales Territory', 'lead.territory', 'dropdown', { options: ['North', 'South', 'East', 'West'] }),

  f('acquisition', 'UTM Source', 'lead.utm_source'),
  f('acquisition', 'UTM Medium', 'lead.utm_medium'),
  f('acquisition', 'UTM Campaign', 'lead.utm_campaign'),
  f('acquisition', 'UTM Term', 'lead.utm_term'),
  f('acquisition', 'UTM Content', 'lead.utm_content'),
  f('acquisition', 'Google Click ID (gclid)', 'lead.gclid'),
  f('acquisition', 'Meta Click ID (fbclid)', 'lead.fbclid'),
  f('acquisition', 'Landing Page URL', 'lead.landing_url'),
  f('acquisition', 'Referrer URL', 'lead.referrer_url'),
  f('acquisition', 'First Touch Date', 'lead.first_touch', 'date'),
  f('acquisition', 'Touchpoint Count', 'lead.touchpoints', 'number'),
  f('acquisition', 'Tracking Token', 'lead.tracking_token'),
]
