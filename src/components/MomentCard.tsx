'use client'
import { cn } from "@/lib/utils";
import { Moment, MomentAsset, User } from "@prisma/client"
import Image from "next/image";
import { useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import MomentCircle from "./MomentCircle";

const MomentCard = ({ moment, currMomentId }: { moment: Moment & { author: User, assets: MomentAsset[] }, currMomentId: string }) => {

  const ref = useRef<LoadingBarRef>(null);

  const isCurrentMoment = moment.id === currMomentId;
  const isText = !!moment.text && moment.bgColor !== '';
  const momentHasSingleAsset = moment.assets.length === 1;

  const firstAsset = moment.assets[0]

  const isVideo = firstAsset?.url.includes('mp4') || firstAsset?.url.includes('mov') || firstAsset?.url.includes('webm');

  const isImage = firstAsset?.url.includes('png') || firstAsset?.url.includes('jpg') || firstAsset?.url.includes('avif') || firstAsset?.url.includes('svg');

  return (
    <div>
      <LoadingBar color="#FFFFFF59" ref={ref} shadow={true} height={10} className="z-50 absolute top-0 left-0 right-0" />

      {isCurrentMoment && <div className="absolute flex gap-2 items-center p-2">
        <Image
          src={moment.author.image || '/icons/dummyuser.png'}
          width={25}
          height={25}
          alt="user image"
          className="rounded-full"
        />
        <p className="text-xs">{moment.author.name}</p>
      </div>}

      {isVideo && (
        <div className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center", {
          'w-[333px] h-[591px]': isCurrentMoment
        })}>
          <video src={firstAsset?.url}
            controls={isCurrentMoment ? true : false}
            autoPlay={isCurrentMoment ? true : false}
            controlsList="nodownload nofullscreen noremoteplayback"
            className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center object-fill", {
              'w-[333px] h-[591px]': isCurrentMoment
            })} />

          {!isCurrentMoment && <MomentCircle moment={moment} classNames='absolute' />}
        </div>
      )}

      {isImage && (
        <div style={{ backgroundColor: moment.bgColor! }}
          className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center", {
            'w-[333px] h-[591px]': isCurrentMoment
          })}>
          <Image src={firstAsset?.url}
            width={isCurrentMoment ? 333 : 133}
            height={isCurrentMoment ? 591 : 235}
            alt="moment image"
            className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center object-fill", {
              'w-[333px] h-[591px]': isCurrentMoment
            })} />

          {!isCurrentMoment && <MomentCircle moment={moment} classNames='absolute' />}
        </div>
      )}

      {isText && (
        <div style={{ backgroundColor: moment.bgColor! }}
          className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center", {
            'w-[333px] h-[591px]': isCurrentMoment
          })}>
          <p className="text-2xl text-white font-bold rounded-lg p-2">
            {moment.text}
          </p>
          {!isCurrentMoment && <MomentCircle moment={moment} classNames='absolute' />}
        </div>
      )}

    </div>
  )
}

export default MomentCard

// have to complete this
// have to implement the loading and the next assets etc
// have to correlctylk imoplement the carousel