import { Flick, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type FlickCardProps = {
  flick: Flick & { author: User }
  classNames?:string
}
const FlickCard = ({ flick, classNames }:  FlickCardProps) => {
  return (
    <aside className={`group relative ${classNames} `}>
      <Link href={`/flicks/${flick.id}`}>
        <video
          src={flick.videoUrl}
          controls={false}
          autoPlay={false}
          className={`${classNames} rounded-lg object-fill`}
        />
      </Link>
      <div className="flex flex-col absolute p-4 gap-3 bottom-0 w-full bg-black/20">
        <h3 className="text-sm">{flick.caption}</h3>
        <p className="text-sm text-purple-secondary">{flick.hashtags}</p>
        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center gap-2">
            <Link href={`/users/${flick.author.id}`} className="flex items-center gap-1">
              <Image
                src={flick.author.image || '/icons/dummyuser.svg'}
                width={30}
                height={30}
                alt="profile"
                className="rounded-full" />
              <h4 className=" line-clamp-1">{flick.author.name}</h4>
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
              <span>{flick.likes}</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src={'/icons/play.svg'}
                width={20}
                height={20}
                alt="heart"
                className=""
              />
              <span>{flick.plays}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FlickCard