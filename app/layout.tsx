import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dengue Detector - Deteksi DBD Lebih Dini',
  description: 'Sistem deteksi Demam Berdarah Dengue (DBD) menggunakan AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        {/* DNS Prefetch & Preconnect for Font CDN - Saves ~80ms LCP */}
        <link rel="preconnect" href="https://overpass-30e2.kxcdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://overpass-30e2.kxcdn.com" />

        <link rel="shortcut icon" href="/uty_logo.png" type="image/x-icon" />
        <link rel="preload" as="image" href="/magnifying_glass.jpg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
