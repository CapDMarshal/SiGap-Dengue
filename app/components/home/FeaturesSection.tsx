'use client'

export default function FeaturesSection() {
    return (
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
    )
}
