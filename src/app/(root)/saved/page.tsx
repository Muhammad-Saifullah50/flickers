import { getSavedItems } from "@/actions/save.actions"
import FlickCard from "@/components/FlickCard"
import Heading from "@/components/Heading"
import PostCard from "@/components/PostCard"
import PostsGrid from "@/components/PostsGrid"
import SavedPostFlickCard from "@/components/SavedPostFlickCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const SavedPage = async () => {

    const savedItems = await getSavedItems();

    return (
        <main className="flex flex-col gap-4">
            <section>
                <Heading text="Saved Posts and Flicks" icon="/icons/saved-white.svg" />
            </section>
            <section>
                <Tabs defaultValue="post" className='mt-4'>
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

                    <TabsContent value="posts" className="grid grid-cols-3 mt-4">
                        {savedItems?.map((item) => {
                            if (!item.flickId)
                                return (
                                    <SavedPostFlickCard
                                        postId={item.postId}
                                        key={item.id}
                                    />
                                )
                        })}
                    </TabsContent>

                    <TabsContent value="flicks" className="grid grid-cols-3 mt-4">
                        {savedItems?.map((item) => {
                            if (!item.postId)
                                return (
                                    <SavedPostFlickCard
                                        key={item.id}
                                        flickId={item.flickId!}
                                        isFlick={true} />
                                )
                        })}
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
}

export default SavedPage