import Image from "next/image";
import DialogContent, { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import MomentForm from "./forms/MomentForm";


const CreateMomentButton = ({ userId, userImage }: { userId: string | undefined, userImage?: string | null }) => {

    if (!userId) {
        return null;
    }

    return (

        <Dialog >
            <DialogTrigger asChild >
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-[linear-gradient(180deg,#877EFF_0%,#685DFF_46.15%,#3121FF_100%)] rounded-full p-0.5">


                        <div className="relative bg-dark-2 rounded-full p-[2px]">

                            <Image
                                src={userImage || '/icons/dummyuser.png'}
                                width={40} height={40}
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

                    <span className="text-xs text-light-2">
                        Add Moment
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[67vh] overflow-y-auto" >
                <DialogHeader>
                    <DialogTitle>Add a moment</DialogTitle>
                    <DialogDescription>
                        Your moments will disappear after 24 hours. It will be visible to every user.
                    </DialogDescription>
                </DialogHeader>
                <MomentForm userId={userId} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateMomentButton