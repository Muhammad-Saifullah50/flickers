import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import PostForm from '@/components/PostForm'
import Heading from '@/components/Heading'
import { getCurrentUserFromDb } from '@/actions/user.actions'

export default async function CreatePost() {
  const session = await auth()

  if (!session?.user) return redirect('/signin')
  
  const user = await getCurrentUserFromDb(session.user.email!);

  return (
    <section>
        <Heading text='Create a Post' icon='/icons/create-white.svg' />
        <PostForm user={user}/>
    </section>
  )
}
