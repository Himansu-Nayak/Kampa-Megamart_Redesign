import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/data'

const firstNames = ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram', 'Anjali', 'Suresh', 'Kavita', 'Ravi', 'Pooja', 'Arjun', 'Meera']
const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur']

interface ToastData {
  id: string
  name: string
  city: string
  productName: string
  productImage: string
  timeStr: string
}

export default function LivePurchaseToast() {
  const [toast, setToast] = useState<ToastData | null>(null)

  useEffect(() => {
    // Show a new toast every 10 to 20 seconds
    const scheduleNextToast = () => {
      const delay = Math.random() * 10000 + 10000 // 10s to 20s
      return setTimeout(() => {
        const randomName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const randomCity = cities[Math.floor(Math.random() * cities.length)]
        const randomProduct = products[Math.floor(Math.random() * products.length)]
        const timeAgo = Math.floor(Math.random() * 15) + 1
        
        setToast({
          id: Date.now().toString(),
          name: randomName,
          city: randomCity,
          productName: randomProduct.name,
          productImage: randomProduct.image,
          timeStr: `${timeAgo} min ago`
        })

        // Hide toast after 5 seconds
        setTimeout(() => setToast(null), 5000)

        // Schedule next
        timerId = scheduleNextToast()
      }, delay)
    }

    let timerId = scheduleNextToast()
    
    // Quick initial toast after 3 seconds for demo purposes
    const initialTimer = setTimeout(() => {
      const p = products[Math.floor(Math.random() * products.length)]
      setToast({
        id: 'initial', name: 'Sneha', city: 'Delhi',
        productName: p.name, productImage: p.image, timeStr: '1 min ago'
      })
      setTimeout(() => setToast(null), 5000)
    }, 3000)

    return () => {
      clearTimeout(timerId)
      clearTimeout(initialTimer)
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-[60] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-3 flex items-center gap-4 max-w-sm pointer-events-auto"
          >
            <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <img src={toast.productImage} alt={toast.productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.6875rem] text-teal-600 font-bold mb-0.5 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="w-1.5 h-1.5 inline-block bg-teal-500 rounded-full mr-1.5 animate-pulse" />
                Someone recently bought
              </p>
              <p className="text-xs font-semibold text-slate-800 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {toast.productName}
              </p>
              <p className="text-[0.625rem] text-slate-500 mt-0.5">
                {toast.name} from {toast.city} • {toast.timeStr}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
