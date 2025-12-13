import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Debug logging
  console.log('=== SUPABASE CLIENT DEBUG ===')
  console.log('Supabase URL exists:', !!supabaseUrl)
  console.log('Supabase URL value:', supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'MISSING')
  console.log('Supabase Anon Key exists:', !!supabaseAnonKey)
  console.log('Supabase Anon Key value:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'MISSING')
  console.log('All env vars:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC')))
  console.log('===========================')

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
    console.error('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing')
    throw new Error('Missing Supabase environment variables. Please check your .env.local or Vercel environment variables.')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
