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
import { useState } from "react";
import Loader from "./Loader";
import { Button } from "./ui/button";


const DeletePost = ({ postId, onDelete }: { postId: string, onDelete?: (postId: string) => void }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    
    const handleDelete = async () => {
        try {
            setOpen(true);
            setLoading(true);
            await deletePost(postId);
            router.push('/');
            setOpen(false);
            if (onDelete) onDelete(postId);

        } catch (error) {
            console.error('Error deleting post :', error);
        } finally {
            setLoading(false);
        }



    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
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
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="!bg-red-500 hover:!bg-red-500/90">
                        {loading ?
                            <Loader variant="white" /> :
                            'Continue'
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeletePost