// 檔案路徑：app/studio/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase' 

export default function CreatorDashboard() {
  const [toast, setToast] = useState<{ message: string; type: 'info' } | null>(null)
  
  const [userData, setUserData] = useState<{
    username: string;
    avatar_url: string;
    role: string;
  } | null>(null)

  useEffect(() => {
    async function fetchUser() {
      // 1. 取得當前登入的 Session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // 2. 先嘗試從你的 public.users 表抓取資料
        const { data: dbData } = await supabase
          .from('users')
          .select('username, avatar_url, role')
          .eq('id', session.user.id)
          .single()
        
        // 3. 如果資料庫沒資料，嘗試從 Auth 註冊時填寫的 metadata 抓取
        const metaName = session.user.user_metadata?.username
        
        // 4. 如果都沒有，就用 Email 的前綴
        const fallbackName = session.user.email?.split('@')[0] || 'Player'

        // 最終決定顯示的名字與頭像
        const finalUsername = dbData?.username || metaName || fallbackName
        const finalAvatar = dbData?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${finalUsername}`
        const finalRole = dbData?.role || 'user'

        setUserData({
          username: finalUsername,
          avatar_url: finalAvatar,
          role: finalRole
        })
      }
    }
    fetchUser()
  }, [])

  const showToast = (message: string) => {
    setToast({ message, type: 'info' })
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 font-sans flex overflow-hidden selection:bg-cyan-500/30">
      
      {/* ================= 1. 左側全局導航欄 ================= */}
      <div className="w-60 border-r border-[#2a2b36] bg-[#111111] flex flex-col fixed h-full z-50">
        <div className="p-5 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold text-black shadow-sm">L</div>
          <span className="font-bold text-white text-lg tracking-wide">Creator</span>
        </div>
        
        {/* 玩家真實資料區塊 */}
        <div className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-[#1c1d24] transition rounded-lg mx-2 mb-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src={userData?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=Loading`} 
              alt="Avatar" 
              className="w-9 h-9 rounded-full bg-gray-700 object-cover shrink-0 border border-gray-600"
            />
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-white leading-tight truncate flex items-center gap-1">
                {userData?.username || 'Loading...'}
                {/* 如果他是管理員，加個皇冠！ */}
                {userData?.role === 'owner' && <span className="text-[10px]">👑</span>}
              </span>
              <span className="text-[11px] text-gray-500 truncate">
                @{userData?.username?.toLowerCase() || '...'}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500 shrink-0">▼</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          <div className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-2">My Workspace</div>
          
          <Link href="/studio" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#2a2b36] text-white font-bold text-sm transition">
            <span className="text-lg">🏠</span> Home
          </Link>
          <Link href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition">
            <span className="text-lg">📁</span> Creations
          </Link>
          
          <button onClick={() => showToast('Learn is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">📖</span> Learn
          </button>
          <button onClick={() => showToast('Store is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">🛍️</span> Store
          </button>
          <button onClick={() => showToast('Forum is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">💬</span> Forum
          </button>
          <button onClick={() => showToast('Updates is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">🔄</span> Updates
          </button>

          <div className="border-t border-[#2a2b36] my-3"></div>
          <div className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Analytics & Config</div>

          <button onClick={() => showToast('Finances module is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">💵</span> Finances
          </button>
          <button onClick={() => showToast('Analytics module is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">📊</span> Analytics
          </button>
          <button onClick={() => showToast('Advertising module is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">📢</span> Advertising
          </button>

          <div className="border-t border-[#2a2b36] my-3"></div>

          <button onClick={() => showToast('All Tools panel is coming soon!')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1c1d24] text-gray-400 hover:text-white text-sm transition text-left">
            <span className="text-lg">🧰</span> All Tools
          </button>
        </nav>

        <div className="p-4 border-t border-[#2a2b36] space-y-3">
          <div className="flex items-center gap-2 text-xs text-gray-400 hover:text-white cursor-pointer transition"><span className="text-lg">🌐</span> Leogame.com</div>
          <div className="flex items-center gap-2 text-xs text-gray-400 hover:text-white cursor-pointer transition"><span className="text-lg">🧊</span> Studio</div>
        </div>
      </div>

      {/* ================= 2. 主內容與右側邊欄 ================= */}
      <div className="flex-1 ml-60 flex flex-col h-screen overflow-y-auto bg-[#111111]">
        <header className="h-16 bg-[#111111] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white text-xl">☰</button>
            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-white text-lg">🔍</button>
            <button className="text-gray-400 hover:text-white text-lg">🔔</button>
            <img 
              src={userData?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=Loading`} 
              className="w-8 h-8 rounded-full border border-gray-600 object-cover"
            />
          </div>
        </header>

        <main className="px-8 pb-20 max-w-[1500px] w-full mx-auto flex gap-8">
          <div className="flex-1 space-y-8">
            
            {/* 體驗區塊 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <h2 className="text-xl font-bold text-white">Experiences</h2>
                  <span className="text-gray-500 text-sm">▶</span>
                </div>
                <Link href="/upload" className="bg-[#2a2b36] hover:bg-gray-700 text-white font-bold text-sm px-4 py-2 rounded transition flex items-center gap-2">
                  Create Experience <span className="text-gray-400">↗</span>
                </Link>
              </div>

              <div className="flex gap-6">
                <div className="w-72 bg-[#1c1d24] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:ring-2 hover:ring-gray-600 transition relative group">
                  <div className="h-36 bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-4xl">🎮</div>
                    <div className="absolute top-2 left-2 bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <span>🚫</span> Cannot Play
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-3 truncate">n</h3>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex justify-between"><span>Active Users</span> <span className="text-white">0</span></div>
                      <div className="flex justify-between"><span>Daily Active</span> <span className="text-white">-</span></div>
                      <div className="flex justify-between"><span>Day 1 Retention</span> <span className="text-white">-</span></div>
                      <div className="flex justify-between"><span>Daily Revenue</span> <span className="text-white">-</span></div>
                      <div className="flex justify-between"><span>Avg. Session Time</span> <span className="text-white">-</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-[#1c1d24] rounded-xl p-8 flex items-center justify-between relative overflow-hidden group cursor-pointer hover:ring-2 hover:ring-gray-600 transition">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Create Anything You Imagine</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm">Studio is the all-in-one tool to build your experiences on Leo Game. Try it out now!</p>
                    <button className="bg-white hover:bg-gray-200 text-black font-bold text-sm px-6 py-2.5 rounded-md transition flex items-center gap-2">
                      <span className="text-lg">🧊</span> Launch Studio
                    </button>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none flex items-center justify-end pr-4">
                    <div className="w-full h-full border-l border-gray-600 bg-gray-800 flex flex-col">
                      <div className="h-6 border-b border-gray-600 flex items-center px-2 gap-1"><div className="w-2 h-2 rounded-full bg-gray-500"></div><div className="w-2 h-2 rounded-full bg-gray-500"></div></div>
                      <div className="flex-1 grid grid-cols-4 gap-2 p-2">
                        <div className="col-span-1 bg-gray-700 rounded"></div>
                        <div className="col-span-3 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 學習區塊 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Learn</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-[#1c1d24] rounded-lg overflow-hidden cursor-pointer group">
                    <div className="h-32 bg-gray-800 relative flex items-center justify-center">
                      <div className="text-gray-600 text-3xl group-hover:scale-110 transition-transform">🎬</div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-white">15:02</div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-bold text-white truncate">Beginner's Guide to 3D Creation</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                        <span className="text-xs text-gray-400">LeoLearn</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 探索區塊 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Explore Creator Hub</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: '👕', title: 'Create Avatar Items', desc: 'Build and publish avatar items to the Marketplace.' },
                  { icon: '📚', title: 'Read Community Tutorials', desc: 'Find tutorials published by the creator community.' },
                  { icon: '📈', title: 'Add Community Content', desc: 'See hot items from the creator store.' },
                  { icon: '🔍', title: 'Understand What Players Like', desc: 'See which experiences are gaining the most traction.' },
                  { icon: '🔮', title: 'The Future of Leo Game', desc: 'Preview new features coming soon to the platform.' },
                  { icon: '🤝', title: 'Work for Leo Game', desc: 'Learn about opportunities directly from the team.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#1c1d24] p-4 rounded-xl cursor-pointer hover:bg-[#2a2b36] transition flex flex-col justify-between h-28 border border-transparent hover:border-gray-700">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 右側邊欄 */}
          <div className="w-72 space-y-6 hidden xl:block shrink-0">
            <div className="bg-[#111111] rounded-xl p-4 border border-[#2a2b36]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-sm">Updates</h3>
                <div className="flex items-center gap-2">
                  <button className="text-xs bg-[#2a2b36] px-2 py-1 rounded text-gray-300">Filter</button>
                  <button className="text-xs text-gray-500 hover:text-white">View All</button>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer leading-tight">User Bio / Description Privacy Settings</h4>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-2">
                    <span>💬 0</span><span>👁️ 0</span><span>#apis</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer leading-tight">Experiments: Measure Impact with Custom Metrics</h4>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-2">
                    <span>💬 60</span><span>👁️ 6</span><span>#ads #analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* 懸浮通知 */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[999] animate-[slideIn_0.3s_ease-out]">
          <div className="flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border bg-[#161b22]/95 border-cyan-500 text-cyan-100 backdrop-blur-md">
            <span className="text-2xl">🚧</span>
            <div>
              <p className="font-bold">Notice</p>
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