// 檔案路徑：app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react';

// ⭐️ 修正引入路徑：因為組件在 app/components 裡面
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
        
        {/* ⭐️ 將倒數計時遮罩放在最外層，它會覆蓋全站 */}
        <ReleaseCountdown />

        {/* 其他你原本的組件 */}
        <AuthGuard>
          <Navbar />
          <Sidebar />
          <main className="pt-16 pb-16 md:pl-64">
            {children}
          </main>
          <SiteStatus />
          <UpdateNotifier />
        </AuthGuard>

      </body>
    </html>
  );
}