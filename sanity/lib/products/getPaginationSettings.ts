import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getPaginationSettings = async () => {
  try {
    const PAGINATION_QUERY = defineQuery(`
      *[_type == "paginationView"][0] {
        postViewNumberPerPage,
        postViewNumberPerSearchPage,
        postViewNumberPerCategoryPage
      }
    `)

    const settings = await sanityFetch({
      query: PAGINATION_QUERY,
    })

    // If settings exist but value is 0, return 0 (no pagination)
    // Otherwise use default of 12
    return (
      settings.data || {
        postViewNumberPerPage: 12,
        postViewNumberPerSearchPage: 12,
        postViewNumberPerCategoryPage: 12,
      }
    )
  } catch (error) {
    console.error('Error fetching pagination settings:', error)
    return {
      postViewNumberPerPage: 12,
      postViewNumberPerSearchPage: 12,
      postViewNumberPerCategoryPage: 12,
    }
  }
}
