'use client'
import { cn } from "@/lib/utils";
import { Moment, MomentAsset, User } from "@prisma/client"
import Image from "next/image";
import { useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const MomentCard = ({ moment, currMomentId }: { moment: Moment & { author: User, assets: MomentAsset[] }, currMomentId: string }) => {

  const ref = useRef<LoadingBarRef>(null);

  const isCurrentMoment = moment.id === currMomentId;
  const isTextMoment = moment.text;
  const momentHasSingleAsset = moment.assets.length === 1;
console.log(moment.bgColor)
  return (
    <div className={cn(" w-[133px] h-[235px] rounded-lg", {
      'w-[333px] h-[591px]': isCurrentMoment
    })}>
      <LoadingBar color="#FFFFFF59" ref={ref} shadow={true} height={10} className="z-50 absolute top-0 left-0 right-0" />
      <div className="absolute flex gap-2 items-center">
        <Image
          src={moment.author.image || '/icons/dummyuser.png'}
          width={25}
          height={25}
          alt="user image"
          className="rounded-full"
        />
        <p className="text-xs">{moment.author.name}</p>
      </div>

      {isTextMoment && (
        <div style={{backgroundColor: moment.bgColor!}}>
          <p className="text-2xl text-white font-bold">
            {moment.text}
          </p>
        </div>
      )}
    </div>
  )
}

export default MomentCard

// have to complete this 
// have to alsio corerrect the color error 