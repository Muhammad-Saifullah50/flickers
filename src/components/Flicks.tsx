import { Flick, Like, User } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import FlickCard from "./FlickCard"

const Flicks = ({ flicks }: { flicks: Flick & { author: User, like: Like }[] }) => (
    <Tabs defaultValue="foryou" className="">
        <TabsList>
            <TabsTrigger value="foryou" className="!px-[50px]">Posts</TabsTrigger>
            <TabsTrigger value="following" className="!px-[50px]">Flicks</TabsTrigger>
            <TabsTrigger value="popular" className="!px-[50px]">Flicks</TabsTrigger>
            <TabsTrigger value="featured" className="!px-[50px]">Flicks</TabsTrigger>

        </TabsList>

        <TabsContent value="foryou">
            {flicks.map((flick) => (
                <FlickCard key={flick?.id} flick={flick} />      
            ))}
        </TabsContent>
        <TabsContent value="flicks">Change your password here.</TabsContent>
        <TabsContent value="tagged">Change your password here.</TabsContent>
    </Tabs>
)

export default Flicks