'use client'
import { Flick, Like, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Loader from "./Loader"
import DialogContent, { Dialog, DialogTitle, DialogTrigger } from "./ui/dialog"
import FlickCarousel from "./FlickCarousel"
import { useEffect } from "react"

type FlickCardProps = {
  flick: Flick & { author: User, likes?: Like[] } | null
  classNames?: string
  loading?: boolean
  flickId?: string
  flickIcon?: boolean
}
const FlickCard = ({ flick, classNames, loading, flickIcon }: FlickCardProps) => {

  return (
    <Dialog>

      <aside className={`group flex relative gap-8   ${classNames} ${loading && 'bg-dark-2'}`}>

        <DialogTrigger asChild>

          <video
            src={flick?.videoUrl}
            controls={false}
            autoPlay={false}
            className={`${classNames} rounded-lg object-fill `}
          />
        </DialogTrigger>

        {loading ? (
          <Loader variant="purple" />
        ) : (

          <>

            {flickIcon && <Image
              src={'/icons/flicks-white.svg'}
              width={15}
              height={15}
              className="absolute right-5 top-5"
              alt="flick"
            />}
            {/* overlay */}
            <div className="group-hover:flex hidden flex-col absolute p-4 gap-3 bottom-0 w-full bg-black/20">
              <h3 className="text-sm">{flick?.caption}</h3>
              <p className="text-sm text-purple-secondary">{flick?.hashtags}</p>
              <div className="flex justify-between w-full text-sm">
                <div className="flex items-center gap-2">
                  <Link href={`/users/${flick?.author?.id}`} className="flex items-center gap-1">
                    <Image
                      src={flick?.author?.image || '/icons/dummyuser.png'}
                      width={30}
                      height={30}
                      alt="profile"
                      className="rounded-full" />
                    <h4 className=" line-clamp-1">{flick?.author?.name}</h4>
                  </Link>
                </div>
                
              </div>
            </div>
          </>
        )}


      </aside>

      <DialogContent className="sm:max-w-[600px] flex items-center h-[calc(100vh-120px)] justify-center">

        <DialogTitle className="sr-only">{flick?.caption}</DialogTitle>
        <FlickCarousel flick={flick} flickId={flick?.id} isModal={true} />

      </DialogContent>
    </Dialog>

  )
}

export default FlickCard