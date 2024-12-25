'use client'
import { getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
import FlickCard from "@/components/FlickCard";
import { Flick, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"

type FlickWithAuthor = {
    flick: Flick & { author: User }
}

const FlickIdPage = ({ params }: { params: { flickId: string } }) => {

    const router = useRouter();
    const [currFlick, setCurrFlick] = useState<FlickWithAuthor | null>(null);
    const [prevFlickId, setPrevFlickId] = useState<string | null>(null);
    const [nextFlickId, setNextFlickId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);

                const { flickId } = await params;
                const currentFlick = await getFlickById(flickId);

                const flickList = await getPrevAndNextFlicks(flickId);

                const prevFlick = flickList?.[0];
                const nextFlick = flickList?.[1];

                setCurrFlick(currentFlick)
                setPrevFlickId(prevFlick?.id!)
                setNextFlickId(nextFlick?.id!)

            } catch (error) {
                console.error('errror fetching flicks', error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [params])

    const handleGlobalScroll = (e: WheelEvent) => {
        console.log('global scroll working')
        if (e.deltaY > 0) nextFlickId && router.push(`/flicks/${nextFlickId}`)
        if (e.deltaY < 0) prevFlickId && router.push(`/flicks/${prevFlickId}`)
    }

    useEffect(() => {
        if (currFlick) {
            window.addEventListener('wheel', handleGlobalScroll, { passive: true })
        }
        return () => {
            window.removeEventListener('wheel', handleGlobalScroll)
        }
    }, [currFlick?.id, nextFlickId, prevFlickId])


    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (e.key === 'ArrowDown') nextFlickId && router.push(`/flicks/${nextFlickId}`)
        else if (e.key === 'ArrowUp') prevFlickId && router.push(`/flicks/${prevFlickId}`)
    }

    return (
        <div
            className="h-full flex flex-col gap-6 items-center justify-center overflow-y-scroll focus-visible:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {prevFlickId &&
                <motion.div>
                    <FlickCard flick={null} loading={loading} flickId={ prevFlickId} />
                </motion.div>}

            {currFlick &&
                <motion.div>
                    <FlickCard
                        flick={currFlick!}
                        classNames="w-[300px] h-[500px]"
                        loading={loading} />
                </motion.div>}

            {nextFlickId &&
                <motion.div>
                    <FlickCard flick={null} loading={loading} flickId={ nextFlickId} />
                </motion.div>}
        </div>
    )
}

export default FlickIdPage

// there is some glitch in the previous flick