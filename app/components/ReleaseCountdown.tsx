// 檔案路徑：app/components/ReleaseCountdown.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function ReleaseCountdown() {
  const targetDate = new Date('2027-01-01T00:00:00').getTime()
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      // 1. 檢查後台開關
      const { data: settings } = await supabase.from('site_settings').select('show_countdown').single()
      if (settings && settings.show_countdown === false) {
        setIsVisible(false)
        return
      }

      // 2. 檢查玩家登入狀態
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: userData } = await supabase.from('users').select('username').eq('id', session.user.id).single()
        setUser(userData)
      }

      // 3. 監聽登入狀態改變
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data: userData } = await supabase.from('users').select('username').eq('id', session.user.id).single()
          setUser(userData)
        } else {
          setUser(null)
        }
      })
    }
    init()

    // 倒數計時邏輯
    const timer = setInterval(() => {
      const distance = targetDate - new Date().getTime()
      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0a0a0c] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
          THE FUTURE IS COMING
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-12 tracking-widest uppercase">
          Leo Game Official Release
        </p>

        <div className="flex gap-4 md:gap-8 justify-center items-center mb-16">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-[#181a21]/80 backdrop-blur-md border border-gray-700 w-20 h-24 md:w-32 md:h-36 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl md:text-6xl font-bold text-white font-mono">
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-gray-500 text-sm mt-4 tracking-widest uppercase font-bold">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-gray-500 text-sm mb-8">
          Stay tuned. The next-gen UGC platform will be revealed in 2027.
        </div>

        {/* ⭐️ 玩家登入狀態區塊 */}
        <div className="mt-4">
          {user ? (
            <div className="text-green-400 font-bold bg-green-900/30 border border-green-500/50 px-6 py-3 rounded-xl inline-block">
              ✓ Welcome, {user.username}
            </div>
          ) : (
            <button 
              onClick={() => {
                // 觸發事件，讓 AuthGuard 顯示登入框
                window.dispatchEvent(new CustomEvent('open-auth-modal'));
              }}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition shadow-lg"
            >
              Sign Up / Log In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}