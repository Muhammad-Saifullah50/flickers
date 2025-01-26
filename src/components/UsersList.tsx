import { Follows, User } from "@prisma/client"
import { use } from "react"
import UserCard from "./UserCard"

type UsersListProps = {
    currentUserPromise: Promise<User & {followedBy: Follows[], following: Follows[]} | undefined>
    allUsersPromise: Promise<(User & {followedBy: Follows[], following: Follows[]})[] | undefined>
}

const UsersList = ({ currentUserPromise, allUsersPromise }: UsersListProps) => {

    const currentUser = use(currentUserPromise)
    const allUsers = use(allUsersPromise)
    const usersToDisplay = allUsers?.filter((user) => user.id !== currentUser?.id)
    return (
        <div className='flex flex-wrap gap-4 py-9'>
            {usersToDisplay && usersToDisplay.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}

export default UsersList