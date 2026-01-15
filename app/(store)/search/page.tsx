import SearchProductsView from '@/components/SearchProductsView'
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName'
import { getPaginationSettings } from '@/sanity/lib/products/getPaginationSettings'

async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string }
}) {
  const { query } = await searchParams
  const products = await searchProductsByName(query)
  const paginationSettings = await getPaginationSettings()

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <SearchProductsView
        products={products}
        query={query}
        productsPerPage={paginationSettings.postViewNumberPerSearchPage}
      />
    </div>
  )
}

export default SearchPage
