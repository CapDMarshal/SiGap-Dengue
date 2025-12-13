import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
    console.error('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing')
    throw new Error('Missing Supabase environment variables. Please check your .env.local or Vercel environment variables.')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
