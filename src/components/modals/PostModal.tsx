import {
    Dialog,
    DialogContent,

    DialogTitle,
} from "@/components/ui/dialog"
import { Suspense } from "react"
import PostDetails from "../PostDetails"
import PostInfoSkeleton from "../skeletons/PostInfoSkeleton"
import { Post, User } from "@prisma/client"
import { getCurrentUserFromDb } from "@/actions/user.actions"

type PostModalProps = {
    post: Post & { author: User }
    user: User
}

const PostModal = async ({ post, user }: PostModalProps) => {

    const currentUser = await getCurrentUserFromDb()
    return (
        <Dialog open={true}>
            <DialogContent className=" overflow-y-auto max-md:pb-20"
                //@ts-ignore
                shdGoBack>
                <DialogTitle />
                <Suspense fallback={<PostInfoSkeleton />}>
                    <PostDetails
                        post={post}
                        isHomeCard={false}
                        userId={user?.id}
                        currentUser={currentUser}
                    />
                </Suspense>
            </DialogContent>
        </Dialog>

    )
}

export default PostModal
