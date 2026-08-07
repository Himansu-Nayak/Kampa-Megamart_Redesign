import { useState } from 'react'
import { useApp } from '@/context/AppContext'

export default function Login() {
  const { navigate, setLoggedIn } = useApp()
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (mode === 'register' && !form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Enter a valid email address'
    if (mode !== 'reset') {
      if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
      if (mode === 'register' && form.password !== form.confirm) e.confirm = 'Passwords do not match'
    }
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    if (mode === 'reset') { setSubmitted(true); return }
    setLoggedIn(true)
    navigate('account')
  }

  function update(key: string, val: string) {
    setForm(prev => ({ ...prev, [key]: val }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  if (submitted && mode === 'reset') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📧</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Check your inbox</h2>
          <p className="text-slate-500 text-sm mb-4">We've sent a password reset link to <strong>{form.email}</strong>. Check your spam folder if you don't see it.</p>
          <button onClick={() => { setMode('login'); setSubmitted(false) }} className="text-teal-700 text-sm font-medium hover:underline">
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-teal-700 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl mx-auto mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>K</div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Kampa Megamart</h1>
          <p className="text-slate-500 text-sm mt-1">
            {mode === 'login' ? 'Welcome back! Sign in to your account' :
             mode === 'register' ? 'Create your account to start shopping' :
             'Reset your password'}
          </p>
        </div>

        {/* Tab toggle */}
        {mode !== 'reset' && (
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'register' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Create Account
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          {mode === 'register' && (
            <Field label="Full Name" error={errors.name}>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Rahul Kumar" className={inputCls(errors.name)} />
            </Field>
          )}

          <Field label="Email Address" error={errors.email}>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="rahul@example.com" className={inputCls(errors.email)} />
          </Field>

          {mode === 'register' && (
            <Field label="Mobile Number" error={errors.phone}>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className={inputCls(errors.phone)} />
            </Field>
          )}

          {mode !== 'reset' && (
            <Field label="Password" error={errors.password}>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder={mode === 'register' ? 'Min. 8 characters' : '••••••••'} className={inputCls(errors.password)} />
            </Field>
          )}

          {mode === 'register' && (
            <Field label="Confirm Password" error={errors.confirm}>
              <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)} placeholder="Repeat your password" className={inputCls(errors.confirm)} />
            </Field>
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button type="button" onClick={() => setMode('reset')} className="text-xs text-teal-700 hover:underline font-medium">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>

          {mode !== 'reset' && (
            <>
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">or continue with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ icon: 'G', label: 'Google', color: 'text-red-500' }, { icon: 'f', label: 'Facebook', color: 'text-blue-600' }].map(s => (
                  <button key={s.label} type="button" className="flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <span className={`font-bold ${s.color}`}>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {mode === 'reset' && (
            <button type="button" onClick={() => setMode('login')} className="w-full text-center text-sm text-slate-500 hover:text-slate-700">
              ← Back to Sign In
            </button>
          )}
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          By continuing, you agree to Kampa's{' '}
          <button className="text-teal-700 hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-teal-700 hover:underline">Privacy Policy</button>.
        </p>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
}

function inputCls(error?: string) {
  return `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 transition-colors ${
    error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
  }`
}
