import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Mic, TrendingUp, Clock } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { products, formatPrice } from '@/data'

export default function SearchPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const { navigate } = useApp()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // Header handles opening, but just in case
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const results = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())).slice(0, 5)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-12 md:top-24 left-1/2 -translate-x-1/2 w-[95%] md:w-[600px] bg-white rounded-2xl shadow-[0_20px_60px_rgb(0,0,0,0.2)] overflow-hidden z-[101] border border-white/50"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-4 py-4 border-b border-slate-100 bg-slate-50/50">
              <Search className="w-6 h-6 text-slate-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="flex-1 bg-transparent border-none text-lg px-4 focus:outline-none text-slate-800 placeholder-slate-400 font-medium"
              />
              <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors bg-white rounded-full shadow-sm mr-2">
                <Mic className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-200/50 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim().length === 0 ? (
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> Trending Now
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['iPhone 15', 'Sony Headphones', 'Nike Air Max', 'Gaming Laptop', 'Levis Jeans'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-6 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Recent Searches
                  </h3>
                  <div className="space-y-1">
                    {['samsung galaxy s24', 'macbook pro m3', 'protein powder'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-600 text-sm rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Products</h3>
                  {results.length > 0 ? (
                    results.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { navigate('product', { productId: p.id }); onClose() }}
                        className="w-full flex items-center gap-4 p-3 hover:bg-teal-50/50 transition-colors text-left rounded-xl group"
                      >
                        <div className="w-14 h-14 bg-white rounded-lg border border-slate-100 overflow-hidden flex-shrink-0 shadow-sm group-hover:border-teal-200 transition-colors">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{p.name}</p>
                          <p className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">{p.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-extrabold text-slate-900">{formatPrice(p.price)}</p>
                          {p.price < p.mrp && <p className="text-[10px] text-slate-400 line-through">{formatPrice(p.mrp)}</p>}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-slate-600 font-medium">No results found for "{query}"</p>
                      <p className="text-sm text-slate-400 mt-1">Check spelling or try a broader search</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">Press <kbd className="bg-white border border-slate-200 px-1.5 rounded shadow-sm">Esc</kbd> to close</span>
              <span className="flex items-center gap-1">Navigate with <kbd className="bg-white border border-slate-200 px-1.5 rounded shadow-sm">↑</kbd> <kbd className="bg-white border border-slate-200 px-1.5 rounded shadow-sm">↓</kbd></span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
