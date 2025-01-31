import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

export async function middleware(request: NextRequest) {

  const url = request.nextUrl.clone()

  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/signin', url))
  }

  const response = NextResponse.next();

  return response
}

export const config = {
  matcher: ['/posts/:path*', '/people', '/users/:path*', '/saved', '/explore', '/flicks', '/chats',]
  // matcher: ['/posts/:path*', '/people', '/users/:path*', '/saved', '/explore', '/flicks', '/chats', '/create',]
}