import { useState, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { categories, products, deals, formatPrice, getDiscount } from '@/data'
import ProductCard from '@/components/ProductCard'
import ShoppableFeed from '@/components/ShoppableFeed'
import ScratchCard from '@/components/ScratchCard'
import { motion } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: 'The Future of Mobility',
    subtitle: 'Discover the HEROINE-EV series. Premium electric scooters with uncompromising range and design.',
    cta: 'Explore EV Scooties',
    categoryId: 'ev-scooty',
    bg: 'from-black via-slate-900 to-slate-800',
    image: 'https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?w=1200&h=600&fit=crop&auto=format',
    badge: 'NEW ARRIVAL',
  },
  {
    id: 2,
    title: 'Flagship Electronics',
    subtitle: 'Experience next-gen smartphones and audio with up to 50% off premium brands.',
    cta: 'Shop Electronics',
    categoryId: 'electronics',
    bg: 'from-slate-900 to-blue-900',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop&auto=format',
    badge: 'LIMITED TIME OFFER',
  },
  {
    id: 3,
    title: 'Curated Fashion',
    subtitle: 'Elevate your wardrobe with top-tier brands and effortless style.',
    cta: 'Shop Fashion',
    categoryId: 'garments',
    bg: 'from-stone-900 to-stone-700',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=600&fit=crop&auto=format',
    badge: 'LUXURY COLLECTION',
  },
]

const testimonials = [
  { name: 'Priya Sharma', city: 'Delhi', rating: 5, text: "Been shopping from Kampa for 6 months. The prices are genuinely better than local stores and delivery is always on time. My go-to for everything from atta to earphones!" },
  { name: 'Rahul Verma', city: 'Mumbai', rating: 5, text: "Ordered Redmi Note 13 and boAt earbuds last week. Both arrived next day, genuine products, sealed packs. The 10% cashback on UPI payment was a sweet bonus." },
  { name: 'Anjali Mehta', city: 'Bangalore', rating: 4, text: "Great selection of Patanjali and Himalaya herbal products. Quality is consistent, packaging is intact, and the app makes repeat ordering very easy." },
  { name: 'Suresh Nair', city: 'Chennai', rating: 5, text: "I was skeptical at first but the return process was absolutely hassle-free. Exchanged a wrong-size shirt within 3 days, no questions asked. Impressed." },
]

export default function Home() {
  const { navigate } = useApp()
  const [slideIndex, setSlideIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('Bestseller')
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 13 })
  const [showScratchCard, setShowScratchCard] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 4500)
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)

    return () => {
      clearInterval(t)
      clearInterval(timer)
    }
  }, [])

  const slide = heroSlides[slideIndex]
  const bestSellers = products.filter(p => p.badge === 'bestseller' || p.reviews > 5000).slice(0, 8)

  return (
    <div>
      {showScratchCard && <ScratchCard onClose={() => setShowScratchCard(false)} />}
      
      {/* Hero Carousel */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="relative overflow-hidden">
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black">
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${i === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${s.bg} opacity-80`} />
              <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="max-w-xl">
                  <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
                    {s.badge}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {s.title}
                  </h1>
                  <p className="text-white/80 text-base md:text-lg mb-6 leading-relaxed">{s.subtitle}</p>
                  <button
                    onClick={() => navigate('category', { categoryId: s.categoryId })}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_40px_rgb(255,255,255,0.3)] hover:shadow-[0_0_60px_rgb(255,255,255,0.5)] tracking-wide"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {s.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === slideIndex ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setSlideIndex(i => (i - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setSlideIndex(i => (i + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.section>

      {/* Quick trust strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-6 md:gap-12 overflow-x-auto scrollbar-hide">
          {[
            { icon: '🏪', text: '10,000+ Products' },
            { icon: '🚀', text: 'Next-Day Delivery' },
            { icon: '✅', text: '100% Genuine' },
            { icon: '📞', text: 'Call us 24/7' },
            { icon: '🏬', text: 'Pickup At Any Store' },
            { icon: '💳', text: 'Secured Payment' },
            { icon: '🆓', text: '30-days Free Returns' },
          ].map(t => (
            <div key={t.text} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-base">{t.icon}</span>
              <span className="text-xs font-semibold text-slate-600">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Brands Marquee */}
      <div className="bg-slate-900 py-6 border-b border-slate-800 overflow-hidden">
        <div className="flex gap-12 items-center whitespace-nowrap animate-[marquee_25s_linear_infinite] px-4">
          {['APPLE', 'SAMSUNG', 'HEROINE-EV', 'SONY', 'NIKE', 'LEVIS', 'BOSE', 'APPLE', 'SAMSUNG', 'HEROINE-EV', 'SONY', 'NIKE', 'LEVIS', 'BOSE'].map((brand, i) => (
            <span key={i} className="text-xl md:text-2xl font-extrabold text-white/40 uppercase tracking-[0.3em] hover:text-white transition-colors cursor-default" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Category Grid */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-10">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Shop by Category</h2>
            <button className="text-teal-700 text-sm font-medium hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate('category', { categoryId: cat.id })}
                className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {cat.emoji}
                </div>
                <span className="text-[10px] md:text-xs font-semibold text-slate-700 text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Today's Deals */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Today's Deals</h2>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full border border-red-200">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse inline-block" />
                  LIVE
                </span>
                {/* Premium Countdown Timer */}
                <div className="flex items-center gap-1 bg-slate-900 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-md shadow-inner">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-slate-400">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-slate-400">:</span>
                  <span className="text-teal-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            <button onClick={() => navigate('category', { categoryId: 'all' })} className="text-teal-700 text-sm font-medium hover:underline">See all deals →</button>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
            {deals.map(product => {
              const disc = getDiscount(product.price, product.mrp)
              return (
                <button
                  key={product.id}
                  onClick={() => navigate('product', { productId: product.id })}
                  className="flex-shrink-0 w-40 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 overflow-hidden group"
                >
                  <div className="relative h-36 bg-slate-50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {disc}% OFF
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug text-left" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</p>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-sm font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(product.price)}</span>
                      <span className="text-[10px] text-slate-400 line-through">{formatPrice(product.mrp)}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.section>

        {/* Tabbed Products */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-8 mt-4 border-t border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="text-center md:text-left">
              <p className="text-teal-600 font-bold tracking-wider text-xs mb-1 uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>Shop by category</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Popular Collections</h2>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto scrollbar-hide">
              {['Bestseller', 'New Arrivals', 'Top Rated'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products
              .filter(p => {
                if (activeTab === 'Bestseller') return p.badge === 'bestseller' || p.reviews > 300
                if (activeTab === 'New Arrivals') return p.badge === 'new'
                if (activeTab === 'Top Rated') return p.rating >= 4.8
                return true
              })
              .slice(0, 8)
              .map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </motion.section>

        {/* Shoppable Feed */}
        <ShoppableFeed />

        {/* Category feature banners */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Health & Wellness', sub: 'Vitamins, supplements & monitors', emoji: '💊', color: 'from-emerald-600 to-teal-700', categoryId: 'health', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=200&fit=crop&auto=format' },
              { title: 'Herbal & Ayurvedic', sub: 'Natural remedies & traditional care', emoji: '🌿', color: 'from-lime-700 to-green-800', categoryId: 'herbal', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=200&fit=crop&auto=format' },
              { title: 'Style & Lifestyle', sub: 'Sunglasses, bags & accessories', emoji: '🌟', color: 'from-violet-700 to-purple-900', categoryId: 'lifestyle', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=200&fit=crop&auto=format' },
            ].map(b => (
              <button
                key={b.categoryId}
                onClick={() => navigate('category', { categoryId: b.categoryId })}
                className="relative overflow-hidden rounded-2xl h-36 group text-left"
              >
                <img src={b.image} alt={b.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`absolute inset-0 bg-gradient-to-r ${b.color} opacity-75`} />
                <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                  <span className="text-2xl mb-1">{b.emoji}</span>
                  <h3 className="text-white font-bold text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>{b.title}</h3>
                  <p className="text-white/75 text-xs">{b.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Best Sellers */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Best Sellers</h2>
            <button onClick={() => navigate('category', { categoryId: 'all' })} className="text-teal-700 text-sm font-medium hover:underline">View all →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </motion.section>

        {/* Exclusive EV Showcase */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-12 my-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-slate-900 to-slate-800 p-8 md:p-12 shadow-2xl border border-slate-700/50">
            <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/3">
                <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4">
                  PREMIUM COLLECTION
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  The Future of Commute
                </h2>
                <p className="text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
                  Discover the HEROINE-EV series. Zero emissions, uncompromising design, and up to 100km range. Join the electric revolution today.
                </p>
                <button
                  onClick={() => navigate('category', { categoryId: 'ev-scooty' })}
                  className="px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_30px_rgb(255,255,255,0.2)] tracking-wide"
                >
                  Explore EVs
                </button>
              </div>
              <div className="md:w-2/3 flex justify-center md:justify-end w-full">
                <div className="w-full max-w-md">
                  {products.filter(p => p.category === 'ev-scooty').map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* All Products Grid */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-8">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Trending Now</h2>
              <p className="text-slate-500 text-sm mt-1">Discover the latest arrivals and trending items across all categories.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.slice(0, 12).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </motion.section>

        {/* Large promo banner */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 to-teal-600 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1607082349250-f68e0beebf7b?w=1200&h=400&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-2">New User Offer</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Get 10% Off</h2>
              <p className="text-teal-100 text-base max-w-sm">On your first order. Use code <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">KAMMA10</span> at checkout. T&C apply.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>KAMMA10</div>
                <div className="text-teal-200 text-xs mt-1 uppercase tracking-widest">Use this coupon code</div>
              </div>
              <button
                onClick={() => navigate('category', { categoryId: 'all' })}
                className="px-8 py-3 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Shop Now
              </button>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.city}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-teal-600 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="py-8 mb-4">
          <div className="bg-slate-900 rounded-2xl px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Stay in the Loop</h3>
              <p className="text-slate-400 text-sm">Get exclusive deals, new arrivals & offers — straight to your inbox.</p>
            </div>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button type="submit" className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
