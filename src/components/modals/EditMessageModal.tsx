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
  
const EditMessageModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button >Continue</Button>
        </AlertDialogFooter>
    </DialogContent>  
    )
}

export default EditMessageModal