import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  // Define the query to get orders for this user, sorted by orderDate descending
  //   const MY_ORDERS_QUERY = defineQuery(`
  //     *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
  //       ...,
  //       products[] {
  //        ...,
  //        product->
  //       },
  //     }
  //   `)
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      products[] {
        _key,          // <- stable line-item key (React key)
        quantity,
        product-> {
          _id,         // <- product id you asked for
          name,
          price,
          currency,
          image
        }
      }
    }
  `)

  try {
    // Execute the query using sanityFetch
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    })

    // Return the list of orders or an empty array if none found
    return orders.data || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw new Error('Error fetching orders')
  }
}
