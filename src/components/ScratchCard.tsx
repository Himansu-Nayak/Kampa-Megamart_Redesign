import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import confetti from 'canvas-confetti'

interface Props {
  onClose: () => void
}

export default function ScratchCard({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scratchedArea, setScratchedArea] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const { addKampaCoins } = useApp()
  const isDrawing = useRef(false)

  // Initialize canvas with silver foil
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fill with foil gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#cbd5e1') // slate-300
    gradient.addColorStop(0.5, '#e2e8f0') // slate-200
    gradient.addColorStop(1, '#94a3b8') // slate-400
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add text on top of foil
    ctx.fillStyle = '#64748b' // slate-500
    ctx.font = 'bold 24px Poppins, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2)
  }, [])

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2 * Math.PI)
    ctx.fill()

    // Calculate scratched percentage roughly
    setScratchedArea(prev => {
      const newArea = prev + 1
      if (newArea > 60 && !isRevealed) {
        setIsRevealed(true)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#14b8a6']
        })
        addKampaCoins(500)
      }
      return newArea
    })
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawing.current = true
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    scratch(e.clientX - rect.left, e.clientY - rect.top)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    scratch(e.clientX - rect.left, e.clientY - rect.top)
  }

  const handlePointerUp = () => {
    isDrawing.current = false
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-400 to-amber-600 opacity-10" />
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Daily Surprise! 🎁
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Scratch the card below to reveal your exclusive reward.
          </p>

          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-inner border-2 border-slate-100 flex items-center justify-center bg-amber-50">
            {/* The Prize underneath */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <span className="text-5xl mb-2">🪙</span>
              <span className="font-extrabold text-2xl text-amber-600" style={{ fontFamily: 'Poppins, sans-serif' }}>+500</span>
              <span className="font-bold text-slate-800 tracking-tight">KAMPA COINS</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase mt-2 bg-amber-100 px-2 py-1 rounded">Code: KAMMA10</span>
            </div>

            {/* The Scratchable Canvas Layer */}
            <canvas
              ref={canvasRef}
              width={256}
              height={256}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className={`absolute inset-0 touch-none cursor-crosshair transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            />
          </div>

          <AnimatePresence>
            {isRevealed && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onClose}
                className="mt-6 w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                Claim Reward & Shop
              </motion.button>
            )}
          </AnimatePresence>

          {!isRevealed && (
            <button onClick={onClose} className="mt-6 text-xs font-semibold text-slate-400 hover:text-slate-600">
              No thanks, I don't want free coins
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
