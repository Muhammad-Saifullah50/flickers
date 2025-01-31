import { getPostById } from "@/actions/post.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import PostModal from "@/components/modals/PostModal"
import { notFound } from "next/navigation";

const PostModalPage = async ({ params }: { params: { id: string } }) => {
const { id } = await params

    const post = await getPostById(id)
    if (!post) return notFound();

    const user = await getCurrentUserFromDb()
  return (
    <PostModal post={post} user={user!}/>
  )
}

export default PostModalPage