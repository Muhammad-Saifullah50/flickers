import { getCurrentUserFromDb, getDbUserByIdWithDetails } from '@/actions/user.actions'
import MessageButton from '@/components/MessageButton';
import PostTabs from '@/components/PostTabs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const UsersProfilePage = async ({ params }: { params: { id: string } }) => {

    const id = await params.id;

    const user = await getDbUserByIdWithDetails(id)
    const currentUser = await getCurrentUserFromDb();
    return (
        <main className='flex flex-col gap-4'>
            <section className='flex gap-4 py-4'>
                <div className='flex justify-center items-start'>
                    <Image
                        src={user?.image!}
                        width={150}
                        height={150}
                        alt='profile photo'
                        className='rounded-full'
                        priority={true} />
                </div>
                <div className='flex flex-col w-full gap-7'>
                    <div className='flex justify-between w-full pt-3'>
                        <h2 className='font-semibold text-4xl'>{user?.name}</h2>
                        <div className='flex gap-4'>
                            <Button>Follow</Button>
                            <MessageButton 
                            currentUserId={currentUser?.id!}
                            otherUserId={user?.id!}/>
                        </div>
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
                        {/* have to add the bio */}
                    </div>
                </div>
            </section>

            <section>
                <PostTabs posts={user?.posts} />
            </section>
        </main>
    )
}

export default UsersProfilePage