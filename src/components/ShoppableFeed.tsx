import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { products, formatPrice } from '@/data'
import { ShoppingBag } from 'lucide-react'

// Mock lifestyle images with hotspot coordinates mapping to products
const feedItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop', // Lifestyle fashion
    spots: [
      { x: 45, y: 30, productId: 'p9' }, // Ray-Ban Aviators
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526178613552-2b45c0c3ff46?w=800&auto=format&fit=crop', // Running lifestyle
    spots: [
      { x: 50, y: 70, productId: 'p12' }, // Nike Running Shoes
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=800&auto=format&fit=crop', // Tech setup
    spots: [
      { x: 30, y: 50, productId: 'p5' }, // Apple AirPods Pro
    ]
  }
]

export default function ShoppableFeed() {
  const { navigate, addToCart } = useApp()
  const [activeSpot, setActiveSpot] = useState<{ id: number, spotIdx: number } | null>(null)

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: '-100px' }} 
      transition={{ duration: 0.6 }} 
      className="py-12"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <p className="text-teal-600 font-bold tracking-wider text-xs mb-1 uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>Community</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Shop the Look</h2>
        </div>
        <p className="text-sm text-slate-500 hidden md:block">Hover over the glowing dots to reveal the product.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedItems.map((item) => (
          <div key={item.id} className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <img src={item.image} alt="Lifestyle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hotspots */}
            {item.spots.map((spot, idx) => {
              const product = products.find(p => p.id === spot.productId)
              if (!product) return null
              
              const isActive = activeSpot?.id === item.id && activeSpot?.spotIdx === idx

              return (
                <div 
                  key={idx}
                  className="absolute z-10"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onMouseEnter={() => setActiveSpot({ id: item.id, spotIdx: idx })}
                  onMouseLeave={() => setActiveSpot(null)}
                >
                  {/* Glowing Dot */}
                  <button className="relative w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-1 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)] border-2 border-white"></div>
                  </button>

                  {/* Tooltip Popup */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white rounded-xl shadow-2xl p-2 border border-slate-100 z-20 pointer-events-auto"
                        onMouseEnter={() => setActiveSpot({ id: item.id, spotIdx: idx })}
                      >
                        {/* Triangle pointer */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                        
                        <div className="flex gap-2">
                          <img src={product.image} className="w-12 h-12 rounded-lg object-cover bg-slate-50" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">{product.brand}</p>
                            <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                          <span className="text-sm font-bold text-teal-700">{formatPrice(product.price)}</span>
                          <button onClick={(e) => { e.stopPropagation(); addToCart(product) }} className="p-1.5 bg-slate-900 hover:bg-black text-white rounded-md transition-colors">
                            <ShoppingBag size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => navigate('product', { productId: product.id })} 
                          className="w-full mt-1 text-[10px] text-center text-slate-500 hover:text-teal-600 font-medium"
                        >
                          View Details →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </motion.section>
  )
}
