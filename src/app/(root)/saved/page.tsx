import { getSavedItems } from "@/actions/save.actions"
import Heading from "@/components/Heading"
import SavedPostCard from "@/components/SavedPostCard"
import SquarePostsGridSkeleton from "@/components/skeletons/SquarePostsGridSkeleton"

import { Metadata } from "next"
import { Suspense } from "react"


export const metadata: Metadata = {
    title: 'Saved Posts',
    description: 'Saved Posts',

}

const SavedPage = async () => {

    const savedItems = await getSavedItems();
    return (
        <main className="flex flex-col gap-4">
            <section>
                <Heading text="Saved Posts" icon="/icons/saved-white.svg" />
            </section>
            <section>
                

                    <div className="flex gap-6  flex-wrap ">
                        <Suspense fallback={<SquarePostsGridSkeleton />}>

                            {savedItems && savedItems.length > 0 ? savedItems?.map((item) => {
                                if (!item.flickId)
                                    return (
                                        <SavedPostCard
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
                    </div>

               
            </section>
        </main>
    )
}

export default SavedPage