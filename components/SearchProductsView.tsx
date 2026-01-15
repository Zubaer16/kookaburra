'use client'

import { Product } from '@/sanity.types'
import ProductGrid from './ProductGrid'
import { PaginationComponent } from './Pagination'
import { useState, useEffect } from 'react'

interface SearchProductsViewProps {
  products: Product[]
  query: string
  productsPerPage?: number
}

const SearchProductsView = ({
  products,
  query,
  productsPerPage = 12,
}: SearchProductsViewProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  // If productsPerPage is 0, show all products (no pagination)
  const isPaginationEnabled = productsPerPage > 0

  // Calculate pagination
  const totalPages = isPaginationEnabled
    ? Math.ceil(products.length / productsPerPage)
    : 1
  const startIndex = isPaginationEnabled
    ? (currentPage - 1) * productsPerPage
    : 0
  const endIndex = isPaginationEnabled
    ? startIndex + productsPerPage
    : products.length
  const currentProducts = isPaginationEnabled
    ? products.slice(startIndex, endIndex)
    : products

  // Reset to page 1 when query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!products.length) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          No products found for: {query}
        </h1>
        <p className="text-gray-600 text-center">
          Try searching with different keywords
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search results for: {query}
      </h1>

      {/* Product count info */}
      {isPaginationEnabled ? (
        <div className="mb-4 text-sm text-gray-600 text-center">
          Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of{' '}
          {products.length} results
        </div>
      ) : (
        <div className="mb-4 text-sm text-gray-600 text-center">
          Showing all {products.length} results
        </div>
      )}

      {/* Products Grid */}
      <ProductGrid products={currentProducts} />

      {/* Pagination - only show if enabled */}
      {isPaginationEnabled && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default SearchProductsView
