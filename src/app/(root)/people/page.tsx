import { getAllUsers, getCurrentUserFromDb } from '@/actions/user.actions';
import Heading from '@/components/Heading'
import UserCardSkeleton from '@/components/skeletons/UserCardSkeleton';
import UserCard from '@/components/UserCard';
import { Suspense } from 'react';

const PeoplePage = async () => {

    const currentUser = await getCurrentUserFromDb();

    const allUsers = await getAllUsers();

    return (
        <section >
            <Heading text='All Users' icon='/icons/people-white.svg' />


            <Suspense fallback={
                  <div className='flex flex-wrap gap-4 py-9'>
                  {Array.from({ length: allUsers?.length! -1 || 8 }).map((_, index) => (
                      <UserCardSkeleton key={index} />
                  ))}
              </div>
            }>
                <div className='flex flex-wrap gap-4 py-9'>
                    {allUsers && allUsers.filter((user) => user.id !== currentUser?.id).map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            </Suspense>


        </section>
    )
}

export default PeoplePage