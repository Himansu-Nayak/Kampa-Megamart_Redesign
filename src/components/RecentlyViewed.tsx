import { useApp } from '@/context/AppContext'
import { products } from '@/data'
import ProductCard from './ProductCard'

export default function RecentlyViewed() {
  const { recentlyViewed, page } = useApp()
  
  if (recentlyViewed.length === 0 || page === 'checkout' || page === 'login' || page === 'cart') return null

  const viewedProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <div className="w-full bg-slate-50 border-t border-slate-200/60 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Recently Viewed
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {viewedProducts.map(product => (
            <div key={product.id} className="min-w-[240px] max-w-[240px] snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
