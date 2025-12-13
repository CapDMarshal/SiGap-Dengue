'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { createClient } from '../utils/supabase/client'
import { User } from '@supabase/supabase-js'

import TipsCard from '@/components/TipsCard'
import TipsDetailCard from '@/components/TipsDetailCard'
import FAQCards from './components/FAQCards'

const MapTilerMap = dynamic(() => import('./components/Maptilermap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
        <p className="text-gray-500">Memuat komponen peta...</p>
      </div>
    </div>
  ),
})

const tipsData = [
  {
    title: 'Menguras & Membersihkan',
    description: 'Kuras dan bersihkan tempat penampungan air seperti bak mandi, ember, vas bunga minimal seminggu sekali',
    footerText: '✓ Bak mandi  ✓ Ember air  ✓ Vas bunga',
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="currentColor" viewBox="0 0 32 32">
        <path d="M28 13.25h-24c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75h1.821l3.353 15.41c0.076 0.34 0.375 0.59 0.732 0.59h12.188c0.357 0 0.656-0.25 0.731-0.585l3.354-15.41h1.82c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75zM6.779 10.752c0.414 0 0.749-0.335 0.75-0.749 0-2.498 1.384-4.673 3.427-5.8 1.417-0.785 3.107-1.247 4.904-1.247 1.806 0 3.502 0.466 4.976 1.285 2.063 1.142 3.437 3.306 3.437 5.791 0 0.414 0.336 0.75 0.75 0.75s0.749-0.335 0.75-0.749c0-3.040-1.67-5.689-4.143-7.080-1.639-0.914-3.595-1.451-5.676-1.451-2.072 0-4.020 0.533-5.714 1.47-2.529 1.415-4.211 4.077-4.211 7.131 0 0.414 0.335 0.749 0.749 0.75z" />
      </svg>
    )
  },
  {
    title: 'Menutup Rapat',
    description: 'Tutup rapat-rapat tempat penyimpanan air dan wadah yang berpotensi menampung air hujan',
    footerText: '✓ Tong air  ✓ Drum  ✓ Tempayan',
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="currentColor" viewBox="0 0 24 24">
        <ellipse cx="12" cy="6" rx="7" ry="2" fill="currentColor" />
        <rect x="5" y="6" width="14" height="12" rx="1" />
        <ellipse cx="12" cy="18" rx="7" ry="2" fill="currentColor" opacity="0.8" />
        <path d="M6 10H18M6 14H18" stroke="white" strokeWidth="1" opacity="0.3" />
        <rect x="10" y="4" width="4" height="1.5" rx="0.5" fill="currentColor" opacity="0.5" />
      </svg>
    )
  },
  {
    title: 'Mendaur Ulang',
    description: 'Manfaatkan atau daur ulang barang bekas yang dapat menampung air seperti kaleng, ban bekas',
    footerText: '✓ Kaleng bekas  ✓ Ban bekas  ✓ Botol plastik',
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 3.1l1.4 2.2-1.6 1.1 1.3 0.3 2.8 0.6 0.6-2.7 0.4-1.4-1.8 1.1-2-3.3h-2.2l-2.6 4.3 1.7 1z" />
        <path d="M16 12l-2.7-4.3-1.7 1 2 3.3h-2.6v-2l-3 3 3 3v-2h3.7z" />
        <path d="M2.4 12v0l1.4-2.3 1.7 1.1-0.9-4.2-2.8 0.7-1.3 0.3 1.6 1-2.1 3.4 1.3 2h5.7v-2z" />
      </svg>
    )
  },
  {
    title: 'Plus Proteksi',
    description: 'Tambahan perlindungan dengan menanam tanaman anti nyamuk dan menggunakan obat nyamuk',
    footerText: '✓ Lavender  ✓ Serai wangi  ✓ Lotion anti nyamuk',
    icon: (
      <svg className="w-7 h-7 text-red-700" fill="currentColor" viewBox="0 0 24 24">
        <path clipRule="evenodd" d="M10.4269 2.42148C11.4003 1.85951 12.5996 1.8595 13.573 2.42148L19.5087 5.84848C20.4821 6.41046 21.0817 7.44904 21.0817 8.573V15.427C21.0817 16.551 20.4821 17.5895 19.5087 18.1515L13.573 21.5785C12.5996 22.1405 11.4003 22.1405 10.4269 21.5785L4.49122 18.1515C3.51784 17.5895 2.91821 16.551 2.91821 15.427V8.573C2.91821 7.44904 3.51784 6.41046 4.49122 5.84848L10.4269 2.42148ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25V9C11.25 8.58579 11.5858 8.25 12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z" fillRule="evenodd" />
      </svg>
    )
  }
];

const gejalaItems = [
  'Demam tinggi mendadak (38°C - 40°C) selama 2-7 hari',
  'Sakit kepala hebat dan nyeri di belakang mata',
  'Nyeri otot dan sendi di seluruh tubuh',
  'Mual, muntah, dan hilang nafsu makan',
  'Ruam merah pada kulit'
];

const dokterItems = [
  'Demam tidak turun setelah 3 hari',
  'Muntah terus-menerus dan tidak bisa makan/minum',
  'Nyeri perut hebat dan terus-menerus',
  'Pendarahan (mimisan, gusi berdarah)',
  'Lemas, gelisah, atau pingsan'
];

// FAQ Accordion Component
const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: "Bagaimana mengenali gejala awal DBD?",
      icon: "❓",
      color: "red",
      content: [
        { icon: "🌡️", text: "Demam tinggi mendadak (38°C - 40°C) tanpa sebab yang jelas" },
        { icon: "🤕", text: "Sakit kepala hebat yang terasa menusuk, terutama di area belakang mata" },
        { icon: "💪", text: "Nyeri otot dan sendi yang membuat tubuh terasa sangat pegal" },
        { icon: "🤢", text: "Mual, muntah, dan hilang nafsu makan secara tiba-tiba" },
        { icon: "🔴", text: "Ruam merah kecil yang muncul di kulit, biasanya setelah hari ke-3" },
        { icon: "⚠️", text: "Perlu diingat: Gejala awal DBD mirip flu biasa, jadi waspada jika demam tidak kunjung turun" }
      ]
    },
    {
      question: "Kapan harus segera ke dokter?",
      icon: "🏥",
      color: "yellow",
      content: [
        { icon: "🚨", text: "Demam tinggi berlangsung lebih dari 3 hari berturut-turut" },
        { icon: "🤮", text: "Muntah terus-menerus sehingga tidak bisa makan atau minum" },
        { icon: "⚡", text: "Nyeri perut hebat dan berkelanjutan yang tidak tertahankan" },
        { icon: "🩸", text: "Pendarahan spontan: mimisan, gusi berdarah, atau bintik merah di kulit" },
        { icon: "😵", text: "Lemas berlebihan, gelisah, atau kehilangan kesadaran" },
        { icon: "💧", text: "Tanda dehidrasi: mulut kering, jarang buang air kecil, kulit pucat" }
      ]
    },
    {
      question: "Apa yang harus dilakukan dalam 24 jam pertama demam?",
      icon: "⏰",
      color: "blue",
      content: [
        { icon: "🌡️", text: "Monitor suhu tubuh setiap 2-3 jam dan catat dalam buku harian" },
        { icon: "💊", text: "Berikan paracetamol untuk menurunkan demam, HINDARI aspirin dan ibuprofen" },
        { icon: "💧", text: "Perbanyak minum air putih, oralit, atau jus buah segar" },
        { icon: "🛏️", text: "Istirahat total di tempat tidur dan hindari aktivitas berat" },
        { icon: "🍲", text: "Konsumsi makanan bergizi yang mudah dicerna seperti bubur atau sup" },
        { icon: "👨‍⚕️", text: "Hubungi dokter jika demam tidak turun setelah 24 jam atau muncul gejala lain" }
      ]
    },
    {
      question: "Apa perbedaan DBD dan tipes?",
      icon: "🔍",
      color: "green",
      content: [
        { icon: "🌡️", text: "DBD: Demam tinggi mendadak vs Tipes: Demam naik bertahap" },
        { icon: "🤕", text: "DBD: Sakit kepala hebat dan nyeri mata vs Tipes: Sakit kepala ringan" },
        { icon: "🔴", text: "DBD: Ruam merah kecil muncul hari ke-3 vs Tipes: Bintik merah di dada (rose spot)" },
        { icon: "💪", text: "DBD: Nyeri otot dan sendi parah vs Tipes: Nyeri otot ringan" },
        { icon: "🍽️", text: "DBD: Mual muntah awal penyakit vs Tipes: Gangguan pencernaan dominan" },
        { icon: "🧪", text: "Diagnosis pasti memerlukan tes laboratorium: NS1, IgG/IgM untuk DBD" }
      ]
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const getColorClasses = (color: string) => {
    // Semua card FAQ menggunakan warna merah seperti card pertama
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'bg-red-100' }
  }

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => {
        const colors = getColorClasses(faq.color)
        const isOpen = openIndex === index

        return (
          <div key={index} className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden transition-all duration-300`}>
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center text-xl`}>
                  {faq.icon}
                </div>
                <h3 className={`text-lg font-semibold ${colors.text}`}>
                  {faq.question}
                </h3>
              </div>
              <svg
                className={`w-5 h-5 ${colors.text} transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`px-6 transition-all duration-300 ${isOpen ? 'pb-6' : 'pb-0 max-h-0 overflow-hidden'}`}>
              <div className="space-y-3 pt-2">
                {faq.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                    <p className={`${colors.text} leading-relaxed`}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to action di akhir setiap FAQ */}
              <div className="mt-4 pt-4 border-t border-opacity-30">
                <p className="text-sm text-gray-600 mb-3">
                  Masih ada pertanyaan? Gunakan sistem deteksi kami untuk analisis lebih lanjut.
                </p>
                <Link
                  href="/form"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cek Gejala Sekarang
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [plotData, setPlotData] = useState<any>(null)
  const [isLoadingPlot, setIsLoadingPlot] = useState<boolean>(true)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  // Hero animation - simple one-shot trigger
  const [hasShot, setHasShot] = useState<boolean>(false)
  const [shootProgress, setShootProgress] = useState<number>(0) // 0 to 1

  // Tips section animation state
  const [tipsVisible, setTipsVisible] = useState<boolean>(false)

  const supabase = createClient()

  // Animation states - crosshair always hunting, shoot on scroll
  const isDodging = true // Always dodging
  const isHunting = true // Crosshair always visible
  const isShot = hasShot && shootProgress > 0.2
  const isFalling = hasShot && shootProgress > 0.4
  const isComplete = hasShot && shootProgress >= 1

  useEffect(() => {
    setIsMounted(true)

    // Get user auth state
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Load heatmap data
    setIsLoadingPlot(true)
    fetch('/heatmap_geo.json')
      .then((response) => response.json())
      .then((data) => {
        setPlotData(data)
        setIsLoadingPlot(false)
      })
      .catch(() => {
        setIsLoadingPlot(false)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Simple shoot animation on first scroll
  useEffect(() => {
    const handleScroll = () => {
      // Trigger shoot on any scroll in hero section
      if (window.scrollY > 10 && !hasShot) {
        setHasShot(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasShot])

  // Animate shoot progress when triggered
  useEffect(() => {
    if (!hasShot) return

    let progress = 0
    const duration = 2000 // 2 seconds for full animation
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(1, elapsed / duration)
      setShootProgress(progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasShot])




  // Tips section fade-in animation with Intersection Observer
  useEffect(() => {
    const tipsSection = document.getElementById('tips-section')
    if (!tipsSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTipsVisible(true)
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px'
      }
    )

    observer.observe(tipsSection)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div>
      <Navbar active="home" />

      <div style={{ top: 0, marginTop: 80 }}>
        <section className="relative bg-white overflow-hidden min-h-screen">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="#dc2626" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-screen-xl px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

              {/* Left Content */}
              <div className="text-left space-y-6 lg:pr-8">
                <div className="inline-flex items-center gap-2 bg-red-100 border border-red-700 px-4 py-2 rounded-full text-red-700 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Deteksi Dini. Akurat. Terpercaya.
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                    <span className="block">Deteksi DBD</span>
                    <span className="block text-red-700">lebih dini!</span>
                  </h1>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Sistem AI canggih untuk membantu deteksi Demam Berdarah Dengue (DBD)
                    lebih dini dengan akurasi tinggi
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-red-700 to-red-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-red-900/20 hover:shadow-red-900/40 hover:from-red-800 hover:to-red-900 transform hover:scale-105 transition-all duration-300"
                    href="/form"
                  >
                    <svg
                      className="w-5 h-5 group-hover:rotate-12 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mulai Pemeriksaan
                  </Link>

                  {user ? (
                    <Link
                      className="group flex items-center justify-center gap-3 bg-white border-2 border-red-300 text-red-700 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transform hover:scale-105 transition-all duration-300"
                      href="/history"
                    >
                      <svg
                        className="w-5 h-5 group-hover:rotate-12 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Lihat Riwayat
                    </Link>
                  ) : (
                    <Link
                      className="group flex items-center justify-center gap-3 bg-white border-2 border-red-300 text-red-700 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transform hover:scale-105 transition-all duration-300"
                      href="/login"
                    >
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Masuk
                    </Link>
                  )}
                </div>

                {/* Additional Links */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <Link
                    href="/articles"
                    className="group flex items-center gap-2 text-gray-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Baca Artikel Terbaru
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {user && (
                    <Link
                      href="/checklist"
                      className="group flex items-center gap-2 text-gray-600 hover:text-red-700 font-medium transition-colors"
                    >
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Misi Mingguan
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}

                  {user && (
                    <Link
                      href="/profile"
                      className="group flex items-center gap-2 text-gray-600 hover:text-red-700 font-medium transition-colors"
                    >
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Misi & Badges
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}

                  <Link
                    href="/about"
                    className="group flex items-center gap-2 text-gray-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pelajari Lebih Lanjut
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">98%</div>
                    <div className="text-gray-500 text-sm">Akurasi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">5 Menit</div>
                    <div className="text-gray-500 text-sm">Hasil Cepat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">24/7</div>
                    <div className="text-gray-500 text-sm">Tersedia</div>
                  </div>
                </div>
              </div>

              {/* Right Illustration - Mosquito & Medical Theme */}
              <div className="relative lg:pl-8">
                <div className="relative">
                  {/* Main Background Circle */}
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-700 rounded-full shadow-xl opacity-10"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-red-400 to-red-700 rounded-full opacity-20"></div>

                    {/* Main Mosquito Illustration - Scroll-triggered Hunt Sequence */}
                    <div className="absolute inset-16 flex items-center justify-center">
                      <style jsx>{`
                        @keyframes mosquito-dodge {
                          0%, 100% { transform: translate(0, 0) rotate(12deg); }
                          25% { transform: translate(15px, -10px) rotate(-5deg); }
                          50% { transform: translate(-20px, 10px) rotate(25deg); }
                          75% { transform: translate(10px, 15px) rotate(0deg); }
                        }

                        @keyframes crosshair-hunt {
                          0%, 100% { transform: translate(0, 0) scale(1); }
                          25% { transform: translate(-15px, 10px) scale(1.05); }
                          50% { transform: translate(20px, -12px) scale(0.95); }
                          75% { transform: translate(-10px, -15px) scale(1.02); }
                        }

                        @keyframes mosquito-fall {
                          0% { transform: translate(0, 0) rotate(12deg); opacity: 1; }
                          50% { transform: translate(0, 150px) rotate(180deg); opacity: 0.5; }
                          100% { transform: translate(0, 300px) rotate(360deg); opacity: 0; }
                        }

                        @keyframes crosshair-lock {
                          0%, 100% { transform: translate(0, 0) scale(1); }
                          50% { transform: translate(0, 0) scale(1.1); }
                        }

                        @keyframes shot-flash {
                          0%, 100% { opacity: 0; }
                          50% { opacity: 1; }
                        }
                      `}</style>

                      {/* Mosquito */}
                      <div
                        style={{
                          animation: isFalling
                            ? 'mosquito-fall 1.5s ease-in forwards'
                            : isDodging
                              ? 'mosquito-dodge 3s ease-in-out infinite'
                              : 'none',
                          transform: !isDodging && !isFalling ? 'rotate(12deg)' : undefined
                        }}
                      >
                        <img
                          src="/mosquito2.png"
                          alt="Mosquito Illustration"
                          className="w-40 h-40 lg:w-68 lg:h-68 object-contain"
                          style={{
                            filter: isShot ? 'brightness(0.5)' : 'none',
                            transition: 'filter 0.3s'
                          }}
                        />
                      </div>

                      {/* Red Crosshair - Appears when hunting */}
                      <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{
                          opacity: isHunting ? 0.9 : 0,
                          animation: isShot
                            ? 'crosshair-lock 0.5s ease-in-out'
                            : isHunting
                              ? 'crosshair-hunt 3s ease-in-out infinite'
                              : 'none',
                          transition: 'opacity 0.5s'
                        }}
                      >
                        <svg className="w-48 h-48 lg:w-72 lg:h-72 text-red-700" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                          {/* Outer circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            strokeWidth={isShot ? "3" : "1.5"}
                            opacity={isShot ? "1" : "0.6"}
                            style={{ transition: 'all 0.3s' }}
                          >
                            {!isShot && <animate attributeName="r" values="45;47;45" dur="2s" repeatCount="indefinite" />}
                          </circle>
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            strokeWidth="1"
                            opacity="0.4"
                          >
                            {!isShot && <animate attributeName="r" values="35;33;35" dur="2s" repeatCount="indefinite" />}
                          </circle>

                          {/* Crosshair lines */}
                          <line x1="50" y1="5" x2="50" y2="25" strokeWidth="2" strokeLinecap="round" opacity={isShot ? "1" : "0.8"}>
                            {!isShot && <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />}
                          </line>
                          <line x1="50" y1="75" x2="50" y2="95" strokeWidth="2" strokeLinecap="round" opacity={isShot ? "1" : "0.8"}>
                            {!isShot && <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />}
                          </line>
                          <line x1="5" y1="50" x2="25" y2="50" strokeWidth="2" strokeLinecap="round" opacity={isShot ? "1" : "0.8"}>
                            {!isShot && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />}
                          </line>
                          <line x1="75" y1="50" x2="95" y2="50" strokeWidth="2" strokeLinecap="round" opacity={isShot ? "1" : "0.8"}>
                            {!isShot && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />}
                          </line>

                          {/* Center dot - RED when shot */}
                          <circle
                            cx="50"
                            cy="50"
                            r={isShot ? "4" : "2"}
                            fill="currentColor"
                            style={{ transition: 'r 0.3s' }}
                          >
                            {!isShot && <animate attributeName="r" values="2;3;2" dur="1s" repeatCount="indefinite" />}
                          </circle>
                        </svg>
                      </div>

                      {/* Shot Flash Effect */}
                      {isShot && !isFalling && (
                        <div
                          className="absolute inset-0 bg-red-700 rounded-full pointer-events-none"
                          style={{
                            animation: 'shot-flash 0.3s ease-out',
                            mixBlendMode: 'screen'
                          }}
                        />
                      )}
                    </div>

                    {/* Medical Icons around mosquito */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-red-400 animate-bounce rotate-125">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        {/* Top half - white */}
                        <path d="M7 14 L7 9 Q7 4 12 4 Q17 4 17 9 L17 14 Z" fill="white" />
                        {/* Bottom half - red */}
                        <path d="M7 14 L7 19 Q7 24 12 24 Q17 24 17 19 L17 14 Z" fill="currentColor" />
                        {/* Dividing line */}
                        <path d="M7 14 L17 14" stroke="currentColor" strokeWidth="1" fill="none" />
                      </svg>
                    </div>

                    {/* Blood drop */}
                    <div className="absolute top-16 right-12 text-red-700 animate-pulse">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C12 2 6 8 6 13C6 16.866 9.134 20 13 20C16.866 20 20 16.866 20 13C20 8 12 2 12 2Z" />
                      </svg>
                    </div>

                    {/* Temperature/thermometer */}
                    <div className="absolute bottom-16 left-12 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="10" y="3" width="4" height="12" rx="2" />
                        <circle cx="12" cy="18" r="4" />
                        <rect x="11" y="5" width="2" height="9" fill="white" opacity="0.3" />
                      </svg>
                    </div>

                    {/* Medical cross */}
                    <div className="absolute bottom-8 right-16 text-red-300 animate-pulse" style={{ animationDelay: '1s' }}>
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H10V10H2V14H10V22H14V14H22V10H14V2Z" />
                      </svg>
                    </div>

                    {/* Virus particle */}
                    <div className="absolute top-20 left-8 text-red-300 animate-bounce" style={{ animationDelay: '1.5s' }}>
                      <div className="relative w-8 h-8 bg-current rounded-full opacity-60">
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-current rounded-full"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-current rounded-full"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-current rounded-full"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-current rounded-full"></div>
                      </div>
                    </div>

                    {/* Heart pulse */}
                    <div className="absolute bottom-20 right-8 text-red-400 animate-pulse" style={{ animationDelay: '2s' }}>
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21L10.55 19.7C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 19.7L12 21Z" />
                      </svg>
                    </div>

                    {/* DNA strand */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-300 animate-spin" style={{ animationDuration: '10s' }}>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="8" cy="4" r="2" />
                        <circle cx="16" cy="8" r="2" />
                        <circle cx="8" cy="12" r="2" />
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="8" cy="20" r="2" />
                        <line x1="8" y1="4" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="16" y1="8" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="8" y1="12" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="16" y1="16" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 left-1/4 text-red-300 animate-float">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>

                  <div className="absolute -right-4 top-1/3 text-red-200 animate-bounce" style={{ animationDelay: '0.7s' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>

                  <div className="absolute -left-6 bottom-1/4 text-red-300 animate-pulse" style={{ animationDelay: '1.3s' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ/Edukasi Section */}
      <FAQCards />

      {/* Quick Tips Cards Section */}
      <section id="tips-section" className="min-h-screen bg-gray-50 flex items-center relative overflow-hidden">
        {/* Parallax Background Layer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tips-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="3" fill="#dc2626" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tips-grid)" />
            </svg>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 py-20 w-full relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Tips Pencegahan DBD
            </h2>
            <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto mb-4">
              Langkah-langkah sederhana untuk melindungi diri dan keluarga dari bahaya Demam Berdarah Dengue
            </p>
            <div className="inline-flex items-center gap-2 bg-red-100 border border-red-700 px-4 py-2 rounded-full text-red-700 text-sm font-medium">
              <span className="font-bold text-base">3M+</span>
              Metode 3M Plus - Cara Terbukti Efektif
            </div>
          </div>

          {/* Animated Cards Container */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            style={{
              transform: tipsVisible ? 'translateY(0)' : 'translateY(50px)',
              opacity: tipsVisible ? 1 : 0,
              transition: 'transform 1s ease-out, opacity 1s ease-out'
            }}
          >
            {tipsData.map((tip, index) => (
              <TipsCard
                key={index}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
                footerText={tip.footerText}
              />
            ))}
          </div>

          {/* Additional Information Section */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
            style={{
              transform: tipsVisible ? 'translateY(0)' : 'translateY(70px)',
              opacity: tipsVisible ? 1 : 0,
              transitionDelay: tipsVisible ? '300ms' : '0ms'
            }}
          >
            {/* Gejala DBD */}
            <TipsDetailCard
              icon={
                <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50,12.5c-20.712,0-37.5,16.793-37.5,37.502C12.5,70.712,29.288,87.5,50,87.5c20.712,0,37.5-16.788,37.5-37.498C87.5,29.293,70.712,12.5,50,12.5z M53.826,70.86c0,0.72-0.584,1.304-1.304,1.304h-5.044c-0.72,0-1.304-0.583-1.304-1.304V46.642c0-0.72,0.584-1.304,1.304-1.304h5.044c0.72,0,1.304,0.583,1.304,1.304V70.86z M49.969,39.933c-2.47,0-4.518-2.048-4.518-4.579c0-2.53,2.048-4.518,4.518-4.518c2.531,0,4.579,1.987,4.579,4.518C54.549,37.885,52.5,39.933,49.969,39.933z" />
                </svg>
              }
              title="Waspadai Gejala DBD"
              items={gejalaItems}
              variant="red"
            />

            {/* Kapan Harus ke Dokter */}
            <TipsDetailCard
              icon={
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 16 16">
                  <path clipRule="evenodd" d="M13 1H3V5H0V15H16V5H13V1ZM7 6V8H5V10H7V12H9V10H11V8H9V6H7Z" fillRule="evenodd" />
                </svg>
              }
              title="Segera ke Dokter Jika"
              items={dokterItems}
              variant="yellow"
            />
          </div>


        </div>
      </section>

      {/* Peta Sebaran DBD Section */}
      <section className="min-h-screen relative z-0 flex items-center bg-white"
        style={{ backgroundColor: '#fafafa' }}>
        <div className="mx-auto max-w-screen-xl px-4 py-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Peta Sebaran DBD di Indonesia
            </h2>
            <p className="text-gray-600">
              Visualisasi data kasus DBD berdasarkan lokasi geografis
            </p>
          </div>

          <div
            id="chart"
            className="chart mx-auto w-full bg-white rounded-lg shadow-lg p-6"
            style={{ minHeight: 600, height: 600, width: '100%' }}
          >
            {isLoadingPlot && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
                  <p className="text-gray-500">Memuat peta Indonesia...</p>
                </div>
              </div>
            )}
            {!isLoadingPlot && !plotData && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg className="w-16 h-16 text-red-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-red-700 font-medium">Gagal memuat data peta</p>
                  <p className="text-gray-500 text-sm mt-2">Silakan refresh halaman atau coba lagi nanti</p>
                </div>
              </div>
            )}
            {!isLoadingPlot && plotData && isMounted && (
              <MapTilerMap
                data={plotData.data}
                layout={plotData.layout}
              />
            )}
          </div>
        </div>
      </section>

      {/* Section: Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform komprehensif untuk deteksi, pencegahan, dan edukasi DBD dengan teknologi AI dan gamifikasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 - AI Detection */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Deteksi AI
              </h3>
              <p className="text-gray-600 text-sm">
                Algoritma machine learning untuk prediksi DBD akurat berdasarkan gejala
              </p>
            </div>

            {/* Feature 2 - Weekly Missions */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Misi Mingguan
              </h3>
              <p className="text-gray-600 text-sm">
                Checklist interaktif pencegahan DBD dengan tracking progress dan reward
              </p>
            </div>

            {/* Feature 3 - Achievement System */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Sistem Badges
              </h3>
              <p className="text-gray-600 text-sm">
                Kumpulkan badges untuk konsistensi pencegahan dan pencapaian milestone
              </p>
            </div>

            {/* Feature 4 - News Aggregator */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Berita Terkini
              </h3>
              <p className="text-gray-600 text-sm">
                Update berita dan informasi terbaru seputar DBD dari berbagai sumber
              </p>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Feature 5 - Data Visualization */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Peta Sebaran
              </h3>
              <p className="text-gray-600">
                Visualisasi interaktif sebaran kasus DBD di Indonesia dengan teknologi heatmap
              </p>
            </div>

            {/* Feature 6 - History Tracking */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Riwayat Lengkap
              </h3>
              <p className="text-gray-600">
                Tracking pemeriksaan dan progress pencegahan dengan analytics mendalam
              </p>
            </div>

            {/* Feature 7 - Educational Content */}
            <div className="text-center p-6 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-red-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Edukasi Interaktif
              </h3>
              <p className="text-gray-600">
                FAQ komprehensif dan tips pencegahan DBD dengan format yang mudah dipahami
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: CTA */}
      <section
        className="py-16 text-white bg-right bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(to right, #780606 20%, rgba(120, 6, 6, 0.8) 50%, rgba(120, 6, 6, 0) 100%), url('/magnifying_glass.jpg')`,
          minHeight: '50vh',
        }}
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl mb-4">
              Deteksi DBD Sejak Dini
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Jangan tunggu sampai terlambat. Lakukan pemeriksaan sekarang dan dapatkan hasil prediksi instan!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/form"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900 shadow-lg shadow-red-900/20 hover:shadow-red-900/40 hover:scale-[1.02] transition-all duration-200"
              >
                <svg
                  className="mr-2 -ml-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Mulai Pemeriksaan
              </Link>
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-x-2 items-center rounded border-2 border-white px-8 py-4 text-sm font-medium text-white hover:bg-white hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
