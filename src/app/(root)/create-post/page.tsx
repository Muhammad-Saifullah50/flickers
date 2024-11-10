import Heading from '@/components/Heading'
import PostForm from '@/components/PostForm'
import React from 'react'

const CreatePostPage = () => {
  return (
    <section>
        <Heading text='Create a Post' icon='/icons/create-white.svg' />

        <PostForm/>
    </section>
  )
}

export default CreatePostPage
