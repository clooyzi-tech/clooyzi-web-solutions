import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json()
    const { title, description, image_url, link_url, category, is_active } = body
    const { id } = await params

    // Validate required fields if provided
    if (title && title.length > 255) {
      return NextResponse.json({ error: 'Title must be less than 255 characters' }, { status: 400 })
    }

    if (description && description.length > 1000) {
      return NextResponse.json({ error: 'Description must be less than 1000 characters' }, { status: 400 })
    }

    // Validate URLs if provided (allow base64 data URLs for images)
    if (image_url) {
      const isValidImageUrl = image_url.startsWith('data:image/') || image_url.startsWith('http://') || image_url.startsWith('https://')
      if (!isValidImageUrl) {
        return NextResponse.json({ error: 'Invalid image URL format' }, { status: 400 })
      }
    }

    if (link_url && (!link_url.trim() || link_url.trim().length < 3)) {
      return NextResponse.json({ error: 'Link URL must be at least 3 characters' }, { status: 400 })
    }

    // Validate category if provided
    if (category) {
      const validCategories = ['tech', 'fashion', 'education', 'business', 'health', 'entertainment', 'other']
      if (!validCategories.includes(category.toLowerCase())) {
        return NextResponse.json({ 
          error: 'Invalid category', 
          validCategories 
        }, { status: 400 })
      }
    }

    // Check if this is a status-only update (activate/deactivate)
    const isStatusOnlyUpdate = typeof is_active === 'boolean' && !title && !description && !image_url && !link_url && !category
    
    if (isStatusOnlyUpdate) {
      // Status-only update
      const { data: advertisement, error } = await supabase
        .from('advertisements')
        .update({ is_active })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating advertisement status:', error)
        return NextResponse.json({ 
          error: 'Failed to update advertisement status', 
          details: error.message,
          code: error.code 
        }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Advertisement status updated successfully',
        data: advertisement
      })
    }

    // Full update - require all fields
    if (!title || !description || !image_url || !link_url || !category) {
      return NextResponse.json({ 
        error: 'All fields are required for full update', 
        required: ['title', 'description', 'image_url', 'link_url', 'category']
      }, { status: 400 })
    }

    const { data: advertisement, error } = await supabase
      .from('advertisements')
      .update({
        title: title.trim(),
        description: description.trim(),
        image_url: image_url.trim(),
        link_url: link_url.trim(),
        category: category.toLowerCase(),
        is_active: is_active !== undefined ? is_active : true
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating advertisement:', error)
      return NextResponse.json({ 
        error: 'Failed to update advertisement', 
        details: error.message,
        code: error.code 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Advertisement updated successfully',
      data: advertisement
    })
  } catch (error) {
    console.error('Error in PUT /api/admin/advertisements/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const { error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting advertisement:', error)
      return NextResponse.json({ error: 'Failed to delete advertisement' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Advertisement deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/admin/advertisements/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}