'use client'
import { Flick } from "@prisma/client"
import FlickCard from "./FlickCard"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FlickCarousel = ({ currFlick, flickList }: { currFlick: Flick, flickList: string[] }) => {

    const router = useRouter();
    const [currIndex, setCurrIndex] = useState(0)

    const goToNextFlick = () => {
        if (currIndex < flickList.length - 1) {
            setCurrIndex(currIndex + 1)
            router.push(`/flicks/${flickList[currIndex + 1]}`)
        }
    };

    const goToPrevFlick = () => {
        if (currIndex > 0) {
            setCurrIndex(currIndex - 1)

            router.push(`/flicks/${flickList[currIndex - 1]}`)
        }
    };

     const handleGlobalScroll = (e: WheelEvent) => {
        console.log('Wheel event triggered', e.deltaY);

        if (e.deltaY > 0) {
            // Scroll down
            goToNextFlick();
        } else if (e.deltaY < 0) {
            // Scroll up
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
        // Add event listener for wheel events globally
        window.addEventListener('wheel', handleGlobalScroll, { passive: true })
    
        // Clean up event listener on component unmount
        return () => {
          window.removeEventListener('wheel', handleGlobalScroll)
        }
      }, [currIndex])
    return (
        <div
            className="overflow-y-auto h-screen focus-visible:outline-0 items-center flex "
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <FlickCard flick={currFlick} 
            classNames={`h-[500px] w-[300px] ${''}`} />
        </div>
    )
}

export default FlickCarousel