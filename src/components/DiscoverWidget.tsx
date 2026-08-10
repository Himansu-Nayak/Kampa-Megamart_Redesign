import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { products, formatPrice } from '@/data'
import { Heart, MessageCircle, Share2, ShoppingCart } from 'lucide-react'

export default function DiscoverWidget() {
  const { navigate, addToCart, toggleWishlist, wishlist, isDiscoverOpen, toggleDiscover } = useApp()
  const discoverProducts = products.filter(p => p.rating > 4.5).slice(0, 6)
  
  const lifestyleBackgrounds = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1512496015851-a1dc8a477d13?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=1200&fit=crop'
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = containerRef.current.scrollTop
      // Height of the widget is 550px
      const height = 550 
      const index = Math.round(scrollY / height)
      setActiveIndex(index)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
    }
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isDiscoverOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 left-6 w-[320px] h-[550px] z-[90] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-900"
      >
        <button 
          onClick={toggleDiscover}
          className="absolute top-4 right-4 z-[70] w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="absolute top-4 left-0 right-0 flex justify-center z-[70] pointer-events-none">
          <div className="flex gap-4 items-center">
            <span className="text-white/60 font-medium text-xs drop-shadow-md">Following</span>
            <span className="text-white font-bold text-xs border-b-2 border-white pb-0.5 drop-shadow-md">For You</span>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
        >
          {discoverProducts.map((p, index) => (
            <div key={p.id} className="h-[550px] w-full snap-start snap-always relative flex items-center justify-center overflow-hidden bg-black">
              
              <motion.div 
                className="absolute inset-0 z-0"
                animate={activeIndex === index ? { scale: [1, 1.05, 1], x: [0, -10, 0] } : { scale: 1, x: 0 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10" />
                <img src={lifestyleBackgrounds[index % lifestyleBackgrounds.length]} alt="Lifestyle" className="w-full h-full object-cover" />
              </motion.div>

              <div className="absolute inset-0 z-10 cursor-pointer" onClick={(e) => {
                 const el = e.currentTarget.querySelector('.play-icon') as HTMLElement;
                 if(el) {
                   el.style.opacity = '1';
                   el.style.transform = 'scale(1.5)';
                   setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'scale(1)'; }, 400);
                 }
              }}>
                <div className="play-icon opacity-0 transition-all duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>

              <div className="absolute right-2 bottom-20 z-20 flex flex-col gap-4 items-center">
                <button onClick={() => toggleWishlist(p.id)} className="relative flex flex-col items-center gap-1 group">
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-teal-600 transition-colors">
                    <Heart className="w-5 h-5" fill={wishlist.includes(p.id) ? "currentColor" : "none"} color={wishlist.includes(p.id) ? "#ef4444" : "white"} />
                  </div>
                  <span className="text-white text-[10px] font-semibold drop-shadow-md">{(p.reviews * 1.5).toLocaleString()}</span>
                </button>
                
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-slate-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-white text-[10px] font-semibold drop-shadow-md">{Math.floor(p.reviews / 10).toLocaleString()}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-white text-[10px] font-semibold drop-shadow-md">Share</span>
                </button>
                
                <div className="w-10 h-10 mt-2 rounded-full border-2 border-white/50 overflow-hidden animate-[spin_4s_linear_infinite]">
                   <img src={p.image} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="absolute bottom-4 left-3 right-14 z-20 flex flex-col gap-2 pointer-events-none">
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 p-0.5 shadow-lg">
                    <div className="w-full h-full bg-teal-800 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase">
                      {p.brand.slice(0, 2)}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xs drop-shadow-md">@{p.brand.toLowerCase()}</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-white font-medium text-xs leading-tight drop-shadow-md line-clamp-2">
                    Just got the new <span className="font-bold">{p.name}</span>! Loving it. #megamart #premium
                  </h2>
                </div>
                
                <div className="pointer-events-auto bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 p-1.5 rounded-xl flex items-center gap-2 transition-colors cursor-pointer group shadow-2xl" onClick={() => navigate('product', { productId: p.id })}>
                  <img src={p.image} className="w-10 h-10 object-cover rounded-lg shadow-md border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-[11px] truncate drop-shadow-sm">{p.name}</p>
                    <p className="text-teal-400 font-extrabold text-[11px] drop-shadow-sm">{formatPrice(p.price)}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(p)
                    }}
                    className="bg-teal-500 hover:bg-teal-400 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-teal-500/30 flex-shrink-0"
                  >
                    <ShoppingCart size={14} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
