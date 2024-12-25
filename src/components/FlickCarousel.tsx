'use client'
import { Flick, User } from "@prisma/client"
import FlickCard from "./FlickCard"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type FlickCarouselProps = {
    currFlick: Flick & { author: User },
    prevFlick: Flick & { author: User } | null,
    nextFlick: Flick & { author: User } | null
};

const FlickCarousel = ({ currFlick }: FlickCarouselProps) => {

    const router = useRouter();
    const [transitioning, setTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | null>(null);

    const goToNextFlick = () => {
    
            setTimeout(() => {
                router.push(`/flicks/${nextFlick.id}`)
            }, 1000);
        }

    };

    const goToPrevFlick = () => {

        setTimeout(() => {
            router.push(`/flicks/${prevFlick.id}`)
        }, 1000);
    }

const handleGlobalScroll = (e: WheelEvent) => {

        if (e.deltaY > 0) {
            goToNextFlick();
        } else if (e.deltaY < 0) {
            goToPrevFlick();
        }
};


const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (e.key === 'ArrowDown') {
            goToNextFlick()
        }
        if (e.key === 'ArrowUp') {
            goToPrevFlick()
        }
}

useEffect(() => {
    window.addEventListener('wheel', handleGlobalScroll, { passive: true })

    return () => {
        window.removeEventListener('wheel', handleGlobalScroll)
    }
}, [prevFlick?.id, nextFlick?.id])

return (
    <div
        className="overflow-y-auto focus-visible:outline-0 flex flex-col gap-4"
        tabIndex={0}
        onKeyDown={handleKeyDown}
    >
        <div>
            {prevFlick && (
                <FlickCard
                    flick={prevFlick}
                    classNames={`h-[500px] w-[300px] `}
                />
            )}
            <p>prev flick</p>
        </div>

        <div>
            <FlickCard
                flick={currFlick}
                classNames={`h-[500px] w-[300px]`}
            />
            <p>current flick</p>
        </div>

        <div>

            {nextFlick && (
                <FlickCard
                    flick={nextFlick}
                    classNames={`h-[500px] w-[300px] 
            `}
                />
            )}
            <p>next flick</p>
        </div>
    </div>
);
}

export default FlickCarousel