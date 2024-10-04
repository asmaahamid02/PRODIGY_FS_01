import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(function middleware(req: NextRequestWithAuth) {
  // If the user is not authenticated, redirect to the login page
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl
  // console.log('middleware req', req)

  // Allow access to /update-role without redirection
  if (pathname === '/update-role') {
    return NextResponse.next()
  }

  // If the user is authenticated but doesn't have a role, redirect to /update-role
  if (req.nextauth.token && !req.nextauth.token?.user?.role) {
    url.pathname = '/update-role'
    return NextResponse.rewrite(url)
  }

  if (!req.nextauth.token) {
    url.pathname = '/auth/login?callbackUrl=' + pathname
    return NextResponse.rewrite(url)
  }
  const role = req.nextauth.token?.user?.role

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
    '/',
    '/admin/:path*',
    '/instructor/:path*',
    '/student/:path*',
    '/unauthorized',
    '/update-role',
  ],
}
