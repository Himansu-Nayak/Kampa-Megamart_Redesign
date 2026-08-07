import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { formatPrice } from '@/data'

const steps = ['Cart', 'Address', 'Payment', 'Confirmation']

export default function Checkout() {
  const { cart, cartTotal, navigate } = useApp()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi')
  const [upiId, setUpiId] = useState('')
  const [processing, setProcessing] = useState(false)

  const shipping = cartTotal > 499 ? 0 : 49
  const tax = Math.round(cartTotal * 0.05)
  const total = cartTotal + shipping + tax

  function handlePlaceOrder() {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setStep(3)
    }, 2000)
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Confirmed! 🎉</h1>
        <p className="text-slate-600 mb-2">Thank you, <strong>{form.name || 'Customer'}</strong>. Your order has been placed successfully.</p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Order ID</span>
            <span className="font-semibold text-slate-900">#KMM{Date.now().toString().slice(-8)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Order Total</span>
            <span className="font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Estimated Delivery</span>
            <span className="font-semibold text-teal-700">2–3 Business Days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Payment</span>
            <span className="font-semibold text-slate-900 capitalize">{paymentMethod.toUpperCase()}</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-6">A confirmation SMS & email will be sent to your registered mobile and email ID.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('account')} className="px-6 py-2.5 border-2 border-teal-700 text-teal-700 font-semibold rounded-xl hover:bg-teal-700 hover:text-white transition-all text-sm">
            Track Order
          </button>
          <button onClick={() => navigate('home')} className="px-6 py-2.5 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-colors text-sm">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 ${i <= step ? 'text-teal-700' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < step ? 'bg-teal-700 text-white' :
                i === step ? 'bg-teal-700 text-white ring-4 ring-teal-100' :
                'bg-slate-200 text-slate-500'
              }`}>
                {i < step ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className="hidden sm:block text-sm font-medium">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 md:w-20 h-0.5 mx-2 transition-colors ${i < step ? 'bg-teal-700' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form area */}
        <div className="flex-1">
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', type: 'text', full: false, placeholder: 'Rahul Kumar' },
                  { key: 'phone', label: 'Mobile Number', type: 'tel', full: false, placeholder: '+91 98765 43210' },
                  { key: 'email', label: 'Email Address', type: 'email', full: true, placeholder: 'rahul@example.com' },
                  { key: 'address', label: 'Address (House / Flat / Street)', type: 'text', full: true, placeholder: '42, Connaught Place' },
                  { key: 'city', label: 'City', type: 'text', full: false, placeholder: 'New Delhi' },
                  { key: 'pincode', label: 'PIN Code', type: 'text', full: false, placeholder: '110001' },
                ].map(f => (
                  <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-100 transition-colors"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">State</label>
                  <select
                    value={form.state}
                    onChange={e => setForm(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="">Select State</option>
                    {['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'West Bengal', 'Telangana', 'Kerala'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Payment Method</h2>

              <div className="space-y-3">
                {[
                  { value: 'upi', label: 'UPI (Google Pay, PhonePe, Paytm, BHIM)', icon: '📲', desc: 'Instant • 5% cashback available' },
                  { value: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                  { value: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                  { value: 'cod', label: 'Cash on Delivery', icon: '💵', desc: '₹29 COD fee applicable' },
                ].map(m => (
                  <label key={m.value} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === m.value ? 'border-teal-700 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={m.value}
                      checked={paymentMethod === m.value}
                      onChange={() => setPaymentMethod(m.value as typeof paymentMethod)}
                      className="accent-teal-700"
                    />
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{m.label}</p>
                      <p className="text-xs text-slate-500">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === 'upi' && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Expiry</label>
                      <input type="text" placeholder="MM / YY" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="px-5 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-amber-900 font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {processing ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : `Place Order · ${formatPrice(total)}`}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs text-slate-400">256-bit SSL secure checkout — your data is fully encrypted</span>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-32">
            <h3 className="font-bold text-slate-900 text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Summary</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-2.5">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 line-clamp-2">{product.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Qty: {quantity}</p>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 flex-shrink-0">{formatPrice(product.price * quantity)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-100">
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Total</span>
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
