import { Flick, Like, User } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import FlickCard from "./FlickCard"
import { getAllFlicks, getFlicksByQuery, getfollowingFlicks, getMostViewedFlicks, getPopularFlicks } from "@/actions/flick.actions";

const Flicks = async ({ query }: { query: string }) => {

    let flicks: Flick[] = [];

    if (query) {
        flicks = await getFlicksByQuery(query);
    } else {
        flicks = await getAllFlicks();
        console.log(flicks, 'flicks')
    };

    const followingFlicks = await getfollowingFlicks();
    const popularFlicks = await getPopularFlicks();
    const mostViewedFlicks = await getMostViewedFlicks();



    return (

        <Tabs defaultValue="foryou" className="">
            <TabsList>
                <TabsTrigger value="foryou" className="!px-[50px]">For You</TabsTrigger>
                <TabsTrigger value="following" className="!px-[50px]">Following</TabsTrigger>
                <TabsTrigger value="popular" className="!px-[50px]">Popular</TabsTrigger>
                <TabsTrigger value="mostviewed" className="!px-[50px]">Most Viewed</TabsTrigger>

            </TabsList>

            <TabsContent value="foryou" className="flex gap-8 py-8">
                {flicks.map((flick) => (
                    <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] w-[240px]" />
                ))}
            </TabsContent>
            <TabsContent value="following" className="flex gap-8 py-8">
                {followingFlicks?.length === 0 ? (
                    <p className="h-full flex items-center justify-center">No following flicks found</p>
                ) : (
                    <div>
                        {popularFlicks?.map((flick) => (
                            <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] w-[240px]" />))}
                    </div>
                )}
            </TabsContent>
            <TabsContent value="popular" className="flex gap-8 py-8">
                {
                    popularFlicks?.length === 0 ? (
                        <p className="h-full flex items-center justify-center">No popular flicks found</p>
                    ) : (
                        <div>
                            {popularFlicks?.map((flick) => (
                                <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] w-[240px]" />))}
                        </div>
                    )
                }

            </TabsContent>
            <TabsContent value="mostviewed" className="flex gap-8 py-8">
                {
                    mostViewedFlicks?.length === 0 ? (
                        <p className="h-full flex items-center justify-center">No most viewed flicks found</p>
                    ) : (
                        <div>
                            {popularFlicks?.map((flick) => (
                                <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] w-[240px]" />))}
                        </div>
                    )
                }

            </TabsContent>
        </Tabs>
    )
}
export default Flicks