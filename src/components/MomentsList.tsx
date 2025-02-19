import { Moment, User } from "@prisma/client"
import { Suspense, use } from "react"
import CreateMomentButton from "./CreateMomentButton"
import MomentModal from "./modals/MomentModal"
import { getRecentMoments } from "@/actions/moments.actions"
import MomentSkeleton from "./skeletons/MomentSkeleton"

const MomentsList = async ({ currentUser }: { currentUser: User | null }) => {

    const moments = await getRecentMoments();


    return (
        <section className="pb-6 flex gap-4 justify-start ">
            <Suspense fallback={<MomentSkeleton />}>
            <CreateMomentButton userId={currentUser?.id} userImage={currentUser?.image} />

            <div className="flex justify-start overflow-x-auto gap-6 momentdiv ">
                {moments && moments?.map((moment: Moment & {author: User}) => (
                    <div key={moment.id}>
                        <MomentModal moment={moment} allMoments={moments} />
                    </div>
                ))}
            </div>
            </Suspense>
        </section>
    )
}

export default MomentsList
