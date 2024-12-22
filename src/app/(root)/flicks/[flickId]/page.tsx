import { getAllFlicks, getFlickById } from "@/actions/flick.actions";
import FlickCarousel from "@/components/FlickCarousel";

const FlickIdPage = async ({ params }: { params: { flickId: string } }) => {

    const { flickId } = await params;

    const currFlick = await getFlickById(flickId);

    const flickList = await getAllFlicks().then((res) => res?.map((flick) => flick.id));
    return (
       <FlickCarousel currFlick={currFlick!} flickList={flickList!}/>

    )
}

export default FlickIdPage