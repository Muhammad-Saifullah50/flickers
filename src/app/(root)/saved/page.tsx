import { getSavedItems } from "@/actions/save.actions"
import Heading from "@/components/Heading"
import SavedPostFlickCard from "@/components/SavedPostFlickCard"
import SquarePostsGridSkeleton from "@/components/skeletons/SquarePostsGridSkeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Suspense } from "react"

const SavedPage = async () => {

    const savedItems = await getSavedItems();
    return (
        <main className="flex flex-col gap-4">
            <section>
                <Heading text="Saved Posts and Flicks" icon="/icons/saved-white.svg" />
            </section>
            <section>
                <Tabs defaultValue="posts" className='mt-4'>
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

                    <TabsContent value="posts" className="flex gap-6  flex-wrap ">
                        <Suspense fallback={<SquarePostsGridSkeleton />}>

                            {savedItems && savedItems.length > 0 ? savedItems?.map((item) => {
                                if (!item.flickId)
                                    return (
                                        <SavedPostFlickCard
                                            postId={item.postId}
                                            key={item.id}
                                            saveId={item.id}
                                        />
                                    )
                            }) : (
                                <div className="flex items-center justify-center w-full h-[calc(100vh-200px)]">
                                    <p>No saved posts yet</p>
                                </div>

                            )}
                        </Suspense>
                    </TabsContent>

                    <TabsContent value="flicks" className="flex gap-6 flex-wrap ">
                        {savedItems && savedItems.length > 0 ? savedItems?.map((item) => {
                            if (!item.postId)
                                return (
                                    <SavedPostFlickCard
                                        key={item.id}
                                        flickId={item.flickId!}
                                        isFlick={true} 
                                        saveId={item.id}
                                        />
                                )
                        }) : (
                            <div className="flex items-center justify-center w-full h-[calc(100vh-200px)]">
                                <p>No saved flicks yet</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
}

export default SavedPage