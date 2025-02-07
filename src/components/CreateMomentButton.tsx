'use client';

import { User } from "@prisma/client";
import Image from "next/image";
import DialogContent, { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import MomentForm from "./forms/MomentForm";

const CreateMomentButton = ({ currentUser }: { currentUser: User | null }) => {
    return (

        <Dialog>
            <DialogTrigger asChild>
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a moment</DialogTitle>
                    <DialogDescription>
                        Your moments will disappear after 24 hours. It will be visible to every user.
                    </DialogDescription>
                </DialogHeader>
                <MomentForm />
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>











    )
}

export default CreateMomentButton