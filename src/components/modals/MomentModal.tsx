import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,

} from "@/components/ui/dialog"

import { Moment, User } from "@prisma/client"
import Image from "next/image"
import MomentCarousel from "../MomentCarousel"
import MomentCircle from "../MomentCircle"

const MomentModal = ({ moment, allMoments }: { moment: Moment & { author: User }, allMoments: (Moment & { author: User })[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MomentCircle moment={moment} />
      </DialogTrigger>
      <DialogOverlay>
        <section className="w-full flex items-center justify-center h-screen">

          <MomentCarousel allMoments={allMoments} currMomentId={moment.id} />
        </section>
      </DialogOverlay>
    </Dialog>
  )
}

export default MomentModal