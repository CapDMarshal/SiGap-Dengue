'use client'

import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { createClient } from '../utils/supabase/client'
import { User } from '@supabase/supabase-js'

// Import new home components
import HeroSection from './components/home/HeroSection'
import FAQSection from './components/home/FAQSection'
import PreventionTipsSection from './components/home/PreventionTipsSection'
import MapSection from './components/home/MapSection'
import FeaturesSection from './components/home/FeaturesSection'
import CTASection from './components/home/CTASection'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get user auth state
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }
    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <div>
      <Navbar active="home" />

      {/* Hero Section */}
      <HeroSection user={user} isLoading={isLoading} />

      {/* FAQ/Edukasi Section */}
      <FAQSection />

      {/* Quick Tips Cards Section */}
      <PreventionTipsSection />

      {/* Peta Sebaran DBD Section */}
      <MapSection />

      {/* Section: Features */}
      <FeaturesSection />

      {/* Section: CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
