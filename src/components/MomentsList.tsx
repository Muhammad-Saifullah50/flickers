import { Moment, User } from "@prisma/client"
import { use } from "react"
import CreateMomentButton from "./CreateMomentButton"
import MomentCircle from "./MomentCircle"

const MomentsList = ({ momentsPromise, currentUser }: { momentsPromise: Promise<(Moment & {author: User})[]>, currentUser: User | null }) => {

    const moments = use(momentsPromise)

    return (
        <section className="pb-6 flex gap-4 justify-start ">
            <CreateMomentButton userId={currentUser?.id} userImage={currentUser?.image} />

            <div className="flex justify-start overflow-x-auto gap-6 momentdiv">
                {moments && moments.map((moment: Moment) => (
                    <div key={moment.id}>
                        <MomentCircle moment={moment} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MomentsList