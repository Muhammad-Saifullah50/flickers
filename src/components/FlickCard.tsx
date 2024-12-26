'use client'
import { Flick, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Loader from "./Loader"
import { useEffect, useState } from "react"
import { getFlickById } from "@/actions/flick.actions"

type FlickCardProps = {
  flick: Flick & { author: User } | null
  classNames?: string
  loading?: boolean
  flickId?: string
  flickIcon?: boolean
}
const FlickCard = ({ flickIcon, flick, classNames, loading, flickId }: FlickCardProps) => {

  const [flickToUse, setFlickToUse] = useState(flick)

  useEffect(() => {
    if (!flick && flickId) {
      const getFlick = async () => {
        const fetchedFlick = await getFlickById(flickId!)

        setFlickToUse(fetchedFlick)
      }

      getFlick()
    }

  }, [flickId])



  return (
    <aside className={`group relative ${classNames} ${loading && 'bg-dark-2'}`}>
      <Link href={loading ? '' : ` /flicks/${flickToUse?.id}`}>
        {loading ? (
          <Loader variant="purple" />
        ) : (<video
          src={flick?.videoUrl}
          controls={false}
          autoPlay={false}
          className={`${classNames} rounded-lg object-fill`}
        />)}
      </Link>

      {loading ? (
        <Loader variant="purple" />
      ) : (
          <>
            <Image
              src={'/icons/flicks-white.svg'}
              width={15}
              height={15}
              className="absolute right-5 top-5"
              alt="flick"
            />
        <div className="group-hover:flex hidden flex-col absolute p-4 gap-3 bottom-0 w-full bg-black/20">
          <h3 className="text-sm">{flickToUse?.caption}</h3>
          <p className="text-sm text-purple-secondary">{flickToUse?.hashtags}</p>
          <div className="flex justify-between w-full text-sm">
            <div className="flex items-center gap-2">
              <Link href={`/users/${flickToUse?.author?.id}`} className="flex items-center gap-1">
                <Image
                  src={flickToUse?.author?.image || '/icons/dummyuser.png'}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full" />
                <h4 className=" line-clamp-1">{flickToUse?.author?.name}</h4>
              </Link>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <Image
                  src={'/icons/heart.svg'}
                  width={20}
                  height={20}
                  alt="heart"
                  className=""
                />
                <span>{flickToUse?.likes}</span>
              </div>

              <div className="flex items-center gap-1">
                <Image
                  src={'/icons/play.svg'}
                  width={20}
                  height={20}
                  alt="heart"
                  className=""
                />
                <span>{flickToUse?.plays}</span>
              </div>
            </div>
          </div>
        </div>
        </> )}

    </aside>
  )
}

export default FlickCard