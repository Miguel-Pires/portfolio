import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return null
  return createClient(url, key)
}

export const supabase = getSupabase()!

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  image_url: string
  created_at: string
}
