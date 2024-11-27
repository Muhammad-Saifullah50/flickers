import Heading from '@/components/Heading'
import PostForm from '@/components/PostForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const CreatePostPage = async () => {

  const session = await auth()

  if (!session?.user) return redirect('/signin')
    
  return (
    <section>
        <Heading text='Create a Post' icon='/icons/create-white.svg' />

        <PostForm/>
    </section>
  )
}

export default CreatePostPage
