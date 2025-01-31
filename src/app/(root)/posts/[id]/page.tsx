import { getPostById, getRelatedOrMoreUserOrLatestPosts } from "@/actions/post.actions"
import { getCurrentUserFromDb } from "@/actions/user.actions";
import Heading from "@/components/Heading";
import PostDetails from "@/components/PostDetails";
import PostInfoSkeleton from "@/components/skeletons/PostInfoSkeleton";
import SquarePostsGridSkeleton from "@/components/skeletons/SquarePostsGridSkeleton";
import SquarePostsGrid from "@/components/SquarePostsGrid";

import { notFound } from "next/navigation"
import { Suspense } from "react";

const PostPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params

    const post = await getPostById(id)
    if (!post) return notFound();

    const user = await getCurrentUserFromDb()
    const morePostsPromise = getRelatedOrMoreUserOrLatestPosts(post)

    return (
        <main className="w-full flex flex-col gap-10">
            <Suspense fallback={<PostInfoSkeleton />}>
                <PostDetails
                    post={post}
                    isHomeCard={false}
                    userId={user?.id}
                />
            </Suspense>

            <Heading text="More Posts" />
            <section>
                <Suspense fallback={<SquarePostsGridSkeleton />}>
                    <SquarePostsGrid itemsPromise={morePostsPromise} />
                </Suspense>
            </section>
        </main>
    )
}

export default PostPage