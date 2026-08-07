import { useApp } from '@/context/AppContext'

export default function Footer() {
  const { navigate } = useApp()

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      {/* Trust strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹499' },
            { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Cards, Net Banking' },
            { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free returns' },
            { icon: '🎧', title: '24/7 Support', desc: 'Dedicated customer care' },
          ].map(t => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.title}</p>
                <p className="text-slate-400 text-xs">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand col */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>K</div>
            <div>
              <div className="text-white font-bold text-base leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>Kampa</div>
              <div className="text-slate-500 text-[9px] font-semibold uppercase tracking-widest">Megamart</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">India's trusted hypermarket for home care, electronics, health, fashion, and more. Delivered to your doorstep.</p>
          <div className="flex gap-3">
            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
              <button key={i} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-sm transition-colors">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Company</h4>
          <ul className="space-y-2">
            {['About Us', 'Careers', 'Press & Media', 'Investor Relations', 'Sustainability'].map(l => (
              <li key={l}><button className="text-slate-400 hover:text-white text-xs transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Customer Service</h4>
          <ul className="space-y-2">
            {['Track My Order', 'Return & Refund', 'Cancel an Order', 'FAQs', 'Report a Problem'].map(l => (
              <li key={l}><button className="text-slate-400 hover:text-white text-xs transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Policies</h4>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Return Policy', 'Cookie Policy'].map(l => (
              <li key={l}><button className="text-slate-400 hover:text-white text-xs transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Us</h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">📍</span>
              <span className="text-slate-400 text-xs">Kampa Megamart Pvt. Ltd., New Delhi — 110001</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-500">📞</span>
              <a href="tel:+9108860410086" className="text-slate-400 hover:text-white text-xs transition-colors">+91-08860410086</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-500">✉️</span>
              <a href="mailto:kampamegamart@gmail.com" className="text-slate-400 hover:text-white text-xs transition-colors">kampamegamart@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-teal-500">💬</span>
              <button className="text-slate-400 hover:text-white text-xs transition-colors">WhatsApp Support</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment methods + bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">© 2025 Kampa Megamart Pvt. Ltd. All rights reserved. CIN: U52200DL2025PTC000000</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-500 text-xs mr-1">We accept:</span>
            {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking', 'EMI'].map(p => (
              <span key={p} className="bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
