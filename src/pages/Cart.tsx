import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { formatPrice, getDiscount } from '@/data'

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, navigate } = useApp()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0
  const shipping = cartTotal > 499 ? 0 : 49
  const tax = Math.round((cartTotal - discount) * 0.05)
  const total = cartTotal - discount + shipping + tax

  function applyPromo() {
    if (promo.toUpperCase() === 'KAMMA10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid coupon code. Try KAMMA10')
      setPromoApplied(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Looks like you haven't added anything yet. Start shopping and fill it up!</p>
        <button
          onClick={() => navigate('home')}
          className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Shopping Cart
        <span className="ml-2 text-base font-normal text-slate-500">({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart items */}
        <div className="flex-1 space-y-3">
          {cart.map(({ product, quantity }) => {
            const disc = getDiscount(product.price, product.mrp)
            return (
              <div key={product.id} className="bg-white rounded-xl border border-slate-100 p-4 flex gap-4">
                <button onClick={() => navigate('product', { productId: product.id })} className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{product.brand}</p>
                  <button
                    onClick={() => navigate('product', { productId: product.id })}
                    className="text-sm font-semibold text-slate-800 hover:text-teal-700 line-clamp-2 text-left mt-0.5"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {product.name}
                  </button>
                  {product.inStock ? (
                    <p className="text-xs text-green-600 font-medium mt-1">✓ In Stock · Ships in 1–2 days</p>
                  ) : (
                    <p className="text-xs text-red-500 font-medium mt-1">⚠ Out of Stock</p>
                  )}
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(product.id, quantity - 1)} className="px-2.5 py-1.5 hover:bg-slate-100 transition-colors text-slate-700 text-sm">−</button>
                      <span className="px-3 py-1.5 text-sm font-semibold text-slate-900 border-x border-slate-200">{quantity}</span>
                      <button onClick={() => updateQty(product.id, quantity + 1)} className="px-2.5 py-1.5 hover:bg-slate-100 transition-colors text-slate-700 text-sm">+</button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(product.price * quantity)}</div>
                  {disc > 0 && <div className="text-xs text-green-600 font-semibold mt-0.5">{disc}% off</div>}
                  <div className="text-xs text-slate-400 line-through mt-0.5">{formatPrice(product.mrp * quantity)}</div>
                </div>
              </div>
            )
          })}

          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-teal-700 text-sm font-medium hover:underline mt-2"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
          {/* Promo code */}
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Promo / Coupon Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promo}
                onChange={e => { setPromo(e.target.value); setPromoError('') }}
                placeholder="Enter code (e.g. KAMMA10)"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 uppercase"
              />
              <button
                onClick={applyPromo}
                className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
            {promoApplied && <p className="text-xs text-green-600 font-semibold mt-2">✓ Coupon applied! You save 10%</p>}
            {promoError && <p className="text-xs text-red-500 mt-2">{promoError}</p>}
          </div>

          {/* Price breakdown */}
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Price Details</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount (KAMMA10)</span>
                  <span>− {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-3 border-t border-slate-100">
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Total Amount</span>
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(total)}</span>
              </div>
              {cartTotal > 499 && <p className="text-xs text-green-600 font-medium">🎉 You're saving {formatPrice(49)} on delivery!</p>}
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-md w-full justify-center border border-green-100">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                256-Bit Encrypted Secure Checkout
              </div>
              <button
                onClick={() => navigate('checkout')}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold rounded-xl transition-colors text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Proceed to Checkout →
              </button>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Secured by</span>
                {['UPI', 'Visa', 'MasterCard', 'RuPay', 'Norton'].map(p => (
                  <span key={p} className="text-[9px] font-bold border border-slate-200 bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 shadow-sm">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
