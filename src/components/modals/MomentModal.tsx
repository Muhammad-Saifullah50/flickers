
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogTrigger,

} from "@/components/ui/dialog"

import { Moment, User } from "@prisma/client"
import Image from "next/image"
import MomentCarousel from "../MomentCarousel"
import MomentCircle from "../MomentCircle"
import { X } from "lucide-react"
import Link from "next/link"

const MomentModal = ({ moment, allMoments }: { moment: Moment & { author: User }, allMoments: (Moment & { author: User })[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MomentCircle moment={moment} />
      </DialogTrigger>
      <DialogOverlay>
        <section className="w-full flex items-center justify-center h-screen">

          <DialogClose className=" absolute top-10 right-10 w-10 h-10 text-white flex items-center justify-center" >
            <X />
          </DialogClose>

          <MomentCarousel allMoments={allMoments} currMoment={moment} />
        </section>
      </DialogOverlay>
    </Dialog>
  )
}

export default MomentModal