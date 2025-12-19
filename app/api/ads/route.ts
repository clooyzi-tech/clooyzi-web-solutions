import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract request parameters
    const category = searchParams.get('category')?.toLowerCase()
    const pageType = searchParams.get('pageType')
    const publisherSite = searchParams.get('publisherSite')
    const limit = parseInt(searchParams.get('limit') || '1')

    // Log the ad request for analytics
    console.log('Ad Request:', {
      category,
      pageType,
      publisherSite,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer')
    })

    // Build query filters
    let query = supabase
      .from('advertisements')
      .select('*')
      .eq('is_active', true) // Only active ads

    // Filter by category if provided
    if (category) {
      const validCategories = ['tech', 'fashion', 'education', 'business', 'health', 'entertainment', 'other']
      if (validCategories.includes(category)) {
        query = query.eq('category', category)
      }
    }

    // Apply serving rules and ordering
    query = query
      .order('created_at', { ascending: false }) // Newest first
      .limit(limit)

    const { data: advertisements, error } = await query

    if (error) {
      console.error('Error fetching ads:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch advertisements',
        success: false 
      }, { status: 500 })
    }

    // If no ads found, return empty response
    if (!advertisements || advertisements.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No advertisements available',
        ads: [],
        meta: {
          category,
          pageType,
          publisherSite,
          count: 0
        }
      })
    }

    // Select random ad from available ads (simple serving algorithm)
    const selectedAd = advertisements[Math.floor(Math.random() * advertisements.length)]

    // Track ad impression (you can extend this for analytics)
    console.log('Ad Served:', {
      adId: selectedAd.id,
      title: selectedAd.title,
      category: selectedAd.category,
      publisherSite,
      timestamp: new Date().toISOString()
    })

    // Return the selected advertisement
    return NextResponse.json({
      success: true,
      message: 'Advertisement served successfully',
      ads: [selectedAd],
      meta: {
        category,
        pageType,
        publisherSite,
        count: 1,
        totalAvailable: advertisements.length
      }
    })

  } catch (error) {
    console.error('Error in GET /api/ads:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      success: false 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, pageType, publisherSite, limit = 1 } = body

    // Same logic as GET but with POST body parameters
    console.log('Ad Request (POST):', {
      category,
      pageType,
      publisherSite,
      limit,
      timestamp: new Date().toISOString()
    })

    let query = supabase
      .from('advertisements')
      .select('*')
      .eq('is_active', true)

    if (category) {
      const validCategories = ['tech', 'fashion', 'education', 'business', 'health', 'entertainment', 'other']
      if (validCategories.includes(category.toLowerCase())) {
        query = query.eq('category', category.toLowerCase())
      }
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(Math.min(limit, 10)) // Max 10 ads per request

    const { data: advertisements, error } = await query

    if (error) {
      console.error('Error fetching ads:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch advertisements',
        success: false 
      }, { status: 500 })
    }

    if (!advertisements || advertisements.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No advertisements available',
        ads: [],
        meta: { category, pageType, publisherSite, count: 0 }
      })
    }

    // Return multiple ads or single random ad
    const selectedAds = limit === 1 
      ? [advertisements[Math.floor(Math.random() * advertisements.length)]]
      : advertisements.sort(() => 0.5 - Math.random()).slice(0, limit)

    return NextResponse.json({
      success: true,
      message: 'Advertisements served successfully',
      ads: selectedAds,
      meta: {
        category,
        pageType,
        publisherSite,
        count: selectedAds.length,
        totalAvailable: advertisements.length
      }
    })

  } catch (error) {
    console.error('Error in POST /api/ads:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      success: false 
    }, { status: 500 })
  }
}