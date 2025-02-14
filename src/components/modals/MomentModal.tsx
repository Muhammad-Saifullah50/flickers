import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Moment, User } from "@prisma/client"
import Image from "next/image"
import MomentCarousel from "../MomentCarousel"

const MomentModal = ({ moment, allMoments }: { moment: Moment & { author: User }, allMoments: (Moment & {author: User})[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="bg-[linear-gradient(180deg,#877EFF_0%,#685DFF_46.15%,#3121FF_100%)] rounded-full p-0.5">


            <div className="relative bg-dark-2 rounded-full p-[2px]">

              <Image
                src={moment.author.image || '/icons/dummyuser.png'}
                width={45} height={45}
                alt="user"
                className="rounded-full"
              />

            </div>
          </div>

          <span className="text-xs text-light-2 line-clamp-1 text-center
      ">
            {moment.author.name.split(' ')[0]}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="!bg-transparent h-full border-none">

        <MomentCarousel allMoments={allMoments} />
      </DialogContent>
    </Dialog>
  )
}

export default MomentModal