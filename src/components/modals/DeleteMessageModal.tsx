import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { Message, Room } from "@ably/chat"
import Loader from "../Loader"

const DeleteMessageModal = ({ room, message }: { room: Room, message: Message }) => {
    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        try {
            setLoading(true);
            await room.messages.delete(message, {
                description: 'Message deleted'
            })
        } catch (error) {
            console.error('Error deleting message:', error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your message
                </DialogDescription>
            </DialogHeader>
            <AlertDialogFooter>
                <Button variant={'secondary'}>Cancel</Button>
                <Button variant={'destructive'} onClick={handleDelete}>{loading ? (<Loader variant="white"/>) : 'Delete'}</Button>
            </AlertDialogFooter>
        </DialogContent>
    )
}

export default DeleteMessageModal