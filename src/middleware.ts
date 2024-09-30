import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const authRoutes = ['/auth/login', '/auth/register']
// export default withAuth(function middleware(req: NextRequestWithAuth) {
//   // If the user is not authenticated, redirect to the login page
//   if (!req.nextauth) {
//     const url = req.nextUrl.clone()
//     url.pathname = '/auth/login?callbackUrl=' + req.nextUrl.pathname
//     return NextResponse.rewrite(url)
//   }

//   // If the user is authenticated, redirect to the home page
//   if (req.nextauth && authRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.redirect('/')
//   }

//   return NextResponse.next()
// })

export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/admin/:path*',
    '/instructor/:path*',
    '/student/:path*',
    '/courses/:path*',
    '/users/:path*',
  ],
}
