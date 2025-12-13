'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormGejalaUtama from './FormGejalaUtama'
import FormGejalaTambahan from './FormGejalaTambahan'
import FormUjiLab from './FormUjiLab'

export default function Step2Container() {
    const router = useRouter()

    // Form state
    const [formData, setFormData] = useState({
        KDEMA: 'Tidak',
        DDEMA: 1,
        SUHUN: 38.2,
        ULABO: 'Belum',
        JWBCS: 6.0,
        HEMOG: 14.0,
        HEMAT: 40,
        JPLAT: 150,
        SKPLA: 'Tidak',
        NYMAT: 'Tidak',
        NYSEN: 'Tidak',
        RSMUL: 'Tidak',
        HINFM: 'Tidak',
        NYPER: 'Tidak',
        MUMUN: 'Tidak',
        MDIAR: 'Tidak',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Store form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData))

        // Navigate to result
        router.push('/result')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-6 px-4 lg:px-16 my-6"
        >
            {/* Form Gejala Utama */}
            <FormGejalaUtama formData={formData} setFormData={setFormData} />

            {/* Form Gejala Tambahan */}
            <FormGejalaTambahan formData={formData} setFormData={setFormData} />

            {/* Form Uji Lab */}
            <FormUjiLab formData={formData} setFormData={setFormData} />

            <button
                type="submit"
                className="flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-medium text-white bg-red-700 border border-transparent rounded-md shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="m16 16-1.9-1.9" />
                </svg>
                <span className="text-nowrap">Periksa</span>
            </button>
        </form>
    )
}
