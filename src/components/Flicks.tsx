import { Flick, User } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import FlickCard from "./FlickCard"
import { getAllFlicks, getFlicksByQuery, getfollowingFlicks, getMostViewedFlicks, getPopularFlicks } from "@/actions/flick.actions";
import FlickModal from "./FlickModal";

const Flicks = async ({ query }: { query: string }) => {

    let flicks: (Flick & { author: User })[] | undefined = [];

    if (query) {
        flicks = await getFlicksByQuery(query);
    } else {
        flicks = await getAllFlicks();
    };

    const followingFlicks = await getfollowingFlicks();
    const popularFlicks = await getPopularFlicks();
    const mostViewedFlicks = await getMostViewedFlicks();



    return (

        <>
        <Tabs defaultValue="foryou" className="">
            <TabsList className="flex flex-wrap !bg-dark-2">
                <TabsTrigger value="foryou" className="md:px-[20px] lg:!px-[50px]">For You</TabsTrigger>
                <TabsTrigger value="following" className="md:px-[20px]lg:!px-[50px]">Following</TabsTrigger>
                <TabsTrigger value="popular" className="md:px-[20px]  lg:!px-[50px]">Popular</TabsTrigger>
                <TabsTrigger value="mostviewed" className="md:px-[20px] lg:!px-[50px]">Most Viewed</TabsTrigger>

            </TabsList>

            <TabsContent value="foryou" className="flex gap-10 flex-wrap py-8">
                {flicks && flicks.length > 0 ? flicks?.map((flick) => (
                    <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] sm:w-[240px] w-full" />
                )) : (
                    <div className='flex items-center justify-center w-full  absolute'>

                    <p >No flicks found for '{query}'</p>
                  </ div>
                )}
            </TabsContent>
            <TabsContent value="following" >
                {followingFlicks?.length === 0 ? (
                    <p className="h-full flex items-center justify-center">No following flicks found</p>
                ) : (
                    <div className="flex gap-10 flex-wrap py-8">
                        {popularFlicks?.map((flick) => (
                            <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] sm:w-[240px] w-full" />))}
                    </div>
                )}
            </TabsContent>
            <TabsContent value="popular"  >
                {
                    popularFlicks?.length === 0 ? (
                        <p className="h-full flex items-center justify-center">No popular flicks found</p>
                    ) : (
                        <div className="flex gap-10 flex-wrap py-8">
                            {popularFlicks?.map((flick) => (
                                <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] sm:w-[240px] w-full" />))}
                        </div>
                    )
                }

            </TabsContent>
            <TabsContent value="mostviewed" >
                {
                    mostViewedFlicks?.length === 0 ? (
                        <p className="h-full flex items-center justify-center">No most viewed flicks found</p>
                    ) : (
                        <div  className="flex gap-10 flex-wrap py-8">
                            {mostViewedFlicks?.map((flick) => (
                                <FlickCard key={flick?.id} flick={flick} classNames="h-[400px] sm:w-[240px] w-full" />))}
                        </div>
                    )
                }

            </TabsContent>
        </Tabs>

                            </>

    )
}
export default Flicks