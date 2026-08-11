import type { Product } from '@/data'
import { getDiscount, formatPrice } from '@/data'
import { useApp } from '@/context/AppContext'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React from 'react'
import { Scale } from 'lucide-react'

interface Props {
  product: Product
  variant?: 'grid' | 'list'
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-amber-400' : i - 0.5 <= rating ? 'text-amber-300' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export { StarRating }

function BlurImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  return (
    <>
      {!isLoaded && <div className={`absolute inset-0 bg-slate-200 animate-pulse ${className}`} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ${isLoaded ? 'blur-0 opacity-100' : 'blur-md opacity-0'} ${className}`}
      />
    </>
  )
}

function flyToCart(e: React.MouseEvent, imgSrc: string) {
  const rect = (e.target as HTMLElement).closest('.product-card-container')?.getBoundingClientRect()
  if (!rect) return
  
  const ghost = document.createElement('img')
  ghost.src = imgSrc
  ghost.style.position = 'fixed'
  ghost.style.left = `${rect.left + rect.width / 2 - 30}px`
  ghost.style.top = `${rect.top + 30}px`
  ghost.style.width = '60px'
  ghost.style.height = '60px'
  ghost.style.objectFit = 'cover'
  ghost.style.borderRadius = '12px'
  ghost.style.zIndex = '9999'
  ghost.style.pointerEvents = 'none'
  ghost.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
  ghost.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)'
  document.body.appendChild(ghost)

  setTimeout(() => {
    const isMobile = window.innerWidth < 768
    const target = document.querySelector(isMobile ? '.bottom-cart-icon' : '.header-cart-icon')
    if (target) {
      const targetRect = target.getBoundingClientRect()
      ghost.style.left = `${targetRect.left + targetRect.width / 2 - 10}px`
      ghost.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`
    } else {
      ghost.style.left = `calc(100vw - 40px)`
      ghost.style.top = `20px`
    }
    ghost.style.transform = 'scale(0.1)'
    ghost.style.opacity = '0.5'
  }, 10)

  setTimeout(() => {
    if (document.body.contains(ghost)) {
      document.body.removeChild(ghost)
    }
  }, 800)
}

export default function ProductCard({ product, variant = 'grid' }: Props) {
  const { navigate, addToCart, wishlist, toggleWishlist, compareList, toggleCompare } = useApp()
  const discount = getDiscount(product.price, product.mrp)
  const inWishlist = wishlist.includes(product.id)
  const inCompare = compareList?.includes(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    addToCart(product)
    flyToCart(e, product.image)
  }

  if (variant === 'list') {
    return (
      <div className="product-card-container bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex gap-4 p-4">
        <button onClick={() => navigate('product', { productId: product.id })} className="relative w-28 h-28 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden">
          <BlurImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && <BadgePill badge={product.badge} />}
        </button>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{product.brand}</p>
            <button onClick={() => navigate('product', { productId: product.id })} className="text-sm font-semibold text-slate-800 hover:text-teal-700 transition-colors line-clamp-2 text-left mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</button>
            <div className="flex items-center gap-2 mt-1.5">
              <StarRating rating={product.rating} />
              <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-base font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(product.price)}</span>
              <span className="text-xs text-slate-400 line-through ml-2">{formatPrice(product.mrp)}</span>
              {discount > 0 && <span className="text-xs text-green-600 font-semibold ml-1">{discount}% off</span>}
            </div>
            <button onClick={handleAddToCart} disabled={!product.inStock} className="px-5 py-2 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 1200 }} className="z-10 relative product-card-container">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] flex flex-col overflow-hidden relative w-full h-full"
      >
        <div className="relative bg-slate-50 overflow-hidden aspect-[4/5] transform-gpu" style={{ transform: "translateZ(20px)" }}>
          <button onClick={() => navigate('product', { productId: product.id })} className="block w-full h-full relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500">
            <BlurImage src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </button>
          {product.badge && (
            <div className="absolute top-2 left-2 transform-gpu" style={{ transform: "translateZ(30px)" }}>
              <BadgePill badge={product.badge} />
            </div>
          )}
          {discount >= 20 && !product.badge && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[0.625rem] font-bold px-2 py-0.5 rounded-full transform-gpu" style={{ transform: "translateZ(30px)" }}>
              {discount}% OFF
            </div>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity transform-gpu hover:scale-110"
            style={{ transform: "translateZ(40px)" }}
            title="Wishlist"
          >
            <svg className={`w-4 h-4 ${inWishlist ? 'text-red-500 fill-current' : 'text-slate-400'}`} fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <button
            onClick={() => toggleCompare(product.id)}
            className="absolute top-10 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity transform-gpu hover:scale-110"
            style={{ transform: "translateZ(40px)" }}
            title="Compare"
          >
            <Scale size={14} className={inCompare ? 'text-teal-600' : 'text-slate-400'} />
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center transform-gpu" style={{ transform: "translateZ(10px)" }}>
              <span className="bg-slate-800 text-white text-xs font-semibold px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col flex-1 transform-gpu" style={{ transform: "translateZ(20px)" }}>
          <p className="text-[0.625rem] text-slate-400 font-semibold uppercase tracking-wider">{product.brand}</p>
          <button onClick={() => navigate('product', { productId: product.id })} className="text-sm font-semibold text-slate-800 hover:text-teal-700 transition-colors line-clamp-2 text-left mt-0.5 flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {product.name}
          </button>
          <div className="flex items-center gap-1.5 mt-1.5">
            <StarRating rating={product.rating} />
            <span className="text-[0.625rem] text-slate-400">({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-base font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(product.price)}</span>
            {discount > 0 && <span className="text-xs text-slate-400 line-through">{formatPrice(product.mrp)}</span>}
          </div>
          {discount > 0 && (
            <p className="text-[0.6875rem] text-green-600 font-semibold mt-0.5">Save {formatPrice(product.mrp - product.price)} ({discount}% off)</p>
          )}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-4 w-full py-2.5 bg-slate-900 hover:bg-black disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold tracking-wide rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 transition-all duration-300 transform-gpu"
            style={{ transform: "translateZ(30px)" }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function BadgePill({ badge }: { badge: string }) {
  const map: Record<string, string> = {
    sale: 'bg-red-500 text-white',
    new: 'bg-blue-500 text-white',
    bestseller: 'bg-amber-400 text-amber-900',
    soldout: 'bg-slate-700 text-white',
  }
  const label: Record<string, string> = {
    sale: 'SALE',
    new: 'NEW',
    bestseller: 'BEST SELLER',
    soldout: 'SOLD OUT',
  }
  return (
    <span className={`text-[0.5625rem] font-bold px-2 py-0.5 rounded-full ${map[badge] ?? 'bg-slate-500 text-white'}`}>
      {label[badge] ?? badge.toUpperCase()}
    </span>
  )
}
