import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"


const PostCarousel = ({ items }: { items: string[] }) => {
    return (
        <Carousel>
            <CarouselContent>
                {items.map((item) => (
                    <CarouselItem key={item}>
                        <Image
                            src={item}
                            alt={item}
                            width={500} height={500}
                            className="w-full object-fill h-[580px] rounded-l-lg" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 "/>
            <CarouselNext className="right-2" />
        </Carousel>

    )
}

export default PostCarousel