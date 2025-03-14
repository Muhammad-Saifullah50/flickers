import {
    Dialog,
    DialogContent,

    DialogTitle,
} from "@/components/ui/dialog"
import { Suspense } from "react"

import { Post, User } from "@prisma/client"

type FlickModalProps = {
    post: Post & { author: User }
    user: User
}

const FlickModal = ({ flick, user }: FlickModalProps) => {
    return (
        <Dialog>
            <DialogContent className=" overflow-y-auto max-md:pb-20"
                //@ts-ignore
                shdGoBack>
                <DialogTitle />
                <Suspense >
                    v
                </Suspense>
            </DialogContent>
        </Dialog>

    )
}

export default FlickModal
