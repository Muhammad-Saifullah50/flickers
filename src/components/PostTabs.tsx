import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// interface PostTabsProps { 
//     posts: Post[]  | undefined
// }
const PostTabs = () => {
    return (
        <Tabs defaultValue="posts" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="flicks">Flicks</TabsTrigger>
                {/* <TabsTrigger value="tagged">Tagged</TabsTrigger> */}
            </TabsList>

            <TabsContent value="posts">Make changes to your account here.</TabsContent>
            <TabsContent value="flicks">Change your password here.</TabsContent>
            <TabsContent value="tagged">Change your password here.</TabsContent>
        </Tabs>

    )
}

export default PostTabs