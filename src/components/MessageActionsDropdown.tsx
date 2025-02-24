import {
    Trash,
    Edit
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Dialog } from "./ui/dialog"
import EditMessageModal from "./modals/EditMessageModal"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import DeleteMessageModal from "./modals/DeleteMessageModal"
const MessageActionsDropdown = () => {

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Image
                        src={'/icons/arrow-down.svg'}
                        width={15}
                        height={15}
                        alt={'arrow-down'}
                    />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>

                        <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                            <Edit />
                            <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
                            <Trash />
                            <span>Delete</span>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>


                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <EditMessageModal />
            </Dialog>
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DeleteMessageModal />
            </Dialog>
        </>
    )
}

export default MessageActionsDropdown


