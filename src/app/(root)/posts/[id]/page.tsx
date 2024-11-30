import { getPostById } from "@/actions/post.actions"
import PostDetails from "@/components/PostDetails";

import { notFound } from "next/navigation"

const PostPage = async ({ params: { id } }: { params: { id: string } }) => {

    const post = await getPostById(id)

    if (!post) return notFound();
    return (
        <main className="w-full">
            <PostDetails post={post} />
        </main>
    )
}

export default PostPage