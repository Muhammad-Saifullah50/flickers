'use client'
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { MomentAsset } from "@prisma/client"
import { determineAssetType } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type AssetCarouselProps = {
    assets: MomentAsset[]
    caption: string
    firstAssetDuration: number
}

const AssetCarousel = ({ assets, caption, firstAssetDuration }: AssetCarouselProps) => {

    // converting seconds to milliseconds
    const [duration, setDuration] = useState(firstAssetDuration * 1000);
    const [assetIndex, setAssetIndex] = useState(0);

    const plugin = useRef(
        Autoplay({ delay: duration, stopOnInteraction: true })
    )

    useEffect(() => {
       

        setDuration(assets[assetIndex].duration * 1000)
        plugin.current = Autoplay({ delay: duration, stopOnInteraction: true })

    }, [assetIndex,duration, assets])


    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {assets.map((asset, index) => {

                    const mediaType = determineAssetType(asset.url)

                    return (
                        <CarouselItem key={index}>
                            {mediaType === 'image' ? (
                                <Image src={asset.url}
                                    width={333}
                                    height={591}
                                    alt="moment image"
                                    className={" w-[333px] h-[591px] rounded-lg flex items-center justify-center object-fill relative -z-50"} />
                            ) : (
                                <video src={asset?.url}
                                    controls={false}
                                    autoPlay={true}
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                    className={" w-[333px] h-[591px] rounded-lg flex items-center justify-center object-fill relative "} />
                            )}

                            <div className="absolute bottom-0 w-full flex items-center justify-center p-2 bg-black/60 rounded-lg">
                                {caption}
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>

        </Carousel>
    )
}

export default AssetCarousel

// havev to figure out how to go to the next moment when the last asset has completed
// and when the user clicks or slides on the next moment, it should go to the next moment       