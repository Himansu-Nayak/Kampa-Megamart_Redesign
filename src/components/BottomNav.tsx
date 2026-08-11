import { useApp } from '@/context/AppContext'
import { Home, Search, ShoppingBag, User } from 'lucide-react'

export default function BottomNav() {
  const { page, navigate, cartCount } = useApp()

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'category', icon: Search, label: 'Explore', params: { categoryId: 'all' } },
    { id: 'cart', icon: ShoppingBag, label: 'Cart' },
    { id: 'account', icon: User, label: 'Account' },
  ]

  // Don't show bottom nav on checkout
  if (page === 'checkout') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 pb-safe shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = page === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id as any, item.params)}
              className={`relative flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                isActive ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'
              } ${item.id === 'cart' ? 'bottom-cart-icon' : ''}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'transform scale-110 transition-transform' : ''} />
              <span className={`text-[0.625rem] font-medium mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              
              {item.id === 'cart' && cartCount > 0 && (
                <span className="absolute top-0 right-3 bg-red-500 text-white text-[0.625rem] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border border-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
