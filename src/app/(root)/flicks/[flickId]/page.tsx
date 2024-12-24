import { getAllFlicks, getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
import FlickCarousel from "@/components/FlickCarousel";

const FlickIdPage = async ({ params }: { params: { flickId: string } }) => {

    const { flickId } = await params;

    const currFlick = await getFlickById(flickId);

    const flickList = await getPrevAndNextFlicks(flickId);

    
    const prevFlick = flickList?.[0];
    const nextFlick = flickList?.[1];

// dimagh lagana hai
    return (
       <FlickCarousel currFlick={currFlick!} flickList={flickList!}/>

    )
}

export default FlickIdPage