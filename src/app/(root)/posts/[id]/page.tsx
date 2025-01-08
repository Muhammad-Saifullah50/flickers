import { getPostById } from "@/actions/post.actions"
import PostDetails from "@/components/PostDetails";

import { notFound } from "next/navigation"

export const experimental_ppr = true

const PostPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params

    const post = await getPostById(id)

    if (!post) return notFound();
    return (
        <main className="w-full">
            <PostDetails post={post} 
            isHomeCard={false}/>
        </main>
    )
}

export default PostPage