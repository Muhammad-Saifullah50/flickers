import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// interface PostTabsProps { 
//     posts: Post[]  | undefined
// }
const PostTabs = () => {
    return (
        <Tabs defaultValue="posts" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="posts" className="w-[170px] flex items-center gap-4">
                    <Image
                        src={'/icons/create.svg'}
                        width={20}
                        height={20}
                        alt="Create Post"
                    />
                    Posts
                </TabsTrigger>
                <TabsTrigger value="flicks" className="w-[170px] flex items-center gap-4">
                    <Image
                        src={'/icons/flicks.svg'}
                        width={20}
                        height={20}
                        alt="Create Post"
                    />
                    Flicks</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">Make changes to your account here.</TabsContent>
            <TabsContent value="flicks">Change your password here.</TabsContent>
            <TabsContent value="tagged">Change your password here.</TabsContent>
        </Tabs>

    )
}

export default PostTabs

// have to make the user page grid and the saved page grid same and the merge into one component naved savedItemsComponent