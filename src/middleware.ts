import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Create a response and a Supabase client that shares the session cookie
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Auth condition
    const isAuth = request.nextUrl.pathname.startsWith('/auth')
    const isCallback = request.nextUrl.pathname.startsWith('/auth/callback')

    // Handle callback route specially
    if (isCallback) {
      return res
    }

    // If user is signed in and tries to access auth pages, redirect to dashboard
    if (user && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If user is not signed in and tries to access protected pages, redirect to login
    if (!user && !isAuth) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return res
  } catch (e) {
    // If there's an error, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
