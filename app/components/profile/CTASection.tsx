'use client'

import Link from 'next/link'

export default function CTASection() {
    return (
        <div className="mt-12 bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 border border-red-200 text-center">
            <h3 className="text-2xl font-bold text-red-900 mb-4">
                Raih Badge Selanjutnya! 🎯
            </h3>
            <p className="text-red-800 mb-6">
                Lakukan checklist pencegahan secara konsisten untuk membuka badge baru dan meningkatkan level pencegahan DBD Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/checklist"
                    className="bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
                >
                    Lanjutkan Misi
                </Link>
                <Link
                    href="/history"
                    className="bg-white border border-red-300 text-red-700 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                    Lihat Riwayat
                </Link>
            </div>
        </div>
    )
}
