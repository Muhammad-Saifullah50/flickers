'use client'
import { deletePost } from "@/actions/post.actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";

const DeletePost = ({ postId }: { postId: string }) => {
console.log(postId, 'postId')
    const router = useRouter();
const pathname = usePathname();

    const handleDelete = async () => {
        await deletePost(postId);
      pathname !== '/' &&  router.push('/')
         
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Image
                    src={'/icons/trash.svg'}
                    width={20}
                    height={20}
                    alt='delete'
                    className='cursor-pointer' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    onClick={handleDelete}
                    className="!bg-red-500 hover:!bg-red-500/90">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeletePost