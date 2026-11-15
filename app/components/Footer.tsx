// 檔案路徑：components/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  // 我們把陣列升級，分成「有網址的」和「還沒做的」
  const links = [
    { name: 'About Us', href: null },
    { name: 'Careers', href: null },
    { name: 'Newsroom', href: null },
    { name: 'Parents', href: null },
    { name: 'Gift Cards', href: null },
    { name: 'Support', href: null },
    { name: 'Terms', href: '/terms' },         // ⭐️ 連結到服務條款
    { name: 'Accessibility', href: null },
    { name: 'Privacy', href: '/privacy' },     // ⭐️ 連結到隱私政策
    { name: 'Your Privacy Choices', href: null },
    { name: 'Sitemap', href: null },
  ];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Coming soon!');
  };

  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800 py-8 mt-20 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {links.map((link) => (
            // 如果這個連結有 href，就顯示連到新頁面的 Link
            link.href ? (
              <Link 
                key={link.name} 
                href={link.href}
                className="hover:text-white transition"
              >
                {link.name}
              </Link>
            ) : (
              // 如果沒有，就保留原本的 Coming soon 彈窗
              <button 
                key={link.name} 
                onClick={handleClick}
                className="hover:text-white transition"
              >
                {link.name}
              </button>
            )
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-gray-600">
          <span>Language: English</span>
          <span>© 2026 Leo Game Corporation</span>
        </div>
      </div>
    </footer>
  );
}