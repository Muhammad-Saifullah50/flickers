
import React from 'react'
import PostForm from '@/components/forms/PostForm'
import Heading from '@/components/Heading'
import { getAllPostIds, getPostById } from '@/actions/post.actions'

export const generateStaticParams = async () => {
    const postIds = await getAllPostIds()

    return postIds?.map(id => ({
        id,
    }))
}


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
