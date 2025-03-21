import { getCurrentUserFromDb } from '@/actions/user.actions'
import Heading from '@/components/Heading'
import ProfileForm from '@/components/forms/ProfileForm'
import ProfileFormSkeleton from '@/components/skeletons/ProfileFormSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit your profile',
 
}

const SettingsPage = async () => {

  const user = await getCurrentUserFromDb();
  return (
    <main>
      <Heading text='Profile Settings' icon='/icons/edit-white.svg' />

      <section className="flex flex-col gap-6 py-9">
        <Suspense fallback={<ProfileFormSkeleton />}>
          <ProfileForm user={user!} />
        </Suspense>
      </section>
    </main>
  )
}

export default SettingsPage