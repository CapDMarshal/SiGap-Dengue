'use client'

interface Badge {
    id: string
    name: string
    description: string
    icon: string
    color: string
    category: 'consistency' | 'completion' | 'streak' | 'milestone'
    requirement: string
    isEarned: boolean
    earnedAt?: string
    progress?: {
        current: number
        target: number
    }
}

interface BadgeCardProps {
    badge: Badge
    getCategoryColor: (category: string) => string
}

export default function BadgeCard({ badge, getCategoryColor }: BadgeCardProps) {
    return (
        <div
            className={`relative bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${badge.isEarned
                    ? 'border-green-200 bg-gradient-to-br from-green-50 to-white'
                    : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white opacity-75'
                }`}
        >
            {/* Badge Icon */}
            <div className={`h-32 flex items-center justify-center bg-gradient-to-r ${badge.color}`}>
                <div className="text-6xl">{badge.icon}</div>
                {badge.isEarned && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        ✓
                    </div>
                )}
            </div>

            {/* Badge Content */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(badge.category)}`}>
                        {badge.category.charAt(0).toUpperCase() + badge.category.slice(1)}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {badge.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                    {badge.description}
                </p>

                <div className="text-xs text-gray-500 mb-3">
                    Syarat: {badge.requirement}
                </div>

                {/* Progress Bar untuk badge yang belum earned */}
                {!badge.isEarned && badge.progress && (
                    <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{badge.progress.current}/{badge.progress.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min((badge.progress.current / badge.progress.target) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {badge.isEarned && badge.earnedAt && (
                    <div className="text-xs text-green-600 font-medium">
                        Diraih: {new Date(badge.earnedAt).toLocaleDateString('id-ID')}
                    </div>
                )}

                {!badge.isEarned && (
                    <div className="text-xs text-gray-500">
                        Belum tercapai
                    </div>
                )}
            </div>
        </div>
    )
}
