// 檔案路徑：app/components/ReleaseCountdown.tsx
'use client'

import { useState, useEffect } from 'react'
// ⭐️ 修正路徑：從 app/components 退兩層，找到 lib/supabase
import { supabase } from '../../lib/supabase' 

export default function ReleaseCountdown() {
  // 設定目標日期：2027年1月1日
  const targetDate = new Date('2027-01-01T00:00:00').getTime()
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })
  
  const [isVisible, setIsVisible] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // 檢查是否為管理員
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase.from('users').select('role').eq('id', session.user.id).single()
        if (data?.role === 'owner' || data?.role === 'admin') {
          setIsAdmin(true)
        }
      }
    }
    checkAdmin()

    // 倒數計時邏輯
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

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

  // 如果管理員按了「進入網站」，或者時間已經到了，就不顯示遮罩
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[999999] bg-[#0a0a0c] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 背景特效：發光光暈 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* 主要內容 */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
          THE FUTURE IS COMING
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-12 tracking-widest uppercase">
          Leo Game Official Release
        </p>

        {/* 倒數計時卡片 */}
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

        {/* 管理員專屬通道 */}
        {isAdmin && (
          <button 
            onClick={() => setIsVisible(false)}
            className="mt-8 px-6 py-2 border border-red-500/30 text-red-400 rounded-full text-sm hover:bg-red-500/10 transition-colors"
          >
            🔑 Admin Bypass (Enter Website)
          </button>
        )}
      </div>
    </div>
  )
}