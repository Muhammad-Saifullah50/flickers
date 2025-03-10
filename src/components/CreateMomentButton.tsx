'use client'
import Image from "next/image";
import DialogContent, { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import MomentForm from "./forms/MomentForm";
import { useState } from "react";


const CreateMomentButton = ({ userId, userImage }: { userId: string | undefined, userImage?: string | null }) => {

    const [open, setOpen] = useState(false);

    if (!userId) {
        return null;
    }

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-[linear-gradient(180deg,#877EFF_0%,#685DFF_46.15%,#3121FF_100%)] rounded-full p-0.5">


                        <div className="relative bg-dark-2 rounded-full p-[2px]">

                            <Image
                                src={userImage || '/icons/dummyuser.png'}
                                width={45} height={45}
                                alt="user"
                                className="rounded-full"
                            />
                              <Image
                            src={'/icons/addsquare.svg'}
                            width={15} height={15}
                            alt="camera"
                            className="absolute z-10 -bottom-1 -right-1"
                        />
                        </div>
                    </div>

                    <span className="text-xs text-light-2 w-20">
                        Share Moment
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[67vh] overflow-y-auto" >
                <DialogHeader>
                    <DialogTitle>Share a moment</DialogTitle>
                    <DialogDescription>
                        Your moments will disappear after 24 hours. It will be visible to every user.
                    </DialogDescription>
                </DialogHeader>
                <MomentForm userId={userId} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateMomentButton