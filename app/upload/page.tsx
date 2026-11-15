// 檔案路徑：app/upload/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UploadGamePage() {
  const [gameName, setGameName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Adventure')
  const [isDragging, setIsDragging] = useState(false)

  // 處理拖曳檔案
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // 這裡未來會接上讀取檔案和上傳到 Supabase 的邏輯
    alert('File dropped! (Upload logic coming next)')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* 頂部導航與標題 */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Leo Studio</h1>
            <p className="text-gray-400 text-sm mt-1">Publish your next big creation to the world.</p>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white transition">
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左側：上傳區域 */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                isDragging ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-700 bg-gray-900 hover:border-gray-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-xl font-bold mb-2">Drag & Drop Game Files</h3>
              <p className="text-gray-500 text-sm text-center">
                Upload your Unity or WebGL build here. Maximum size: 500MB.
              </p>
              <button className="mt-6 bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold transition border border-gray-700">
                Or Browse Files
              </button>
            </div>

            {/* 遊戲詳情表單 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Game Details</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Game Name</label>
                <input 
                  type="text" 
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  placeholder="Give your game a cool title..."
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell players what makes your game special..."
                  rows={4}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 右側：設定與發布面板 */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Publish Settings</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Adventure">Adventure</option>
                  <option value="RPG">RPG</option>
                  <option value="Shooter">Shooter</option>
                  <option value="Obby">Obby (Parkour)</option>
                  <option value="Social">Social / Hangout</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Cover Image</label>
                <div className="w-full h-32 bg-gray-950 border border-dashed border-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                  Click to upload thumbnail
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <button 
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-colors"
                  onClick={() => alert('Publish logic coming next!')}
                >
                  Publish Game
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By publishing, you agree to the Leo Game Terms of Use.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}