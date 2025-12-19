import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adId, publisherSite, pageType } = body

    if (!adId) {
      return NextResponse.json({ 
        error: 'Advertisement ID is required',
        success: false 
      }, { status: 400 })
    }

    // Get the advertisement details
    const { data: advertisement, error } = await supabase
      .from('advertisements')
      .select('*')
      .eq('id', adId)
      .eq('is_active', true)
      .single()

    if (error || !advertisement) {
      console.error('Error fetching advertisement:', error)
      return NextResponse.json({ 
        error: 'Advertisement not found or inactive',
        success: false 
      }, { status: 404 })
    }

    // Store click data in database
    const { error: clickError } = await supabase
      .from('ad_clicks')
      .insert({
        ad_id: adId,
        publisher_site: publisherSite,
        referrer_url: request.headers.get('referer'),
        user_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent'),
        page_type: pageType
      })

    if (clickError) {
      console.error('Error storing click data:', clickError)
    }

    return NextResponse.json({
      success: true,
      message: 'Click tracked successfully',
      redirectUrl: advertisement.link_url,
      adDetails: {
        id: advertisement.id,
        title: advertisement.title,
        category: advertisement.category
      }
    })

  } catch (error) {
    console.error('Error in POST /api/ads/click:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      success: false 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const adId = searchParams.get('adId')
    const publisherSite = searchParams.get('publisherSite')

    if (!adId) {
      return NextResponse.json({ 
        error: 'Advertisement ID is required',
        success: false 
      }, { status: 400 })
    }

    // Get the advertisement and redirect
    const { data: advertisement, error } = await supabase
      .from('advertisements')
      .select('link_url, title, category')
      .eq('id', adId)
      .eq('is_active', true)
      .single()

    if (error || !advertisement) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Store click data in database
    await supabase
      .from('ad_clicks')
      .insert({
        ad_id: parseInt(adId),
        publisher_site: publisherSite,
        referrer_url: request.headers.get('referer'),
        user_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent')
      })

    // Redirect to the advertisement URL
    return NextResponse.redirect(advertisement.link_url)

  } catch (error) {
    console.error('Error in GET /api/ads/click:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}