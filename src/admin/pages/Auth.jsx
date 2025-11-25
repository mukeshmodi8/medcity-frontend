import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

// Simple SVG Icons components for internal use
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
)
const MailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
)
const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
)
const ShieldIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
)

export default function Auth({ apiBase = 'https://medcity-backend-t66f.onrender.com' }) {
  const navigate = useNavigate()

  const [mode, setMode] = useState('register')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState("user")

  // register fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')

  // Colors
  const primaryColor = '#283B6A'
  const accentColor = '#00BFA6'

  function flash(text, type = 'info') {
    if (type === 'success') toast.success(text)
    else if (type === 'error') toast.error(text)
    else toast.info(text)
  }

  // Handle Register
  async function handleRegister(e) {
    e.preventDefault()
    if (!name || !email || !password) return flash("Please fill all fields", "error")

    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      })

      const text = await res.text()
      const data = (() => {
        try { return JSON.parse(text) }
        catch { return { message: text } }
      })()

      if (!res.ok) throw new Error(data.message || "Server error")

      flash("Account created successfully! Redirecting...", "success")
      
      setName('')
      setEmail('')
      setPassword('')
      setRole('user')

      setTimeout(() => {
        setMode("login")
        navigate('/admin')
      }, 1000)

    } catch (err) {
      flash(err.message || "Registration failed", "error")
    } finally {
      setLoading(false)
    }
  }

  // Handle Login
  async function handleLogin(e) {
    e && e.preventDefault()
    if (!loginEmail || !loginPass) return flash('Please enter email and password', 'error')

    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')

      flash('Login successful', 'success')
      
      const userRole = data.role 
      localStorage.setItem("role", userRole)

      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/')
        }
      }, 1000)

    } catch (err) {
      flash(err.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
        
        {/* LEFT SIDE (Banner) */}
        <div 
          className="md:w-5/12 p-10 flex flex-col justify-center text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, #1a2540)` }}
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent opacity-10 rounded-full translate-x-10 translate-y-10" style={{ backgroundColor: accentColor }}></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Medcity</h1>
            <h2 className="text-xl font-medium text-gray-300 mb-6">Healthcare Management</h2>
            <p className="text-sm leading-relaxed opacity-80">
              Welcome to the portal. Please login to access your dashboard or create a new account to get started with our services.
            </p>
          </div>
          
          <div className="mt-12 relative z-10">
            <div className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2">Current Status</div>
            <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
               <span className="font-semibold">System Online</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="md:w-7/12 bg-white p-8 md:p-12">
          
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8 max-w-xs mx-auto md:mx-0">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                mode === 'login' 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                mode === 'register' 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {mode === 'login' ? 'Enter your credentials to access your account.' : 'Fill in the details below to register.'}
            </p>
          </div>

          {/* Forms */}
          {mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
                  style={{ '--tw-ring-color': accentColor, borderColor: 'transparent' }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
                  style={{ '--tw-ring-color': accentColor, borderColor: 'transparent' }}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
                  style={{ '--tw-ring-color': accentColor, borderColor: 'transparent' }}
                />
              </div>

              {/* Role Selection */}
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldIcon />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-opacity-50 outline-none appearance-none transition-all cursor-pointer"
                  style={{ '--tw-ring-color': accentColor, borderColor: 'transparent' }}
                >
                  <option value="user">User Account</option>
                  <option value="admin">Admin Access</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-lg font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                style={{ background: `linear-gradient(90deg, ${accentColor}, #00e0b9)` }}
              >
                {loading ? (
                   <span className="flex items-center gap-2">
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Creating Account...
                   </span>
                ) : 'Register Now'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Login Email */}
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
                  style={{ '--tw-ring-color': accentColor, borderColor: 'transparent' }}
                />
              </div>

              {/* Login Password */}
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
                  style={{ '--tw-ring-color': accentColor, borderColor: 'transparent' }}
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm font-medium hover:underline" style={{ color: primaryColor }}>Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-bold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                style={{ background: `linear-gradient(90deg, ${accentColor}, #00e0b9)` }}
              >
                {loading ? (
                   <span className="flex items-center gap-2">
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Logging In...
                   </span>
                ) : 'Login to Dashboard'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}