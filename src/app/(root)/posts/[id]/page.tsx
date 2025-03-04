import { getAllPostIds, getPostById, getRelatedOrMoreUserOrLatestPosts } from "@/actions/post.actions"
import { getCurrentUserFromDb } from "@/actions/user.actions";
import Heading from "@/components/Heading";
import PostDetails from "@/components/PostDetails";
import PostInfoSkeleton from "@/components/skeletons/PostInfoSkeleton";
import SquarePostsGridSkeleton from "@/components/skeletons/SquarePostsGridSkeleton";
import SquarePostsGrid from "@/components/SquarePostsGrid";

import { notFound } from "next/navigation"
import { Suspense } from "react";

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
    const { id } = await params

    const post = await getPostById(id);

    const title = `${post?.caption.split(" ").slice(0, 10).join(" ") + " ..."} - ${post?.author?.name}`
    const ogImage = `${process.env.NEXT_PUBLIC_APP_URL}/api/og?postId=${id}`

    return {
        title: title || 'Post',
        description: post?.caption,
        openGraph: {
            title: title || 'Post',
            description: post?.caption,
            images: ogImage,
        }
    }
}

export const generateStaticParams = async () => {
    const postIds = await getAllPostIds()

    return postIds?.map(id => ({
        id,
    }))
};



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