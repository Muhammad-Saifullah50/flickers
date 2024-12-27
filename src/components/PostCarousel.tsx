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
        <Carousel>
            <CarouselContent>
                {items.map((item) => {
                    const isVideo = [".mp4", ".webm", ".mov", ".avi", ".mkv"].some(
                        (ext) => item.toLowerCase().endsWith(ext)
                    );

                    return (
                        <CarouselItem key={item}>
                            {isVideo ? (
                                <video
                                    src={item}
                                    className="max-sm:w-[300px] max-sm:h-[300px] w-full object-fill h-[580px] rounded-l-lg"
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
                                    width={500}
                                    height={500}
                                    className="w-full object-fill h-[580px] rounded-l-lg max-sm:w-[300px] max-sm:h-[300px]"
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