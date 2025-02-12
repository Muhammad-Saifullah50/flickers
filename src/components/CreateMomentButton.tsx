
import { User } from "@prisma/client";
import Image from "next/image";
import DialogContent, { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import MomentForm from "./forms/MomentForm";

// have to optimizee it to recieve ionly the user iod insted of the whole user object
const CreateMomentButton = ({ currentUser }: { currentUser: User | null }) => {

    if (!currentUser) {
        return null;
    }

    return (

        <Dialog >
            <DialogTrigger asChild >
                <div className="flex flex-col items-center justify-center gap-2">
                    <Image
                        src={'/icons/plus.svg'}
                        width={30} height={30}
                        alt="user"
                        className="rounded-full"
                    />
                    <span className="text-xs text-light-2">
                        Add Moment
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[67vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add a moment</DialogTitle>
                    <DialogDescription>
                        Your moments will disappear after 24 hours. It will be visible to every user.
                    </DialogDescription>
                </DialogHeader>
                <MomentForm userId={currentUser?.id} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateMomentButton