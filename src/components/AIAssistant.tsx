import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am Kampa AI. Looking for an EV scooter, fresh groceries, or the perfect outfit? Let me help!' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setInput('')
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'That sounds great! I am currently a demo AI, but in the future, I will instantly find exactly what you need and offer exclusive discounts. Try checking out our "Trending Now" section!' 
      }])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-full shadow-2xl shadow-teal-500/30 flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} className="animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[60] w-80 sm:w-96 bg-white rounded-3xl shadow-[0_10px_40px_rgb(0,0,0,0.15)] overflow-hidden flex flex-col border border-slate-100"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Kampa AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[0.625rem] text-slate-300">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-colors">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm px-3 text-slate-800 placeholder-slate-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                >
                  <Send size={14} className={input.trim() ? "ml-0.5" : ""} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
