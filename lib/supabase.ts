import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Work = {
  id: number
  title: string
  description: string
  image_url: string
  project_link: string
  created_at: string
}

export type AdminUser = {
  id: number
  email: string
  password_hash: string
  created_at: string
}