import { NextRequest, NextResponse } from 'next/server'

const TARGET_URL = process.env.TARGET_URL

if (!TARGET_URL) {
  console.error('TARGET_URL environment variable is not set')
}

export async function middleware(request: NextRequest) {
  // Skip middleware for static assets and Next.js internal routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If TARGET_URL is not configured, show error page
  if (!TARGET_URL) {
    return NextResponse.rewrite(new URL('/error', request.url))
  }

  try {
    // Build the target URL
    const targetUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, TARGET_URL)

    // Forward the request
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: {
        // Forward important headers
        'Content-Type': request.headers.get('Content-Type') || '',
        'Authorization': request.headers.get('Authorization') || '',
        'Cookie': request.headers.get('Cookie') || '',
        'User-Agent': request.headers.get('User-Agent') || '',
        'Accept': request.headers.get('Accept') || '',
        'Accept-Language': request.headers.get('Accept-Language') || '',
      },
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
      redirect: 'manual',
    })

    // Create response with forwarded headers
    const newResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        // Forward important response headers
        'Content-Type': response.headers.get('Content-Type') || '',
        'Cache-Control': response.headers.get('Cache-Control') || '',
        'Set-Cookie': response.headers.get('Set-Cookie') || '',
      },
    })

    return newResponse
  } catch (error) {
    console.error('Proxy error:', error)
    // On error, show the error page
    return NextResponse.rewrite(new URL('/error', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
