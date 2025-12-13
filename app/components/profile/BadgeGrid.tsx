'use client'

import { useState } from 'react'
import BadgeCard from './BadgeCard'

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

interface BadgeGridProps {
    badges: Badge[]
    getCategoryColor: (category: string) => string
}

export default function BadgeGrid({ badges, getCategoryColor }: BadgeGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const filteredBadges = selectedCategory === 'all'
        ? badges
        : badges.filter(badge => badge.category === selectedCategory)

    return (
        <>
            {/* Badge Categories Filter */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Koleksi Badges</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { key: 'all', label: 'Semua', count: badges.length },
                        { key: 'consistency', label: 'Konsistensi', count: badges.filter(b => b.category === 'consistency').length },
                        { key: 'streak', label: 'Perfect Streak', count: badges.filter(b => b.category === 'streak').length },
                        { key: 'completion', label: 'Pencapaian', count: badges.filter(b => b.category === 'completion').length },
                        { key: 'milestone', label: 'Milestone', count: badges.filter(b => b.category === 'milestone').length }
                    ].map((category) => (
                        <button
                            key={category.key}
                            onClick={() => setSelectedCategory(category.key)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.key
                                    ? 'bg-red-700 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-red-50'
                                }`}
                        >
                            {category.label} ({category.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBadges.map((badge) => (
                    <BadgeCard
                        key={badge.id}
                        badge={badge}
                        getCategoryColor={getCategoryColor}
                    />
                ))}
            </div>
        </>
    )
}
