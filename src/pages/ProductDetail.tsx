import { useState, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { products, formatPrice, getDiscount } from '@/data'
import ProductCard from '@/components/ProductCard'
import { StarRating } from '@/components/ProductCard'

const mockReviews = [
  { name: 'Vikas Kumar', rating: 5, date: '12 Jul 2025', title: 'Excellent value for money', text: 'Exceeded my expectations. Build quality is solid and performance is snappy. Delivery was a day early!' },
  { name: 'Sneha Patel', rating: 4, date: '28 Jun 2025', title: 'Very good, minor issues', text: 'Overall great product. Setup was simple and it works as advertised. Packaging could be slightly better but the product itself is 5-star.' },
  { name: 'Arun Krishnan', rating: 5, date: '15 Jun 2025', title: 'Bought 2nd time from Kampa', text: 'Repeat purchase — same great quality as before. Kampa consistently delivers genuine products at good prices. Highly recommend.' },
]

export default function ProductDetail() {
  const { productId, navigate, addToCart, addRecentlyViewed } = useApp()
  const product = products.find(p => p.id === productId) ?? products[0]
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [added, setAdded] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id)
    }
  }, [product, addRecentlyViewed])

  const discount = getDiscount(product.price, product.mrp)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  function handleAddToCart() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addToCart(product, qty)
    navigate('cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <button onClick={() => navigate('home')} className="hover:text-teal-700">Home</button>
        <span>›</span>
        <button onClick={() => navigate('category', { categoryId: product.category })} className="hover:text-teal-700 capitalize">
          {product.category.replace(/-/g, ' ')}
        </button>
        <span>›</span>
        <span className="text-slate-800 font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl border border-slate-100 p-6">
        {/* Image Magnifier */}
        <div className="space-y-3">
          <div 
            className="aspect-square bg-slate-50 rounded-xl overflow-hidden relative cursor-crosshair"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-200 ${zoom ? 'scale-[2]' : 'scale-100'}`} 
              style={zoom ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
            />
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-2">
            {[product.image, product.image, product.image].map((img, i) => (
              <button key={i} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === 0 ? 'border-teal-700' : 'border-transparent hover:border-slate-300'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {/* Brand + badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wide bg-teal-50 px-2 py-0.5 rounded">{product.brand}</span>
            {product.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                product.badge === 'sale' ? 'bg-red-100 text-red-600' :
                product.badge === 'new' ? 'bg-blue-100 text-blue-600' :
                product.badge === 'bestseller' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {product.badge === 'bestseller' ? '⭐ Best Seller' : product.badge.toUpperCase()}
              </span>
            )}
            {product.inStock ? (
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ In Stock</span>
            ) : (
              <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Out of Stock</span>
            )}
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-teal-700 text-white text-xs font-bold px-2 py-0.5 rounded">
              {product.rating} ★
            </div>
            <StarRating rating={product.rating} />
            <span className="text-sm text-slate-500">{product.reviews.toLocaleString()} ratings</span>
          </div>

          {/* Price */}
          <div className="bg-slate-50 rounded-xl p-4 mb-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(product.price)}</span>
              <span className="text-lg text-slate-400 line-through">{formatPrice(product.mrp)}</span>
              {discount > 0 && (
                <span className="text-base font-bold text-green-600">{discount}% off</span>
              )}
            </div>
            {discount > 0 && (
              <p className="text-sm text-green-700 mt-1 font-medium">You save {formatPrice(product.mrp - product.price)}</p>
            )}
            <p className="text-xs text-slate-500 mt-2">Inclusive of all taxes · Free delivery on this order</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm font-medium text-slate-700">Quantity:</span>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-slate-100 transition-colors text-slate-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 py-2 text-sm font-semibold text-slate-900 min-w-[2.5rem] text-center border-x border-slate-200">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-slate-100 transition-colors text-slate-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
                added ? 'border-green-500 bg-green-500 text-white' :
                'border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white'
              } disabled:border-slate-300 disabled:text-slate-400`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-200 disabled:text-slate-400 text-amber-900 rounded-xl font-semibold text-sm transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Group Buy Panel */}
          <div className="mb-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-40 -mr-10 -mt-10 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-bold text-white bg-amber-500 px-2 py-0.5 rounded uppercase tracking-wider">Social Deal</span>
                  <span className="text-xs font-bold text-red-500 flex items-center gap-1">🔥 Ends in 02:15:30</span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Team up & Save 30%</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Share with 2 friends to unlock wholesale pricing.</p>
              </div>
              <div className="flex flex-col w-full xl:w-auto flex-shrink-0">
                <button
                  onClick={() => alert('Invite link copied! Share with 2 friends. (Simulated)')}
                  className="w-full xl:w-auto py-2 px-4 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-sm shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Group Buy • {formatPrice(product.price * 0.7)}
                </button>
                <div className="flex justify-center xl:justify-end mt-2 -space-x-1.5">
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-teal-500 flex items-center justify-center text-[8px] text-white font-bold">You</div>
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200 border-dashed"></div>
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200 border-dashed"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-teal-600 mt-0.5">🚚</span>
              <div>
                <span className="font-medium text-slate-800">Free Delivery</span>
                <span className="text-slate-500 ml-2">Estimated: 1–3 business days</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600 mt-0.5">↩️</span>
              <div>
                <span className="font-medium text-slate-800">7-Day Returns</span>
                <span className="text-slate-500 ml-2">Easy hassle-free return & exchange</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-teal-600 mt-0.5">🔒</span>
              <div>
                <span className="font-medium text-slate-800">100% Genuine</span>
                <span className="text-slate-500 ml-2">Sourced directly from authorized distributors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          {(['description', 'specs', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'text-teal-700 border-b-2 border-teal-700 bg-teal-50/50'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {tab === 'reviews' ? `Reviews (${product.reviews.toLocaleString()})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">{product.description}</p>
              <ul className="mt-4 space-y-2">
                {['Genuine product backed by Kampa quality guarantee', 'Pan-India delivery, typically 1–3 business days', '7-day easy return & exchange policy', 'Secure payment via UPI, cards, or net banking'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-teal-600 mt-0.5 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && product.specs && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-2.5 px-4 text-slate-500 font-medium w-40">{key}</td>
                      <td className="py-2.5 px-4 text-slate-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Rating summary */}
              <div className="flex items-start gap-6 mb-6 pb-6 border-b border-slate-100">
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.rating}</div>
                  <div className="flex justify-center my-1">
                    <StarRating rating={product.rating} />
                  </div>
                  <div className="text-xs text-slate-500">{product.reviews.toLocaleString()} ratings</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(star => {
                    const pct = star === 5 ? 62 : star === 4 ? 22 : star === 3 ? 10 : star === 2 ? 4 : 2
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="text-slate-500 w-4">{star}★</span>
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-slate-400 w-6 text-right">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-5">
                {mockReviews.map(r => (
                  <div key={r.name} className="pb-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {r.name[0]}
                        </div>
                        <span className="font-semibold text-sm text-slate-800">{r.name}</span>
                        <span className="text-[10px] text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded font-semibold">✓ Verified Purchase</span>
                      </div>
                      <span className="text-xs text-slate-400">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mb-1">{r.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
      {/* Sticky Add-to-Cart Bar (Desktop & Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-3 shadow-[0_-4px_20px_rgb(0,0,0,0.05)] z-[60] flex items-center justify-between md:justify-center md:gap-12 transition-transform">
        <div className="hidden md:flex items-center gap-4">
          <img src={product.image} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <p className="text-sm font-bold text-slate-800 line-clamp-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</p>
            <p className="text-xs text-teal-700 font-extrabold">{formatPrice(product.price)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center border border-slate-200 rounded-lg bg-white p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-md font-medium">-</button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-md font-medium">+</button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 md:w-48 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all ${
              added ? 'bg-green-500 text-white shadow-green-500/30' : 
              !product.inStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 
              'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/30'
            }`}
          >
            {added ? '✓ Added' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      
    </div>
  )
}
