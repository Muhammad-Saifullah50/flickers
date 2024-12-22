import { getFlickById } from "@/actions/flick.actions";
import FlickCard from "@/components/FlickCard";

const FlickIdPage = async ({ params }: { params: { flickId: string } }) => {

    const { flickId } = await params;

    const flick = await getFlickById(flickId);
    return (
        <div >
            <FlickCard flick={flick} classNames="h-[500px] w-[300px]" />
        </div>

    )
}

export default FlickIdPage