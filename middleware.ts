import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware temporarily disabled - using client-side protection
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}