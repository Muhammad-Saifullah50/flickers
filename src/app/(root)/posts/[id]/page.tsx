import { getPostById } from "@/actions/post.actions"
import PostCarousel from "@/components/PostCarousel";
import PostInfoCard from "@/components/PostInfoCard";
import { notFound } from "next/navigation"

const PostPage = async ({ params: { id } }: { params: { id: string } }) => {

    const post = await getPostById(id)

    if (!post) return notFound();
    return (
        <main className="w-full">
            <section className="flex w-full">
                <div className="flex flex-1 w-1/2">
                    <PostCarousel items={post.assets} />
                </div>

                <div className="flex flex-1 w-1/2">
                    <PostInfoCard post={post} />
                </div>
            </section>
        </main>
    )
}

export default PostPage