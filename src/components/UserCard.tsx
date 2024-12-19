import { Follows, User } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { followUser } from "@/actions/follow.actions"
import FollowButton from "./FollowButton"
import { auth } from "@/lib/auth"
import { getCurrentUserFromDb } from "@/actions/user.actions"
import { redirect } from "next/navigation"

type UserWithFollows = User & {
    followedBy: (Follows & {
        follower: User
    })[];
    following: (Follows & {
        following: User
    })[];
}

const UserCard = async ({ user }: { user: UserWithFollows }) => {

    const currentUser = await getCurrentUserFromDb();

    const isFollowing = user.followedBy.some((follow) => follow.follower.id === currentUser?.id);

    const followId = user.followedBy.find((follow) => follow.follower.id === currentUser?.id)?.id
    
    return (
        <aside className="flex flex-col gap-4  border-[3px] border-dark-3 p-4 rounded-xl h-[320px] w-[320px] items-center justify-center">
            <Image
                src={user.image!}
                width={90}
                height={90}
                alt='profile photo'
                className='rounded-full'
            />

            <h3>{user.name}</h3>

            <FollowButton
                followerUserId={currentUser?.id}
                userToFollowId={user.id}
                isFollowing={isFollowing}
                followId={followId}
            />
        </aside>
    )
}

export default UserCard