import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json([])

  const sb = createClient(url, key)
  const { data } = await sb.from('certificates').select('*').order('created_at', { ascending: false })
  return NextResponse.json(data ?? [])
}
