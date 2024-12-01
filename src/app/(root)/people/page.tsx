import { getAllUsers, getCurrentUserFromDb } from '@/actions/user.actions';
import Heading from '@/components/Heading'
import UserCard from '@/components/UserCard';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const PeoplePage = async () => {
    
    const currentUser = await getCurrentUserFromDb();

    const allUsers = await getAllUsers();

    return (
        <section >
            <Heading text='All Users' icon='/icons/people-white.svg' />

            <div className='flex flex-wrap gap-4 py-9'>
                {allUsers && allUsers.filter((user) => user.id !== currentUser.id).map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>


        </section>
    )
}

export default PeoplePage