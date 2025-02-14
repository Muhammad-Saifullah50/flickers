'use client'
import { Moment, MomentAsset, User } from "@prisma/client"
import Image from "next/image";
import { useRef } from "react";
import LoadingBar, { LoadingBarContainer, LoadingBarRef, useLoadingBar } from "react-top-loading-bar";

const MomentCard = ({ moment }: { moment: Moment & { author: User, assets: MomentAsset[] } }) => {

  const ref = useRef<LoadingBarRef>(null);

  return (
      <div>
        <LoadingBar color="#FFFFFF59" ref={ref} shadow={true} height={10} className="z-50 absolute top-0 left-0 right-0" />
        <div className="absolute flex gap-2 items-center">
          <Image
            src={moment.author.image || '/icons/dummyuser.png'}
            width={25}
            height={25}
            alt="user  image"
            className="rounded-full"
           
          />

          <p className="text-xs">{moment.author.name}</p>
        </div>

        <Image
          src={moment?.assets[0]?.url || null}
          width={300}
          height={500}
          alt="moment"
          className="object-fill w-[333px] h-[591px]"
        />
      </div>
  )
}

export default MomentCard


// have to complete this 
// have tio show tthe loading bar when the current moment is playing
// have to figure out how to get the current moment