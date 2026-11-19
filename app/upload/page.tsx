// 檔案路徑：app/upload/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LeoStudioDashboard() {
  // ⭐️ 狀態：判斷是否為移動端（手機/平板）
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  // ⭐️ 狀態：上傳表單
  const [gameName, setGameName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  // 偵測設備與初始化
  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Toast 自動消失
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type })
  }

  // 避免 SSR 與 CSR 渲染不一致
  if (!isMounted) return <div className="min-h-screen bg-[#181a21]"></div>

  // ==========================================
  // 🚫 手機端防護鎖 (阻擋上傳)
  // ==========================================
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#181a21] flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="text-6xl mb-6">💻</div>
        <h1 className="text-3xl font-bold mb-4">Desktop Required</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Leo Studio is a professional 3D creation tool. Publishing experiences requires a larger screen and more processing power. 
          <br/><br/>
          Please log in from a Desktop or Laptop to access the Creator Dashboard.
        </p>
        <Link href="/" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-colors">
          Return to Home
        </Link>
      </div>
    )
  }

  // ==========================================
  // 💻 桌面端完整控制台 (對標你的截圖)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#181a21] text-gray-300 font-sans flex overflow-hidden">
      
      {/* 1. 左側全局導航欄 (像截圖左側的黑色區域) */}
      <div className="w-64 border-r border-gray-800 bg-[#181a21] flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center font-bold text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]">L</div>
          <span className="font-bold text-white text-lg tracking-wide">Creator</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          <div className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4">My Workspace</div>
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm">
            <span>🏠</span> Home
          </Link>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-800 text-white font-bold text-sm">
            <span>📁</span> Creations
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm cursor-not-allowed opacity-50">
            <span>📚</span> Learn
          </div>
          <Link href="/store" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm">
            <span>🛒</span> Marketplace
          </Link>
          <Link href="/forum" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm">
            <span>💬</span> Forum
          </Link>
          
          <div className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6">Analytics & Config</div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm cursor-not-allowed opacity-50">
            <span>💰</span> Finances
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm cursor-not-allowed opacity-50">
            <span>📊</span> Analytics
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm cursor-not-allowed opacity-50">
            <span>📢</span> Advertising
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">L</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-white truncate">Leo (Owner)</div>
              <div className="text-xs text-gray-500 truncate">creator@leogame.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 右側主內容區 */}
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-y-auto">
        
        {/* 頂部狀態列 (像截圖頂部的搜尋與通知) */}
        <header className="h-16 bg-[#181a21] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white text-xl">☰</button>
            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">🔍</button>
            <button className="text-gray-400 hover:text-white">🔔</button>
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm">L</div>
          </div>
        </header>

        <main className="p-8 pb-20 max-w-[1400px] w-full mx-auto flex gap-8">
          
          {/* 中間主區域 (橫幅、體驗列表、上傳區) */}
          <div className="flex-1 space-y-8">
            
            {/* 橫幅區域 (對標截圖的「立即開始」) */}
            <div className="bg-[#23252d] rounded-xl p-6 flex justify-between items-center relative overflow-hidden">
              <div className="relative z-10 w-2/3">
                <h2 className="text-2xl font-bold text-white mb-2">Publish a New Experience</h2>
                <p className="text-gray-400 text-sm mb-6">Upload your Unity build and share your world with the Leo Game community.</p>
                
                {/* 上傳表單直接放在這裡 */}
                <div className="space-y-3">
                  <input 
                    type="text" 
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="Experience Name (e.g., Leo's Plaza)"
                    className="w-full bg-[#181a21] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 text-sm"
                  />
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isDragging ? 'border-cyan-400 bg-cyan-400/5' : 'border-gray-700 bg-[#181a21] hover:bg-[#23252d]'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); showToast('File uploaded successfully! Ready to publish.', 'success'); }}
                  >
                    <div className="text-3xl mb-2 text-gray-500">📁</div>
                    <h3 className="font-bold text-white text-sm">Drag & Drop .zip / .exe here</h3>
                    <p className="text-gray-500 text-xs mt-1">Max size: 500MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast('Publishing system is currently under maintenance.', 'info')}
                  className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-md transition shadow-[0_0_15px_rgba(6,182,212,0.3)] text-sm"
                >
                  Publish Experience
                </button>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-900/20 to-transparent pointer-events-none"></div>
            </div>

            {/* 體驗列表 (對標截圖的遊戲卡片) */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">My Experiences</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 卡片 1 */}
                <div className="bg-[#23252d] rounded-xl overflow-hidden hover:bg-[#2a2d36] transition cursor-pointer border border-transparent hover:border-gray-700">
                  <div className="h-32 bg-gray-800 relative">
                    {/* 佔位圖案 */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-3xl">🏙️</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-2 truncate">Leo's Realistic Plaza</h3>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex justify-between"><span>Active Users</span> <span className="text-white">0</span></div>
                      <div className="flex justify-between"><span>Daily Active</span> <span className="text-white">0</span></div>
                      <div className="flex justify-between"><span>Avg. Playtime</span> <span className="text-white">0m</span></div>
                    </div>
                  </div>
                </div>

                {/* 卡片 2 (空狀態) */}
                <div className="bg-[#1e2026] border border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center h-[230px] cursor-pointer hover:bg-[#23252d] transition">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl mb-3">+</div>
                  <p className="text-sm text-gray-400 font-bold">Create New Experience</p>
                </div>

              </div>
            </div>

            {/* 學習資源 (對標截圖底部的教學影片) */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Learn</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#23252d] h-24 rounded-lg flex items-center p-4 gap-4 hover:bg-[#2a2d36] cursor-pointer">
                  <div className="text-2xl text-cyan-400">🎓</div>
                  <div className="text-sm font-bold text-white">Introduction to Unity</div>
                </div>
                <div className="bg-[#23252d] h-24 rounded-lg flex items-center p-4 gap-4 hover:bg-[#2a2d36] cursor-pointer">
                  <div className="text-2xl text-cyan-400">📦</div>
                  <div className="text-sm font-bold text-white">Packaging your Game</div>
                </div>
                <div className="bg-[#23252d] h-24 rounded-lg flex items-center p-4 gap-4 hover:bg-[#2a2d36] cursor-pointer">
                  <div className="text-2xl text-cyan-400">💡</div>
                  <div className="text-sm font-bold text-white">Monetization Tips</div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. 右側邊欄 (對標截圖右側的「更新」) */}
          <div className="w-80 space-y-6 hidden xl:block">
            <div className="bg-[#23252d] rounded-xl p-5 border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">Updates</h3>
                <button className="text-xs text-gray-500 hover:text-white">View All</button>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-500 pl-3">
                  <h4 className="text-sm font-bold text-white">Leo Game Alpha v0.1</h4>
                  <p className="text-xs text-gray-400 mt-1">Official website changed. First game launching soon!</p>
                  <span className="text-[10px] text-gray-500 mt-2 block">2 hours ago</span>
                </div>
                <div className="border-l-2 border-gray-700 pl-3">
                  <h4 className="text-sm font-bold text-gray-300">Terms of Use Updated</h4>
                  <p className="text-xs text-gray-500 mt-1">Added multi-language support for legal docs.</p>
                </div>
              </div>
            </div>

            {/* 小提示 */}
            <div className="bg-blue-900/10 border border-blue-800/30 rounded-xl p-5 text-xs text-blue-200 leading-relaxed">
              <p className="font-bold text-white mb-2 text-sm flex items-center gap-2"><span className="text-lg">🛡️</span> Safety First</p>
              All uploads are scanned for malicious files. Obbying or exploiting will result in a permanent IP ban.
            </div>
          </div>

        </main>
      </div>

      {/* ⭐️ 酷炫的 Toast 懸浮通知 */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[999] animate-[slideIn_0.3s_ease-out]">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border ${
            toast.type === 'success' 
              ? 'bg-green-900/90 border-green-500 text-green-100' 
              : 'bg-[#23252d]/95 border-cyan-500 text-cyan-100'
          } backdrop-blur-md`}>
            <span className="text-2xl">
              {toast.type === 'success' ? '✅' : '🚧'}
            </span>
            <div>
              <p className="font-bold">{toast.type === 'success' ? 'Success' : 'Notice'}</p>
              <p className="text-sm opacity-90">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="ml-4 text-white/50 hover:text-white transition">✕</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
    </div>
  )
}