import { defineType, defineField } from 'sanity'

export const paginationViewType = defineType({
  name: 'paginationView',
  title: 'Pagination View',
  type: 'document',
  fields: [
    defineField({
      name: 'postViewNumberPerPage',
      title: 'Number of products per page',
      type: 'number',
      description: 'The number of products that will be displayed per page.',
      validation: (Rule) => Rule.required().integer().min(0).max(100),
    }),
    defineField({
      name: 'postViewNumberPerSearchPage',
      title: 'Number of products per search page',
      type: 'number',
      description:
        'The number of products that will be displayed per search page.',
      validation: (Rule) => Rule.required().integer().min(0).max(100),
    }),
    defineField({
      name: 'postViewNumberPerCategoryPage',
      title: 'Number of products per category page',
      type: 'number',
      description:
        'The number of products that will be displayed per category page.',
      validation: (Rule) => Rule.required().integer().min(0).max(100),
    }),
  ],
})
