// 檔案路徑：app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

// ⚠️ 注意：如果你原本有引入其他後台組件，請保留下面的 import
// import AdminClient from './AdminClient'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // 登入表單狀態
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setLoading(false)
        return // 沒登入，顯示登入表單
      }

      // 有登入，檢查角色
      const { data: userData } = await supabase.from('users').select('role').eq('id', session.user.id).single()
      
      if (userData?.role === 'owner' || userData?.role === 'admin') {
        setIsAdmin(true)
      } else {
        // 普通玩家，踢回主頁
        router.push('/')
      }
      setLoading(false)
    }
    checkAccess()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrorMsg(error.message)
    } else {
      window.location.reload()
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white">Authenticating...</div>
  }

  // 1. 沒登入或不是管理員：顯示 100% 仿普通登入介面
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050810] flex flex-col items-center justify-center">
        <div className="bg-[#181a21] w-full max-w-[400px] rounded-xl p-8 shadow-2xl border border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access Only</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-[#2b2d33] border border-gray-600 rounded-md px-3 py-2.5 text-white focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-[#2b2d33] border border-gray-600 rounded-md px-3 py-2.5 text-white focus:border-cyan-500" />
            </div>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            <button type="submit" className="w-full bg-[#335fff] hover:bg-blue-600 text-white font-bold py-3 rounded-md transition mt-4">Log In</button>
          </form>
        </div>
      </div>
    )
  }

  // 2. 是管理員：顯示後台
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to the control center.</p>
        
        {/* ⭐️ 這裡放你原本的 Admin 內容，例如： */}
        {/* <AdminClient /> */}
        
        {/* 控制倒數遮罩的按鈕 */}
        <div className="mt-8 p-6 bg-[#181a21] rounded-xl border border-gray-800 inline-block">
          <h2 className="text-xl font-bold mb-4">Site Controls</h2>
          <button 
            onClick={async () => {
              await supabase.from('site_settings').update({ show_countdown: false }).eq('id', 1)
              alert('Countdown removed! Refresh the main page.')
            }}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition"
          >
            Turn Off Countdown Mask
          </button>
        </div>
      </div>
    </div>
  )
}