import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
 
export async function middleware(request: NextRequest) {

    const url = request.nextUrl.clone()

  const session = await auth();

  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname)

  if (!session?.user) {
    return NextResponse.redirect(new URL('/signin', url))
  }
 
  return NextResponse.next({headers});
}
 
export const config = {
  matcher: ['/posts/:path*','/people', '/users/:path*','/saved', '/explore', '/flicks', '/chats', '/create-post',  ]
}