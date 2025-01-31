import { getPostById, getRelatedOrMoreUserOrLatestPosts } from "@/actions/post.actions"
import { getCurrentUserFromDb } from "@/actions/user.actions";
import PostDetails from "@/components/PostDetails";
import PostInfoSkeleton from "@/components/skeletons/PostInfoSkeleton";
import SquarePostsGrid from "@/components/SquarePostsGrid";

import { notFound } from "next/navigation"
import { Suspense } from "react";

const PostPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params

    const post = await getPostById(id)
    if (!post) return notFound();

    const user = await getCurrentUserFromDb()
    const morePosts = await getRelatedOrMoreUserOrLatestPosts(post)

    return (
        <main className="w-full flex flex-col gap-10">
            <Suspense fallback={<PostInfoSkeleton />}>
                <PostDetails
                    post={post}
                    isHomeCard={false}
                    userId={user?.id}
                />
            </Suspense>

            <h2>More  Posts</h2>

            <section>
                <Suspense fallback={<div>loading</div>}>
                   {morePosts && (
                        <SquarePostsGrid items={morePosts} />
                   )}
                </Suspense>
            </section>
        </main>
    )
}

export default PostPage