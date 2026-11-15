// 檔案路徑：app/terms/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import enText from './content/en'
import twText from './content/tw'
import cnText from './content/cn'
import hkText from './content/hk'

export default function TermsPage() {
  const [lang, setLang] = useState<'en' | 'tw' | 'cn' | 'hk'>('en')

  const content = {
    en: { title: "Terms of Use", lastUpdated: "Last Updated: 2026/11/08", text: enText },
    tw: { title: "服務條款", lastUpdated: "最後更新：2026/11/08", text: twText },
    cn: { title: "服务条款", lastUpdated: "最后更新：2026/11/08", text: cnText },
    hk: { title: "服務條款", lastUpdated: "最後更新：2026/11/08", text: hkText },
  }

  const current = content[lang]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-yellow-500 hover:text-yellow-400 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500">{current.title}</h1>
            <p className="text-gray-400 mt-2">{current.lastUpdated}</p>
          </div>
          
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
            {(['en', 'tw', 'cn', 'hk'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  lang === l ? 'bg-yellow-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="text-gray-300 leading-relaxed text-sm prose prose-invert max-w-none">
          <ReactMarkdown>{current.text}</ReactMarkdown>
        </div>
        
      </div>
    </div>
  )
}