import { AppProvider, useApp } from '@/context/AppContext'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import CategoryListing from '@/pages/CategoryListing'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Login from '@/pages/Login'
import Account from '@/pages/Account'
import StaticPage from '@/pages/StaticPage'
import LivePurchaseToast from '@/components/LivePurchaseToast'
import AIAssistant from '@/components/AIAssistant'
import CompareDrawer from '@/components/CompareDrawer'
import RecentlyViewed from '@/components/RecentlyViewed'
import DiscoverWidget from '@/components/DiscoverWidget'
import BottomNav from '@/components/BottomNav'

function AppShell() {
  const { page } = useApp()

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main className="flex-1 bg-slate-50 pb-16 md:pb-0 overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="h-full"
          >
            {page === 'home' && <Home />}
            {page === 'category' && <CategoryListing />}
            {page === 'product' && <ProductDetail />}
            {page === 'cart' && <Cart />}
            {page === 'checkout' && <Checkout />}
            {page === 'login' && <Login />}
            {page === 'account' && <Account />}
            {page === 'static' && <StaticPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <DiscoverWidget />
      <RecentlyViewed />
      {page !== 'checkout' && <Footer />}
      <LivePurchaseToast />
      <AIAssistant />
      <CompareDrawer />
      <BottomNav />
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
