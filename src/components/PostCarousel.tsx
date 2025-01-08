import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const PostCarousel = ({ items }: { items: string[] }) => {
    return (
        <Carousel 
        >
            <CarouselContent className="flex justify-center items-center  w-full ">
                {items.map((item) => {
                    const isVideo = [".mp4", ".webm", ".mov", ".avi", ".mkv"].some(
                        (ext) => item.toLowerCase().endsWith(ext)
                    );

                    return (
                        <CarouselItem key={item} className="w-full flex justify-center ">

                            {isVideo ? (
                                <video
                                    src={item}
                                    className="max-sm:w-[300px] max-sm:h-[300px]  w-full object-fill h-[580px] rounded-l-lg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                />
                            ) : (
                                <Image
                                    src={item}
                                    alt={item}
                                    width={700}
                                    height={700}
                                    className="w-full object-fill h-[580px] rounded-lg max-sm:h-[400px] self-center "
                                />
                            )}
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
        </Carousel>
    );
};

export default PostCarousel;