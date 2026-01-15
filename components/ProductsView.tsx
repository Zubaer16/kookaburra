'use client'

import { Category, Product } from '@/sanity.types'
import ProductGrid from './ProductGrid'
import { CategorySelectorComponent } from './ui/category-selector'
import { PaginationComponent } from './Pagination'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface ProductsViewProps {
  products: Product[]
  categories: Category[]
  productsPerPage?: number
}

const ProductsView = ({
  products,
  categories,
  productsPerPage = 12,
}: ProductsViewProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  // If productsPerPage is 0, show all products (no pagination)
  const isPaginationEnabled = productsPerPage > 0
  const pathname = usePathname()

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

  // Reset to page 1 when products change (e.g., category filter)
  useEffect(() => {
    setCurrentPage(1)
  }, [products, pathname])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of products
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col w-full">
      {/* categories */}
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* Product count info */}
      {isPaginationEnabled ? (
        <div className="mt-4 text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of{' '}
          {products.length} products
        </div>
      ) : (
        <div className="mt-4 text-sm text-gray-600">
          Showing all {products.length} products
        </div>
      )}

      {/* products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={currentProducts} />

          {/* Pagination - only show if enabled */}
          {isPaginationEnabled && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <hr className="w-1/2 sm:w-3/4 mt-4" />
        </div>
      </div>
    </div>
  )
}

export default ProductsView
