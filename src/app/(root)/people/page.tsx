import { getAllUsers, getCurrentUserFromDb } from '@/actions/user.actions';
import Heading from '@/components/Heading'
import UserCardSkeleton from '@/components/skeletons/UserCardSkeleton';
import UsersList from '@/components/UsersList';
import { Metadata } from 'next';
import { Suspense } from 'react';


export const metadata: Metadata = {
    title: 'People',
    description: 'Search for people',
   
  }
const PeoplePage = () => {

    const currentUserPromise =  getCurrentUserFromDb();
    const allUsersPromise =  getAllUsers();
// somethings wriong in producxtiion here
    return (
        <section >
            <Heading text='All Users' icon='/icons/people-white.svg' />


            <Suspense fallback={
                <div className='flex flex-wrap gap-4 py-9'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <UserCardSkeleton key={index} />
                    ))}
                </div>
            }>
                <UsersList 
                currentUserPromise={currentUserPromise} 
                allUsersPromise={allUsersPromise}/>
            </Suspense>


        </section>
    )
}

export default PeoplePage