'use client'

import { getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
import FlickCard from "@/components/FlickCard";
import { Flick, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Loader from "@/components/Loader";


const FlickIdPage = ({ params }: { params: { flickId: string } }) => {

    const router = useRouter();
    const [currFlick, setCurrFlick] = useState<Flick & { author: User } | null>();
    const [prevFlickId, setPrevFlickId] = useState<string | null>(null);
    const [nextFlickId, setNextFlickId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [transitioning, setTransitioning] = useState(false)
    const [direction, setDirection] = useState<'next' | 'prev'>('next')

    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);

                const { flickId } = await params;
                const currentFlick = await getFlickById(flickId);

                const flickList = await getPrevAndNextFlicks(flickId);

                const prevFlick = flickList?.[0];
                const nextFlick = flickList?.[1];

                if (nextFlickId )router.prefetch(`/flicks/${nextFlickId}`);


                setCurrFlick(currentFlick)

                //@ts-expect-error
                setPrevFlickId(prevFlick?.id)
                //@ts-expect-error
                setNextFlickId(nextFlick?.id)

            } catch (error) {
                console.error('errror fetching flicks', error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [params, nextFlickId,router])


    const handleGlobalScroll = (e: WheelEvent) => {
        if (transitioning) return


        if (e.deltaY > 0 && nextFlickId) {
            setTransitioning(true)
            setDirection('next')
            setLoading(true)
            router.push(`/flicks/${nextFlickId}`)
            setLoading(false)

        }
        if (e.deltaY < 0 && prevFlickId) {
            setTransitioning(true)
            setDirection('prev')
            setLoading(true)
            router.push(`/flicks/${prevFlickId}`)
            setLoading(false)

        }

        setTimeout(() => {
            setTransitioning(false)
        }, 200);
    }

    useEffect(() => {
        if (currFlick) {
            window.addEventListener('wheel', handleGlobalScroll, { passive: true })
        }
        return () => {
            window.removeEventListener('wheel', handleGlobalScroll)
        }
    }, [currFlick?.id, nextFlickId, prevFlickId, transitioning,currFlick, handleGlobalScroll])


    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (transitioning) return;

        if (e.key === 'ArrowDown' && nextFlickId) {
            setTransitioning(true)
            setDirection('next')
            setLoading(true)
            router.push(`/flicks/${nextFlickId}`)
            setLoading(false)


        }
        if (e.key === 'ArrowUp' && prevFlickId) {
            setTransitioning(true)
            setDirection('prev')
            setLoading(true)
            router.push(`/flicks/${prevFlickId}`)
            setLoading(false)

        }

        setTimeout(() => {
            setTransitioning(false)
        }, 200);
    }

    return (
        <div
            className="h-full flex flex-col gap-6 items-center justify-center overflow-y-scroll focus-visible:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            
            {currFlick ?
                <AnimatePresence>
                    <motion.div
                        key={currFlick?.id}
                        className=""
                        initial={{ y: direction === 'prev' ? -500 : 500 }}
                        animate={{ y: 0 }}
                        exit={{ y: direction === 'prev' ? 500 : -500 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FlickCard
                            flick={currFlick!}
                            classNames="w-[300px] h-[500px]"
                            loading={loading}
                        />
                    </motion.div>
                </AnimatePresence> : (
                    <Loader variant="purple"/>
                )}
        </div>
    )
}

export default FlickIdPage

// there is some glitch in the previous flick