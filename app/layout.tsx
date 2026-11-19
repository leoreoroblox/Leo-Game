// 檔案路徑：app/layout.tsx
'use client' // ⭐️ 因為用到 usePathname，這裡必須是 client component

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

// 引入組件
import ReleaseCountdown from './components/ReleaseCountdown';
import ClientLoader from './components/ClientLoader';
import UserTracker from './components/UserTracker';
import BanOverlay from './components/BanOverlay';
import SiteStatus from './components/SiteStatus';
import UpdateNotifier from './components/UpdateNotifier';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthGuard from './components/AuthGuard';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ⚠️ 因為改成了 'use client'，metadata 其實不能放在這裡了。
// 為了不讓你報錯，我們先移除 metadata 或放到更上層的 server component。

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#06b6d4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050810] text-white`}>
        
        {/* ⭐️ 如果不是 admin 路由，才顯示倒數遮罩 */}
        {!isAdminRoute && <ReleaseCountdown />}

        <Suspense fallback={<div className="min-h-screen bg-[#050810] flex items-center justify-center text-white">Loading...</div>}>
          
          {/* 如果是 admin 路由，直接放行讓 Admin 頁面自己去驗證 */}
          {isAdminRoute ? (
            children
          ) : (
            <AuthGuard>
              <Navbar />
              <Sidebar />
              <main className="pt-16 pb-16 md:pl-64">
                {children}
              </main>
              <SiteStatus />
              <UpdateNotifier />
            </AuthGuard>
          )}
          
        </Suspense>

        <ClientLoader />
        <UserTracker />
        <BanOverlay />

      </body>
    </html>
  );
}