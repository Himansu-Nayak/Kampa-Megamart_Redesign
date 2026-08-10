import { motion, AnimatePresence } from 'framer-motion'
import { X, Scale, Trash2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { products, formatPrice } from '@/data'

export default function CompareDrawer() {
  const { compareList, toggleCompare, addToCart } = useApp()
  const compareProducts = products.filter(p => compareList.includes(p.id))

  if (compareList.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6 flex justify-center">
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900 text-white rounded-2xl shadow-2xl p-4 w-full max-w-4xl flex items-center gap-6 pointer-events-auto border border-slate-700/50 backdrop-blur-xl bg-slate-900/95"
      >
        <div className="flex flex-col items-center justify-center px-4 border-r border-slate-700">
          <Scale size={32} className="text-teal-400 mb-2" />
          <span className="font-bold text-sm tracking-wide">COMPARE</span>
          <span className="text-xs text-slate-400">{compareList.length}/3 Added</span>
        </div>

        <div className="flex-1 flex items-center gap-4">
          {compareProducts.map(p => (
            <div key={p.id} className="relative flex items-center gap-3 bg-slate-800/50 p-2 pr-4 rounded-xl border border-slate-700 w-1/3">
              <button
                onClick={() => toggleCompare(p.id)}
                className="absolute -top-2 -right-2 bg-slate-700 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
              >
                <X size={12} />
              </button>
              <img src={p.image} className="w-12 h-12 rounded-lg object-cover bg-white" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{p.name}</p>
                <p className="text-[10px] text-teal-400 font-bold">{formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
          {/* Empty Slots */}
          {Array.from({ length: 3 - compareList.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex items-center justify-center gap-3 bg-slate-800/30 p-2 rounded-xl border border-dashed border-slate-700 w-1/3 h-[66px]">
              <span className="text-xs text-slate-500 font-medium">Add Product</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 pl-4 border-l border-slate-700">
          <button
            disabled={compareList.length < 2}
            onClick={() => alert('Comparison table coming soon!')}
            className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:bg-slate-700 disabled:text-slate-500 whitespace-nowrap shadow-[0_0_15px_rgba(20,184,166,0.3)]"
          >
            Compare Now
          </button>
          <button
            onClick={() => compareList.forEach(id => toggleCompare(id))}
            className="text-[10px] text-slate-400 hover:text-white uppercase font-bold tracking-wider"
          >
            Clear All
          </button>
        </div>
      </motion.div>
    </div>
  )
}
