import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { formatPrice } from '@/data'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MiniCart({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, navigate } = useApp()

  const handleCheckout = () => {
    onClose()
    navigate('checkout')
  }

  const handleViewCart = () => {
    onClose()
    navigate('cart')
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-teal-700" />
                <h2 className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Your Cart</h2>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={onClose} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative group">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg bg-slate-50" />
                    <div className="flex-1 min-w-0 flex flex-col">
                      <p className="text-xs text-slate-400 font-semibold uppercase">{item.product.brand}</p>
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.product.name}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-bold text-teal-700">{formatPrice(item.product.price)}</span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-slate-900"
                          >-</button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-slate-900"
                          >+</button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute -top-2 -right-2 bg-white border border-slate-200 text-red-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 font-medium text-sm">Subtotal</span>
                  <span className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(cartTotal)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleViewCart} className="w-full py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                    View Cart
                  </button>
                  <button onClick={handleCheckout} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:bg-black transition-all">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
