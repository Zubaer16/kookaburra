import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

// Function to get all categories
export const getAllCategories = async () => {
  try {
    // Define query
    const ALL_CATEGORIES_QUERY = defineQuery(`
      *[_type == "category"] | order(name asc)
    `)

    // Execute query
    //Use sanity fetch to send the query
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    })

    // Return list or empty array
    return categories.data || []
  } catch (error) {
    console.error('Error fetching all categories:', error)
    return []
  }
}
