import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(function middleware(req: NextRequestWithAuth) {
  // If the user is not authenticated, redirect to the login page
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl

  if (!req.nextauth.token) {
    url.pathname = '/auth/login?callbackUrl=' + pathname
    return NextResponse.rewrite(url)
  }
  const { role } = req.nextauth.token.user

  if (!role && pathname !== '/update-role') {
    url.pathname = '/update-role'
    return NextResponse.rewrite(url)
  }

  //admin page access control
  if (pathname.startsWith('/admin') && role !== 'admin') {
    url.pathname = '/unauthorized'
    return NextResponse.rewrite(url)
  }

  //instructor page access control
  if (pathname.startsWith('/instructor') && role !== 'instructor') {
    url.pathname = '/unauthorized'
    return NextResponse.rewrite(url)
  }

  //student page access control
  if (pathname.startsWith('/student') && role !== 'student') {
    url.pathname = '/unauthorized'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/instructor/:path*',
    '/student/:path*',
    '/courses/:path*',
    '/users/:path*',
    '/unauthorized',
    '/update-role',
  ],
}
