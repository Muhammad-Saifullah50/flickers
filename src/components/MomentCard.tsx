'use client'
import { cn } from "@/lib/utils";
import { Moment, MomentAsset, User } from "@prisma/client"
import Image from "next/image";
import { useEffect, useRef, useState, } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import MomentCircle from "./MomentCircle";
import { CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Progress } from "@/components/ui/progress"
import { updateFlick } from "@/actions/flick.actions";
import  AssetCarousel  from "./AssetCarousel";


interface MomentCardProps {
  moment: Moment & { author: User, assets: MomentAsset[] },
  currMoment: Moment & { author: User, assets: MomentAsset[] },
  handlePrevious: () => void,
  handleNext: () => void,
  currMomentId: string
}

const MomentCard = ({ moment, currMoment, handlePrevious, handleNext, momentIdList }: MomentCardProps) => {

  const [progress, setProgress] = useState(0);
  const [asset, setAsset] = useState(currMoment.assets[0])

  const firstAsset = moment.assets[0]

  const isVideo = firstAsset?.url.includes('mp4') || firstAsset?.url.includes('mov') || firstAsset?.url.includes('webm');
  const isImage = firstAsset?.url.includes('png') || firstAsset?.url.includes('jpg') || firstAsset?.url.includes('avif') || firstAsset?.url.includes('svg');

  const isCurrentMoment = moment.id === currMoment.id;


  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [currMoment.id])

  const mediaType = isVideo ? 'video' : isImage ? 'image' : 'text';
  return (
    <div className="relative mr-4">
      <div className="relative">

        {isCurrentMoment && <div className="absolute w-full flex flex-col gap-2 items-center p-2 z-50">
          {
            isCurrentMoment && <Progress value={progress} className="h-1" />
          }
          <div className="flex gap-2 items-center justify-start w-full relative z-50 p-2">

            <Image
              src={moment.author.image || '/icons/dummyuser.png'}
              width={25}
              height={25}
              alt="user image"
              className="rounded-full"
            />
            <p className="text-xs">{moment.author.name}</p>
          </div>
        </div>}

        {!isCurrentMoment &&
          <div style={{ backgroundColor: moment.bgColor! }}
            className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center")}>


            {mediaType === 'text' ? (
              <>
                <p className="text-2xl text-white font-bold rounded-lg p-2">
                  {moment.text}
                </p>
                {!isCurrentMoment && <MomentCircle moment={moment} classNames='absolute' />}
              </>
            ) : mediaType === 'image' ? (
              <>
                <Image src={firstAsset?.url}
                  width={ 133}
                  height={ 235}
                  alt="moment image"
                  className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center object-fill")} />

                
              </>
            ) : (
              <>
                <video src={firstAsset?.url}
                  controls={false}
                  autoPlay={ false}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  className={" w-[133px] h-[235px] rounded-lg flex items-center justify-center object-fill"} />

                {!isCurrentMoment && <MomentCircle moment={moment} classNames='absolute' />}
              </>
            )}

          </div>
        }
        {isCurrentMoment && mediaType === 'text' &&

          (<div 
          style={{ backgroundColor: moment.bgColor! }}  
          className="w-[333px] h-[591px] flex rounded-lg items-center justify-center">
            <p className="text-2xl text-white font-bold rounded-lg p-2">
              {moment.text}
            </p>
          
          </div>)
        }

        {isCurrentMoment && currMoment.assets.length > 0 && (
          <div className="w-[333px] h-[591px] flex rounded-lg items-center justify-center ">
            <AssetCarousel 
            assets={currMoment.assets} 
            caption={moment.caption} 
            firstAssetDuration={currMoment.assets[0].duration}
            nextMomentId={momentIdList[momentIdList.indexOf(moment.id) + 1]}
            />
          </div>
        )}


      </div>
      <div className="flex justify-between items-center absolute top-1/2 mx-auto w-[330px]">

        {isCurrentMoment && <CarouselPrevious onClick={handlePrevious} className="relative z-50" />}
        {isCurrentMoment && <CarouselNext onClick={handleNext} className="relative z-50" />}
      </div>
    </div>
  )
}

export default MomentCard

// have to complete this
// have to implement the loading and the next assets etc
// have to correlctylk imoplement the carousel
// haver to ckeck and correcvt the prev carousel button not clockable when video is on leift
//have to us eplaiceholder to genereate lur place holder images
// haver to delete the loading bar thingy