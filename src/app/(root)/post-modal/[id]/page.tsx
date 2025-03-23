import { getAllPostIds, getPostById } from "@/actions/post.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import PostModal from "@/components/modals/PostModal"
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const post = await getPostById(id);

  if (!post) return;

  const title = `${post?.caption.split(" ").slice(0, 10).join(" ") + " ..."} - ${post?.author?.name}`
  const ogImage = `${process.env.NEXT_PUBLIC_APP_URL}/api/og?postId=${id}`

  return {
      title: title || 'Post',
      description: post?.caption,
      openGraph: {
          title: `${title} - Flickers` || 'Post - Flickers',
          description: post?.caption,
          images: ogImage,
      }
  }
}

export const generateStaticParams = async () => {
  const postIds = await getAllPostIds()

  return postIds?.map(id => {
    return {
      id
    }
  })
}

const PostModalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const post = await getPostById(id)
  if (!post) return notFound();

  const user = await getCurrentUserFromDb()
  return (
    <PostModal post={post} user={user!} />
  )
}

export default PostModalPage