import { useState, useRef, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { categories, products, formatPrice } from '@/data'
import { Mic, Search } from 'lucide-react'
import MiniCart from './MiniCart'
import SearchPalette from './SearchPalette'

export default function Header() {
  const { cartCount, navigate, isLoggedIn, setLoggedIn, toggleDiscover, kampaCoins } = useApp()
  const [search, setSearch] = useState('')
  const [megaOpen, setMegaOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate('category', { categoryId: 'all' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgb(0,0,0,0.03)] transition-all duration-300">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white text-xs text-center py-2 px-4 font-medium tracking-wide">
        🚚 Free premium delivery on orders ₹499+ &nbsp;·&nbsp; 🎉 Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-amber-300 shadow-inner">KAMMA10</span> for 10% off your first order
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">

        {/* Logo */}
        <button onClick={() => navigate('home')} className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-10 h-10 bg-slate-900 group-hover:bg-black rounded-xl flex items-center justify-center text-white font-extrabold text-xl leading-none shadow-md group-hover:shadow-lg transition-all duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>K</div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-slate-900 font-extrabold text-base tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>Kampa</span>
            <span className="text-amber-600 text-[0.5625rem] font-bold uppercase tracking-[0.2em]">Megamart</span>
          </div>
        </button>

        {/* Search bar */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {/* Categories dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              onBlur={() => setTimeout(() => setMegaOpen(false), 150)}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-l-lg text-teal-800 text-sm font-medium transition-colors whitespace-nowrap"
            >
              All Categories
              <svg className={`w-3.5 h-3.5 transition-transform duration-150 ${megaOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {megaOpen && (
              <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-b-xl rounded-tr-xl shadow-2xl border border-slate-100 py-1.5 z-50">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { navigate('category', { categoryId: cat.id }); setMegaOpen(false) }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-teal-50 text-left transition-colors group"
                  >
                    <span className="text-lg w-6 text-center">{cat.emoji}</span>
                    <span className="text-sm text-slate-700 font-medium group-hover:text-teal-700">{cat.name}</span>
                    <span className="ml-auto text-xs text-slate-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative flex min-w-0 h-11 lg:h-12">
            <button
              onClick={() => setShowResults(true)}
              className="w-full h-full flex items-center justify-between border border-slate-200/80 lg:border-l-0 lg:rounded-none rounded-l-lg px-4 text-sm bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all text-slate-500 shadow-inner group"
            >
              <span className="truncate">Search premium products...</span>
              <div className="flex items-center gap-2">
                <kbd className="hidden lg:inline-flex items-center gap-1 font-sans text-[0.625rem] font-bold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-sm group-hover:border-slate-300">
                  <span className="text-xs">⌘</span>K
                </kbd>
                <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
            </button>
            <button onClick={() => setShowResults(true)} className="px-5 h-full bg-slate-900 hover:bg-black active:bg-slate-800 text-white rounded-r-lg transition-colors flex-shrink-0 shadow-[0_2px_10px_rgb(0,0,0,0.1)]">
              <span className="font-semibold text-sm hidden sm:block">Search</span>
              <Search className="w-4 h-4 sm:hidden" />
            </button>

            <SearchPalette isOpen={showResults} onClose={() => setShowResults(false)} />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1 lg:py-1.5 mr-1 lg:mr-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full border border-amber-200">
            <span className="text-sm lg:text-lg">🪙</span>
            <div className="flex flex-col">
              <span className="hidden lg:block text-[0.625rem] font-bold text-amber-600 uppercase leading-none">Kampa Coins</span>
              <span className="text-[0.625rem] lg:text-xs font-extrabold text-amber-900 leading-none">{kampaCoins.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={() => navigate('login')} className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Account</span>
          </button>

          <button onClick={() => setIsCartOpen(true)} className="header-cart-icon relative hidden md:flex items-center gap-1.5 px-2.5 py-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[0.625rem] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
            <span className="text-xs font-medium hidden sm:block">Cart</span>
          </button>
        </div>
      </div>

      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Category nav strip */}
      <div className="border-t border-slate-200/50 overflow-x-auto scrollbar-hide block bg-white/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0.5 py-1">
            <button
              onClick={toggleDiscover}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-md whitespace-nowrap shadow-sm hover:shadow-md transition-all mr-2"
            >
              <span>📺</span>
              Discover Reels
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate('category', { categoryId: cat.id })}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-md whitespace-nowrap transition-colors"
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>


    </header>
  )
}
