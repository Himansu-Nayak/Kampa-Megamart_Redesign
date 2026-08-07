import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '@/data'

export interface CartItem {
  product: Product
  quantity: number
}

export type PageName = 'home' | 'category' | 'product' | 'cart' | 'checkout' | 'login' | 'account'

interface AppState {
  page: PageName
  categoryId: string | null
  productId: string | null
  cart: CartItem[]
  isLoggedIn: boolean
  navigate: (page: PageName, params?: { categoryId?: string; productId?: string }) => void
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  cartCount: number
  cartTotal: number
  setLoggedIn: (v: boolean) => void
  wishlist: string[]
  toggleWishlist: (productId: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageName>('home')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [productId, setProductId] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  function navigate(p: PageName, params?: { categoryId?: string; productId?: string }) {
    setPage(p)
    if (params?.categoryId !== undefined) setCategoryId(params.categoryId)
    if (params?.productId !== undefined) setProductId(params.productId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addToCart(product: Product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
      return [...prev, { product, quantity: qty }]
    })
  }

  function removeFromCart(pid: string) {
    setCart(prev => prev.filter(i => i.product.id !== pid))
  }

  function updateQty(pid: string, qty: number) {
    if (qty <= 0) { removeFromCart(pid); return }
    setCart(prev => prev.map(i => i.product.id === pid ? { ...i, quantity: qty } : i))
  }

  function toggleWishlist(pid: string) {
    setWishlist(prev => prev.includes(pid) ? prev.filter(id => id !== pid) : [...prev, pid])
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <AppContext.Provider value={{ page, categoryId, productId, cart, isLoggedIn, navigate, addToCart, removeFromCart, updateQty, cartCount, cartTotal, setLoggedIn, wishlist, toggleWishlist }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside AppProvider')
  return ctx
}
