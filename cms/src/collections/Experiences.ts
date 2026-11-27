import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: 'Experience', plural: 'Experience' },
  // Drag rows in the admin list to order them, newest first
  orderable: true,
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    description: 'Jobs shown on the site. Drag to reorder, newest at the top.',
    defaultColumns: ['title', 'company', 'start', 'end'],
    listSearchableFields: ['title', 'company'],
  },
  // The Astro build reads these without logging in; writes still require a user
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', label: 'Job title', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'company', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'start', type: 'text', required: true, admin: { width: '50%', description: 'e.g. Apr 2025' } },
        { name: 'end', type: 'text', required: true, defaultValue: 'Present', admin: { width: '50%', description: 'e.g. June 2026, or Present' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true, admin: { rows: 5 } },
    { name: 'skills', type: 'text', hasMany: true, admin: { description: 'Press Enter after each skill' } },
  ],
}
