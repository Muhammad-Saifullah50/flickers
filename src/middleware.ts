import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

export async function middleware(request: NextRequest) {

  const url = request.nextUrl.clone()

  const session = await auth();
  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)

  if (!session?.user) {
    return NextResponse.redirect(new URL(`/signin?callbackUrl=${url}`, url))
  }
  

  const response = NextResponse.next({headers});

  return response
}

export const config = {

  matcher: ['/posts/:path*','/post-modal/:path*', '/people', '/users/:path*', '/saved', '/explore', '/flicks', '/chats', '/create','/settings']
}