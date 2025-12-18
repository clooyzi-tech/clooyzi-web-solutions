import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
    }

    // Get OTP from database
    const { data: storedData, error: dbError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .single()

    if (dbError || !storedData) {
      return NextResponse.json({ error: 'OTP not found or expired' }, { status: 400 })
    }

    // Check if OTP expired
    if (new Date() > new Date(storedData.expires_at)) {
      await supabase.from('otp_verifications').delete().eq('email', email)
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    // OTP verified successfully, remove from database
    await supabase.from('otp_verifications').delete().eq('email', email)

    return NextResponse.json({ success: true, message: 'Email verified successfully' })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}