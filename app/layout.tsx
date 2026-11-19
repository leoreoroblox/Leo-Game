// 檔案路徑：app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react'; // ⭐️ 修復報錯的關鍵

// 引入你的所有組件
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

export const metadata: Metadata = {
  title: "Leo Game",
  description: "Play. Create. Connect. The ultimate platform for players and creators.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#06b6d4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050810] text-white`}>
        
        {/* 1. 倒數計時遮罩 (放在最外層) */}
        <ReleaseCountdown />

        {/* 2. ⭐️ 用 Suspense 包住整個會用到 usePathname/useRouter 的區塊 */}
        <Suspense fallback={<div className="min-h-screen bg-[#050810] flex items-center justify-center text-white">Loading...</div>}>
          
          <AuthGuard>
            {/* 導航列與側邊欄 */}
            <Navbar />
            <Sidebar />
            
            {/* 主要網頁內容 */}
            <main className="pt-16 pb-16 md:pl-64">
              {children}
            </main>
            
            {/* 其他全局組件 */}
            <SiteStatus />
            <UpdateNotifier />
          </AuthGuard>
          
        </Suspense>

        {/* 3. 其他不需要依賴路由的組件 (可放外面) */}
        <ClientLoader />
        <UserTracker />
        <BanOverlay />

      </body>
    </html>
  );
}