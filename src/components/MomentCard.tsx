'use client'
import { cn } from "@/lib/utils";
import { Moment, MomentAsset, User } from "@prisma/client"
import Image from "next/image";
import MomentCircle from "./MomentCircle";
import { CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Progress } from "@/components/ui/progress"
import AssetCarousel from "./AssetCarousel";


interface MomentCardProps {
  moment: Moment & { author: User, assets: MomentAsset[] },
  currMoment: Moment & { author: User, assets: MomentAsset[] },
  handlePrevious: () => void,
  handleNext: () => void,

}

const MomentCard = ({ moment, currMoment, handlePrevious, handleNext }: MomentCardProps) => {

  const firstAsset = moment.assets[0]

  const isVideo = firstAsset?.url.includes('mp4') || firstAsset?.url.includes('mov') || firstAsset?.url.includes('webm');
  const isImage = firstAsset?.url.includes('png') || firstAsset?.url.includes('jpg') || firstAsset?.url.includes('avif') || firstAsset?.url.includes('svg');

  const isCurrentMoment = moment.id === currMoment.id;


  const mediaType = isVideo ? 'video' : isImage ? 'image' : 'text';
  return (
    <div className="relative mr-4">
      <div className="relative">

        {isCurrentMoment && <div className="absolute w-full flex flex-col gap-2 items-center p-2 z-50">

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
                <p className="text-2xl text-white font-bold text-center rounded-lg p-2">
                  {moment.text}
                </p>
                {!isCurrentMoment && <MomentCircle moment={moment} classNames='absolute' />}
              </>
            ) : mediaType === 'image' ? (
              <>
                <Image src={firstAsset?.url}
                  width={133}
                  height={235}
                  blurDataURL={`/_next/image?url=${firstAsset?.url}&w=16&q=1`}
                  placeholder='blur'
                  alt="moment image"
                  className={cn(" w-[133px] h-[235px] rounded-lg flex items-center justify-center object-fill")} />


              </>
            ) : (
              <>
                <video src={firstAsset?.url}
                  controls={false}
                  autoPlay={true}
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
            <p className="text-2xl text-white text-center font-bold rounded-lg p-2">
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
            />
          </div>
        )}


      </div>
      <div className="flex justify-between items-center absolute top-1/2 mx-auto w-[330px] ">

        {isCurrentMoment && <CarouselPrevious onClick={handlePrevious} className="relative z-50 max-sm:left-4" />}
        {isCurrentMoment && <CarouselNext onClick={handleNext} className="relative z-50 max-sm:right-1" />}
      </div>
    </div>
  )
}

export default MomentCard
