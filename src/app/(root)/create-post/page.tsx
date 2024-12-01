import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import PostForm from '@/components/PostForm'
import Heading from '@/components/Heading'
import { getCurrentUserFromDb } from '@/actions/user.actions'

export default async function CreatePost() {

  const user = await getCurrentUserFromDb();

  return (
    <section>
        <Heading text='Create a Post' icon='/icons/create-white.svg' />
        <PostForm user={user}/>
    </section>
  )
}
