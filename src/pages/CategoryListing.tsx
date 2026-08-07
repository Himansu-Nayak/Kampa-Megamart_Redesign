import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { categories, products } from '@/data'
import ProductCard from '@/components/ProductCard'

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
]

export default function CategoryListing() {
  const { categoryId, navigate } = useApp()
  const [sort, setSort] = useState('popular')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const category = categories.find(c => c.id === categoryId)

  const categoryProducts = useMemo(() => {
    let list = categoryId && categoryId !== 'all'
      ? products.filter(p => p.category === categoryId)
      : products
    if (inStockOnly) list = list.filter(p => p.inStock)
    if (selectedBrands.length > 0) list = list.filter(p => selectedBrands.includes(p.brand))
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
      default: return [...list].sort((a, b) => b.reviews - a.reviews)
    }
  }, [categoryId, sort, priceRange, selectedBrands, inStockOnly])

  const allBrands = useMemo(() => {
    const base = categoryId && categoryId !== 'all' ? products.filter(p => p.category === categoryId) : products
    return [...new Set(base.map(p => p.brand))].sort()
  }, [categoryId])

  const perPage = 8
  const paginated = categoryProducts.slice(0, page * perPage)
  const hasMore = paginated.length < categoryProducts.length

  function toggleBrand(brand: string) {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <button onClick={() => navigate('home')} className="hover:text-teal-700 transition-colors">Home</button>
        <span>›</span>
        <button onClick={() => navigate('category', { categoryId: 'all' })} className="hover:text-teal-700 transition-colors">All Categories</button>
        {category && (
          <>
            <span>›</span>
            <span className="text-slate-800 font-medium">{category.name}</span>
          </>
        )}
      </nav>

      {/* Category header */}
      {category && (
        <div className="relative overflow-hidden rounded-2xl mb-6 h-32 md:h-40 bg-slate-800">
          <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="relative z-10 h-full flex items-center px-8 gap-4">
            <span className="text-5xl">{category.emoji}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{category.name}</h1>
              <p className="text-white/70 text-sm">{categoryProducts.length} products found</p>
            </div>
          </div>
        </div>
      )}

      {!category && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>All Products</h1>
          <p className="text-slate-500 text-sm">{categoryProducts.length} products</p>
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-100 p-4 sticky top-32 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Filters</h3>
              <button
                onClick={() => { setSelectedBrands([]); setPriceRange([0, 60000]); setInStockOnly(false) }}
                className="text-xs text-teal-600 hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Price range */}
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Price Range</p>
              <div className="space-y-2">
                {[[0, 500], [500, 2000], [2000, 10000], [10000, 60000]].map(([min, max]) => (
                  <label key={`${min}-${max}`} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={priceRange[0] === min && priceRange[1] === max}
                      onChange={() => setPriceRange(priceRange[0] === min && priceRange[1] === max ? [0, 60000] : [min, max])}
                      className="w-3.5 h-3.5 accent-teal-700"
                    />
                    <span className="text-xs text-slate-600 group-hover:text-slate-900">₹{min.toLocaleString('en-IN')} – {max === 60000 ? '₹60,000+' : '₹' + max.toLocaleString('en-IN')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Availability</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="w-3.5 h-3.5 accent-teal-700"
                />
                <span className="text-xs text-slate-600">In Stock Only</span>
              </label>
            </div>

            {/* Brands */}
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Brand</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {allBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-3.5 h-3.5 accent-teal-700"
                    />
                    <span className="text-xs text-slate-600 group-hover:text-slate-900">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-slate-100 px-4 py-2.5">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{categoryProducts.length}</span> results
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-500 bg-white"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-teal-700 text-white' : 'hover:bg-slate-100 text-slate-500'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-teal-700 text-white' : 'hover:bg-slate-100 text-slate-500'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Empty state */}
          {categoryProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>No products found</h3>
              <p className="text-slate-500 text-sm mb-4">Try adjusting your filters or explore other categories</p>
              <button
                onClick={() => { setSelectedBrands([]); setPriceRange([0, 60000]); setInStockOnly(false) }}
                className="px-4 py-2 bg-teal-700 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Product grid / list */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginated.map(p => <ProductCard key={p.id} product={p} variant="list" />)}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-8 py-3 border-2 border-teal-700 text-teal-700 font-semibold rounded-xl hover:bg-teal-700 hover:text-white transition-all"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
