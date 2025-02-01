import {
    Dialog,
    DialogContent,
   
    DialogTitle,
} from "@/components/ui/dialog"
import { Suspense } from "react"
import PostDetails from "../PostDetails"
import PostInfoSkeleton from "../skeletons/PostInfoSkeleton"
import { Post, User } from "@prisma/client"

type PostModalProps = {
    post: Post & { author: User }
    user: User
}

const PostModal = ({ post, user }: PostModalProps) => {
    return (
        <Dialog open={true}>
            <DialogContent className="h-full overflow-y-auto pb-20">
                <DialogTitle />
                <Suspense fallback={<PostInfoSkeleton />}>
                    <PostDetails
                        post={post}
                        isHomeCard={false}
                        userId={user?.id}
                    />
                </Suspense>
            </DialogContent>
        </Dialog>

    )
}

export default PostModal
