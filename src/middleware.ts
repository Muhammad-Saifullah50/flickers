import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

export async function middleware(request: NextRequest) {

  const url = request.nextUrl.clone()

  const session = await auth();


  if (!session?.user) {
    return NextResponse.redirect(new URL(`/signin?callbackUrl=${url}`, url))
  }
  

  const response = NextResponse.next();

  return response
}

export const config = {

  matcher: ['/posts/:path*','/post-modal/:path*', '/people', '/users/:path*', '/saved', '/explore', '/flicks', '/chats/:path*', '/create','/settings']
}