import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import PostForm from '@/components/PostForm'
import Heading from '@/components/Heading'
import { getCurrentUserFromDb } from '@/actions/user.actions'
import { getPostById } from '@/actions/post.actions'

export default async function EditPost({ params }: { params: { id: string } }) {

    const id = await params.id
    const user = await getCurrentUserFromDb();
    const existingPost = await getPostById(id);

    return (
        <section>
            <Heading text='Edit Post' icon='/icons/edit-white.svg' />
            <PostForm user={user} post={existingPost} isEditing/>
        </section>
    )
}
