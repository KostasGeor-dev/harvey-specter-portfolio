import React from 'react'
import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'News & Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Award', 'Achievement', 'Feature', 'Project Update', 'Interview'],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short teaser shown on news cards (2–3 sentences).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'string',
      description: 'Fallback external image URL when no cover image is uploaded.',
      validation: (r) =>
        r.custom((val: string | undefined) => {
          if (!val) return true;
          try {
            const u = new URL(val);
            return u.protocol === 'https:' ? true : 'Must be an HTTPS URL';
          } catch {
            return 'Invalid URL';
          }
        }),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage', imageUrl: 'imageUrl' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: (({ title, subtitle, media, imageUrl }: any) => ({
      title,
      subtitle,
      media: media || (imageUrl
        ? React.createElement('img', { src: imageUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } })
        : undefined),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any,
  },
})
