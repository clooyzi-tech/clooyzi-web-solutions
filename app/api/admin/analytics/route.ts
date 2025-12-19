import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reportType = searchParams.get('type') || 'overview'

    switch (reportType) {
      case 'overview':
        return getOverviewAnalytics()
      case 'ads':
        return getAdPerformance()
      case 'publishers':
        return getPublisherAnalytics()
      case 'categories':
        return getCategoryAnalytics()
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function getOverviewAnalytics() {
  const { data: totalClicks } = await supabase
    .from('ad_clicks')
    .select('id', { count: 'exact' })

  const { data: totalAds } = await supabase
    .from('advertisements')
    .select('id', { count: 'exact' })

  const { data: activeAds } = await supabase
    .from('advertisements')
    .select('id', { count: 'exact' })
    .eq('is_active', true)

  return NextResponse.json({
    totalClicks: totalClicks?.length || 0,
    totalAds: totalAds?.length || 0,
    activeAds: activeAds?.length || 0
  })
}

async function getAdPerformance() {
  const { data } = await supabase
    .from('ad_clicks')
    .select(`
      ad_id,
      advertisements!inner(title, category),
      count
    `)
    .order('count', { ascending: false })

  return NextResponse.json({ adPerformance: data || [] })
}

async function getPublisherAnalytics() {
  const { data } = await supabase
    .from('ad_clicks')
    .select('publisher_site')
    .order('publisher_site')

  const publisherStats = data?.reduce((acc: Record<string, number>, click) => {
    acc[click.publisher_site] = (acc[click.publisher_site] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return NextResponse.json({ publisherStats: publisherStats || {} })
}

async function getCategoryAnalytics() {
  const { data } = await supabase
    .from('ad_clicks')
    .select(`
      advertisements!inner(category),
      count
    `)

  const categoryStats = data?.reduce((acc: Record<string, number>, click: any) => {
    const category = click.advertisements?.category
    if (category) {
      acc[category] = (acc[category] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return NextResponse.json({ categoryStats: categoryStats || {} })
}