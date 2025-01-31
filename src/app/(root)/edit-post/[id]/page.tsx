
import React from 'react'
import PostForm from '@/components/PostForm'
import Heading from '@/components/Heading'
import { getPostById } from '@/actions/post.actions'

export default async function EditPost({ params }: { params: { id: string } }) {

    const id = await params.id
    const existingPost = await getPostById(id);

    return (
        <section>
            <Heading text='Edit Post' icon='/icons/edit-white.svg' />
            <PostForm post={existingPost!} isEditing/>
        </section>
    )
}
