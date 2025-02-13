import { Moment, User } from "@prisma/client"
import { use } from "react"
import CreateMomentButton from "./CreateMomentButton"
import MomentCircle from "./MomentCircle"

const MomentsList = ({ momentsPromise, currentUser }: { momentsPromise: Promise<Moment[]>, currentUser: User | null }) => {

    const moments = use(momentsPromise)

    return (
        <section className="pb-6 flex gap-4">
            <CreateMomentButton userId={currentUser?.id} userImage={currentUser?.image} />
            {moments && moments.map((moment: Moment) => (
                <div key={moment.id}>
                    <MomentCircle moment={moment} />
                </div>
            ))}
        </section>
    )
}

export default MomentsList