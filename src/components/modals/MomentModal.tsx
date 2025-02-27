'use client';
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
import { useState } from "react";

const MomentModal = ({ moment, allMoments }: { moment: Moment & { author: User }, allMoments: (Moment & { author: User })[] }) => {

const [modalOpen, setModalOpen] = useState(false)
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <MomentCircle moment={moment} setModalOpen={setModalOpen} />
      </DialogTrigger>
      <DialogOverlay>
        <section className="w-full flex items-center justify-center sm:h-screen min-h-[80vh] max-sm:absolute max-sm:top-20">

          <DialogClose className=" absolute top-5 sm:top-10 right-10 w-10 h-10 text-white flex items-center justify-center " >
            <X />
          </DialogClose>

          <MomentCarousel allMoments={allMoments} currMoment={moment} setModalOpen={setModalOpen} open={modalOpen} />
        </section>
      </DialogOverlay>
    </Dialog>
  )
}

export default MomentModal