import { getSavedItems } from "@/actions/save.actions"
import Heading from "@/components/Heading"
import PostCard from "@/components/PostCard"
import PostsGrid from "@/components/PostsGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const SavedPage = async () => {

    const savedItems = await getSavedItems();

    // have to move on from here tomorrow


    return (
        <main className="flex flex-col gap-4">
            <section>
                <Heading text="Saved Posts and Reels" icon="/icons/saved-white.svg" />
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

                    <TabsContent value="post">
                        <PostsGrid items={ } />
                    </TabsContent>

                    <TabsContent value="flick">

                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
}

export default SavedPage