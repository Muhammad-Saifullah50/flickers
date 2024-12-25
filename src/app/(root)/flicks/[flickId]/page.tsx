import { getAllFlicks, getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
import FlickCarousel from "@/components/FlickCarousel";

const FlickIdPage = async ({ params }: { params: { flickId: string } }) => {

    const { flickId } = await params;

    const currFlick = await getFlickById(flickId);

    const flickList = await getPrevAndNextFlicks(flickId);

    const prevFlick = flickList?.[0];
    const nextFlick = flickList?.[1];

    return (


            <FlickCarousel
                currFlick={currFlick!}
                prevFlick={prevFlick!}
                nextFlick={nextFlick!} />
    )
}

export default FlickIdPage