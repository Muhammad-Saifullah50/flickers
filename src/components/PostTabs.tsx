import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flick, Like, Post, User } from "@prisma/client"
import Image from "next/image"
import { Suspense, use } from "react"
import SquarePostsGrid from "./SquarePostsGrid"
import SquarePostsGridSkeleton from "./skeletons/SquarePostsGridSkeleton"

interface PostTabsProps {
    postsPromise: Promise<(Post & { author: User }[])>
    flicksPromise: Promise<(Flick & { author: User, likes: Like[] })>
}

const PostTabs = ({ postsPromise, flicksPromise }: PostTabsProps) => {

    return (
        <Tabs defaultValue="posts">
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

            <TabsContent value="posts">
                <Suspense fallback={<SquarePostsGridSkeleton />}>
                    <SquarePostsGrid itemsPromise={postsPromise} />
                </Suspense>
            </TabsContent>
            <TabsContent value="flicks">
                <SquarePostsGrid itemsPromise={flicksPromise} isFlicks />
            </TabsContent>
        </Tabs>

    )
}

export default PostTabs
