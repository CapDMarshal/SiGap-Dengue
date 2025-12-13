'use client'

import { User } from '@supabase/supabase-js'

interface ProfileHeaderProps {
    user: User
    userProfile: any
}

export default function ProfileHeader({ user, userProfile }: ProfileHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                        {userProfile?.full_name?.[0]?.toUpperCase() ||
                            user?.user_metadata?.full_name?.[0]?.toUpperCase() ||
                            user?.user_metadata?.name?.[0]?.toUpperCase() ||
                            user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {userProfile?.full_name ||
                                user?.user_metadata?.full_name ||
                                user?.user_metadata?.name ||
                                user.email?.split('@')[0] ||
                                'User'}
                        </h1>
                        <p className="text-red-100">
                            {user.email}
                        </p>
                        <p className="text-red-100 text-sm">
                            Bergabung sejak: {new Date(user.created_at || '').toLocaleDateString('id-ID')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
