import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: advertisements, error } = await supabase
      .from('advertisements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching advertisements:', error)
      return NextResponse.json({ error: 'Failed to fetch advertisements' }, { status: 500 })
    }

    return NextResponse.json(advertisements)
  } catch (error) {
    console.error('Error in GET /api/admin/advertisements:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, link_url, category, is_active = true } = body

    // Validate required fields
    if (!title || !description || !image_url || !link_url || !category) {
      return NextResponse.json({ 
        error: 'Missing required fields', 
        required: ['title', 'description', 'image_url', 'link_url', 'category']
      }, { status: 400 })
    }

    // Validate field lengths
    if (title.length > 255) {
      return NextResponse.json({ error: 'Title must be less than 255 characters' }, { status: 400 })
    }

    if (description.length > 1000) {
      return NextResponse.json({ error: 'Description must be less than 1000 characters' }, { status: 400 })
    }

    // Validate URL format (allow base64 data URLs for images)
    const isValidImageUrl = image_url.startsWith('data:image/') || image_url.startsWith('http://') || image_url.startsWith('https://')
    if (!isValidImageUrl) {
      return NextResponse.json({ error: 'Invalid image URL format' }, { status: 400 })
    }

    // Basic URL validation - just check it's not empty and has some basic structure
    if (!link_url.trim() || link_url.trim().length < 3) {
      return NextResponse.json({ error: 'Link URL is required and must be at least 3 characters' }, { status: 400 })
    }

    // Validate category
    const validCategories = ['tech', 'fashion', 'education', 'business', 'health', 'entertainment', 'other']
    if (!validCategories.includes(category.toLowerCase())) {
      return NextResponse.json({ 
        error: 'Invalid category', 
        validCategories 
      }, { status: 400 })
    }

    const { data: advertisement, error } = await supabase
      .from('advertisements')
      .insert([{
        title: title.trim(),
        description: description.trim(),
        image_url: image_url.trim(),
        link_url: link_url.trim(),
        category: category.toLowerCase(),
        is_active
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating advertisement:', error)
      return NextResponse.json({ error: 'Failed to create advertisement' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Advertisement created successfully',
      data: advertisement
    }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/advertisements:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}