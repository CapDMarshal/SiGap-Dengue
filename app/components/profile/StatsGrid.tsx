'use client'

interface UserProfile {
    totalWeeks: number
    perfectWeeks: number
    currentStreak: number
    longestStreak: number
    averageCompletion: number
    totalBadges: number
    lastActivity: string
}

interface StatsGridProps {
    stats: UserProfile | null
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-red-700">{stats?.totalWeeks || 0}</div>
                    <div className="text-sm text-gray-600">Total Minggu</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats?.perfectWeeks || 0}</div>
                    <div className="text-sm text-gray-600">Minggu Sempurna</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats?.currentStreak || 0}</div>
                    <div className="text-sm text-gray-600">Streak Saat Ini</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats?.totalBadges || 0}</div>
                    <div className="text-sm text-gray-600">Total Badges</div>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistik Pencegahan</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Rata-rata Completion</h3>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div
                                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                                style={{ width: `${stats?.averageCompletion || 0}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600">{stats?.averageCompletion || 0}%</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Streak Terpanjang</h3>
                        <p className="text-3xl font-bold text-orange-600">{stats?.longestStreak || 0}</p>
                        <p className="text-sm text-gray-600">minggu berturut-turut</p>
                    </div>
                </div>
            </div>
        </>
    )
}
