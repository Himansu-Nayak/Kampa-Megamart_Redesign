import { AppProvider, useApp } from '@/context/AppContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import CategoryListing from '@/pages/CategoryListing'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Login from '@/pages/Login'
import Account from '@/pages/Account'
import LivePurchaseToast from '@/components/LivePurchaseToast'
import AIAssistant from '@/components/AIAssistant'
import CompareDrawer from '@/components/CompareDrawer'
import RecentlyViewed from '@/components/RecentlyViewed'

function AppShell() {
  const { page } = useApp()

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main className="flex-1 bg-slate-50">
        {page === 'home' && <Home />}
        {page === 'category' && <CategoryListing />}
        {page === 'product' && <ProductDetail />}
        {page === 'cart' && <Cart />}
        {page === 'checkout' && <Checkout />}
        {page === 'login' && <Login />}
        {page === 'account' && <Account />}
      </main>
      
      <RecentlyViewed />
      {page !== 'checkout' && <Footer />}
      <LivePurchaseToast />
      <AIAssistant />
      <CompareDrawer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
