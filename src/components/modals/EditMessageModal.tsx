import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Message, Room } from "@ably/chat"
import { Input } from "../ui/input"
import { useState } from "react"
import Loader from "../Loader"

type EditMessageModalProps = {
  message: Message
  room: Room
  setShowEditModal: (v: boolean) => void
}
const EditMessageModal = ({ message, room, setShowEditModal }: EditMessageModalProps) => {

  const [messageValue, setMessageValue] = useState(message.text);
  const [loading, setLoading] = useState(false)


  const handleMessageUpdate = async () => {
    try {
      setLoading(true)
      await room.messages.update(message, { text: messageValue })
setShowEditModal(false)
    } catch (error) {
      console.error('Error updating message:', error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit your message</DialogTitle>
        <Input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} className="focus-visible:outline-none focus-visible:ring-0 " />
      </DialogHeader>
      <AlertDialogFooter>
        <Button
          variant={'secondary'}
          onClick={() => setShowEditModal(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleMessageUpdate}>
          {loading ? (<Loader variant="white" />) : 'Update'}
        </Button>
      </AlertDialogFooter>
    </DialogContent>
  )
}

export default EditMessageModal