import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useApp } from '@/context/AppContext'
import { formatPrice } from '@/data'

type Tab = 'orders' | 'addresses' | 'profile' | 'wishlist'

const mockOrders = [
  { id: 'KMM20250712001', date: '12 Jul 2025', items: 3, total: 3847, status: 'Delivered', statusColor: 'text-green-600 bg-green-50' },
  { id: 'KMM20250628002', date: '28 Jun 2025', items: 1, total: 899, status: 'Delivered', statusColor: 'text-green-600 bg-green-50' },
  { id: 'KMM20250710003', date: '10 Jul 2025', items: 2, total: 12499, status: 'In Transit', statusColor: 'text-blue-600 bg-blue-50' },
  { id: 'KMM20250714004', date: '14 Jul 2025', items: 4, total: 2134, status: 'Processing', statusColor: 'text-amber-600 bg-amber-50' },
]

const mockAddresses = [
  { id: 'a1', label: 'Home', name: 'Rahul Verma', line: '42, Sector 18, Noida', city: 'Noida', state: 'Uttar Pradesh', pin: '201301', phone: '+91 98765 43210', default: true },
  { id: 'a2', label: 'Office', name: 'Rahul Verma', line: 'A-11, Connaught Place', city: 'New Delhi', state: 'Delhi', pin: '110001', phone: '+91 98765 43210', default: false },
]

export default function Account() {
  const { navigate, isLoggedIn, setLoggedIn } = useApp()
  const [tab, setTab] = useState<Tab>('orders')
  const [profileForm, setProfileForm] = useState({ name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 98765 43210' })
  const [profileSaved, setProfileSaved] = useState(false)
  const [activeModal, setActiveModal] = useState<{ type: string; orderId: string } | null>(null)

  if (!isLoggedIn) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Please sign in</h2>
        <p className="text-slate-500 text-sm mb-6">Sign in to view your orders, addresses, and account settings.</p>
        <div className="flex gap-3">
          <button onClick={() => navigate('login')} className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors text-sm">
            Sign In
          </button>
          <button onClick={() => { setLoggedIn(true) }} className="px-6 py-2.5 border-2 border-teal-700 text-teal-700 font-semibold rounded-xl hover:bg-teal-700 hover:text-white transition-all text-sm">
            Demo Login
          </button>
        </div>
      </div>
    )
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'orders', label: 'My Orders', icon: '📦' },
    { key: 'addresses', label: 'Addresses', icon: '📍' },
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'wishlist', label: 'Wishlist', icon: '❤️' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header card */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-600 rounded-2xl p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {profileForm.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{profileForm.name}</h1>
            <p className="text-teal-200 text-sm">{profileForm.email}</p>
          </div>
        </div>
        <button
          onClick={() => { setLoggedIn(false); navigate('home') }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar nav */}
        <nav className="md:w-48 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors border-b border-slate-100 last:border-0 ${
                  tab === t.key ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          {/* Orders */}
          {tab === 'orders' && (
            <div className="space-y-3">
              {mockOrders.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <div className="text-5xl mb-3">📭</div>
                  <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>No orders yet</h3>
                  <p className="text-slate-500 text-sm mb-4">Start shopping and your orders will appear here.</p>
                  <button onClick={() => navigate('home')} className="px-5 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors">
                    Shop Now
                  </button>
                </div>
              )}
              {mockOrders.map(order => (
                <div key={order.id} className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Order #{order.id}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Placed on {order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                      <span className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    {order.status === 'Delivered' ? (
                      <>
                        <button onClick={() => setActiveModal({ type: 'review', orderId: order.id })} className="text-xs text-teal-700 border border-teal-700 hover:bg-teal-700 hover:text-white rounded-lg px-3 py-1.5 transition-all font-medium">Write a Review</button>
                        <button onClick={() => navigate('category', { categoryId: 'all' })} className="text-xs text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg px-3 py-1.5 transition-colors font-medium">Reorder</button>
                        <button onClick={() => setActiveModal({ type: 'return', orderId: order.id })} className="text-xs text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg px-3 py-1.5 transition-colors font-medium">Return / Exchange</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setActiveModal({ type: 'track', orderId: order.id })} className="text-xs text-teal-700 border border-teal-700 hover:bg-teal-700 hover:text-white rounded-lg px-3 py-1.5 transition-all font-medium">Track Order</button>
                        <button onClick={() => setActiveModal({ type: 'details', orderId: order.id })} className="text-xs text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg px-3 py-1.5 transition-colors font-medium">View Details</button>
                        {order.status === 'Processing' && (
                          <button onClick={() => setActiveModal({ type: 'cancel', orderId: order.id })} className="text-xs text-red-600 border border-red-200 hover:bg-red-50 rounded-lg px-3 py-1.5 transition-colors font-medium">Cancel</button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Addresses */}
          {tab === 'addresses' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {mockAddresses.map(addr => (
                  <div key={addr.id} className={`bg-white rounded-xl border-2 p-4 relative ${addr.default ? 'border-teal-700' : 'border-slate-100'}`}>
                    {addr.default && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">DEFAULT</span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-slate-800">{addr.label}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800">{addr.name}</p>
                    <p className="text-sm text-slate-600">{addr.line}</p>
                    <p className="text-sm text-slate-600">{addr.city}, {addr.state} — {addr.pin}</p>
                    <p className="text-sm text-slate-500 mt-1">{addr.phone}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs text-teal-700 hover:underline font-medium">Edit</button>
                      <button className="text-xs text-red-500 hover:underline font-medium">Remove</button>
                      {!addr.default && <button className="text-xs text-slate-600 hover:underline font-medium">Set as Default</button>}
                    </div>
                  </div>
                ))}
                <button className="bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-500 hover:bg-teal-50 p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-teal-600 transition-all h-full min-h-[160px]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium">Add New Address</span>
                </button>
              </div>
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Personal Information</h3>
              <div className="space-y-4">
                {[
                  { key: 'name', label: 'Full Name', type: 'text' },
                  { key: 'email', label: 'Email Address', type: 'email' },
                  { key: 'phone', label: 'Mobile Number', type: 'tel' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      value={profileForm[f.key as keyof typeof profileForm]}
                      onChange={e => setProfileForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-100"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2500) }}
                className={`mt-6 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  profileSaved ? 'bg-green-600 text-white' : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {profileSaved ? '✓ Saved!' : 'Save Changes'}
              </button>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-slate-800 text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Change Password</h4>
                <div className="space-y-3">
                  {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                    <div key={label}>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500" />
                    </div>
                  ))}
                  <button className="px-6 py-2.5 border-2 border-teal-700 text-teal-700 font-semibold rounded-xl hover:bg-teal-700 hover:text-white transition-all text-sm">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist */}
          {tab === 'wishlist' && (
            <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Your wishlist</h3>
              <p className="text-slate-500 text-sm mb-4">Products you've wishlisted will appear here. Browse and heart items to save them!</p>
              <button onClick={() => navigate('home')} className="px-6 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors">
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Modals via Portal */}
      {createPortal(
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {activeModal.type === 'review' && 'Write a Review'}
                    {activeModal.type === 'track' && 'Track Order'}
                    {activeModal.type === 'return' && 'Return / Exchange'}
                    {activeModal.type === 'details' && 'Order Details'}
                    {activeModal.type === 'cancel' && 'Cancel Order'}
                  </h3>
                  <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Review UI */}
                  {activeModal.type === 'review' && (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-500">Rate your experience with order #{activeModal.orderId}</p>
                      <div className="flex gap-2 text-2xl text-slate-200">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} className="hover:text-amber-400 transition-colors">★</button>
                        ))}
                      </div>
                      <textarea placeholder="Tell us what you loved..." className="w-full h-24 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-100 resize-none"></textarea>
                      <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors">Submit Review</button>
                    </div>
                  )}

                  {/* Track Order UI */}
                  {activeModal.type === 'track' && (
                    <div className="space-y-6 relative">
                      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                      {[
                        { label: 'Order Confirmed', time: '10:00 AM', done: true },
                        { label: 'Processing', time: '12:30 PM', done: true },
                        { label: 'Out for Delivery', time: 'Pending', done: false },
                        { label: 'Delivered', time: 'Pending', done: false }
                      ].map((step, idx) => (
                        <div key={idx} className="relative flex gap-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${step.done ? 'bg-teal-500 text-white shadow-md' : 'bg-white border-2 border-slate-200'}`}>
                            {step.done && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</p>
                            <p className="text-xs text-slate-400">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Generic Feedback for others */}
                  {['return', 'details', 'cancel'].includes(activeModal.type) && (
                    <div className="text-center space-y-4 py-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-2xl">
                        {activeModal.type === 'return' ? '📦' : activeModal.type === 'details' ? '📄' : '⚠️'}
                      </div>
                      <p className="text-slate-600 text-sm">
                        Request for order #{activeModal.orderId} is being processed securely.
                      </p>
                      <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl transition-colors">Close</button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  )
}
