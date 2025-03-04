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

  matcher: [ '/people', '/users/:path*', '/saved', '/explore', '/chats/:path*', '/create','/settings']
}