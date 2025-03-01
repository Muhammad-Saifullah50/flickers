import { getFlicksByUserId } from '@/actions/flick.actions';
import { getPostsByUserId } from '@/actions/post.actions';
import { getAllUserIds, getCurrentUserFromDb, getDbUserByIdWithDetails } from '@/actions/user.actions'
import FollowButton from '@/components/FollowButton';
import MessageButton from '@/components/MessageButton';
import PostTabs from '@/components/PostTabs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const generateStaticParams = async () => {
    const userIds = await getAllUserIds();

    return userIds.map((id) => {
        return {
            id,
        }
    })
}

const UsersProfilePage = async ({ params }: { params: { id: string } }) => {

    const id = await params.id;

    const user = await getDbUserByIdWithDetails(id);
    const currentUser = await getCurrentUserFromDb();

    const isFollowing = user?.followedBy.some((follow) => follow?.follower.id === currentUser?.id);

    const followId = user?.followedBy.find((follow) => follow.follower.id === currentUser?.id)?.id

    const isOwner = currentUser?.id === user?.id

    const postsPromise = getPostsByUserId(id);
    const flicksPromise = getFlicksByUserId(id)


    return (
        <main className='flex flex-col gap-4 '>
            <section className='flex gap-4 py-4'>
                <div className='flex justify-center items-start'>
                    <Image
                        src={user?.image || '/icons/dummyuser.png'}
                        width={150}
                        height={150}
                        alt='profile photo'
                        className='rounded-full'
                        priority={true} />
                </div>
                <div className='flex flex-col w-full gap-7'>
                    <div className='flex  justify-between w-full pt-3'>
                        <div>
                            
                        <h2 className='font-semibold text-4xl text-white'>{user?.name}</h2>
                        <h3 className='text-lg text-purple-secondary'>{user?.username}</h3>
                        </div>
                        
                        {isOwner ? (
                            <Link href={`/settings`}>
                                <Button>Edit Profile</Button>
                            </Link>
                        ) : (
                            <div className='flex gap-4'>
                                <FollowButton
                                    followerUserId={currentUser?.id!}
                                    userToFollowId={user?.id!}
                                    isFollowing={isFollowing!}
                                    followId={followId}
                                />
                                {currentUser && user && (
                                    <MessageButton
                                        currentUserId={currentUser?.id}
                                        otherUserId={user?.id} />
                                )}
                            </div>
                        )}
                    </div>

                    <div className='flex justify-start items-center gap-8'>
                        <p className='flex items-center gap-2 text-light-2'>
                            <span className='text-purple-primary text-xl font-medium'>{user?.posts.length}</span>
                            {user?.posts.length === 1 ? 'Post' : 'Posts'}
                        </p>
                        <p className='flex items-center gap-2 text-light-2'>
                            <span className='text-purple-primary text-xl font-medium'>{user?.followedBy.length}</span>
                            {
                                user?.followedBy.length === 1 ? 'Follower' : 'Followers'
                            }
                        </p>
                        <p className='flex items-center gap-2 text-light-2'>
                            <span className=' text-purple-primary text-xl font-medium'>{user?.following.length}</span>
                            {
                                user?.following.length === 1 ? 'Following' : 'Following'}
                        </p>
                    </div>

                    <div>
                        <p className='text-base text-light-2'>{user?.bio}</p>
                    </div>
                </div>
            </section>

            <section>
                <PostTabs postsPromise={postsPromise} flicksPromise={flicksPromise} />
            </section>
        </main>
    )
}

export default UsersProfilePage

// have to implement the follow button as done in the user card
