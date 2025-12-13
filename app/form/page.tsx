'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'
import Stepper from '../components/Stepper'
import Step1Landing from '../components/form/Step1Landing'
import Step2Container from '../components/form/Step2Container'

function FormContent() {
  const searchParams = useSearchParams()
  const step = parseInt(searchParams.get('step') || '0')

  return (
    <div>
      <Navbar active="form" />
      <div style={{ top: 0, marginTop: 80 }}>
        <Stepper active={step} />
      </div>

      {step === 0 && <Step1Landing />}
      {step === 1 && <Step2Container />}
    </div>
  )
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormContent />
    </Suspense>
  )
}
