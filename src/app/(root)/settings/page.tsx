import { getCurrentUserFromDb } from '@/actions/user.actions'
import Heading from '@/components/Heading'
import ProfileForm from '@/components/forms/ProfileForm'

const SettingsPage =  async () => {

  const user = await getCurrentUserFromDb();
  return (
    <main>
      <Heading text='Profile Settings' icon='/icons/edit-white.svg' />

      <section className="flex flex-col gap-6 py-9">
        <ProfileForm user={user!}/>
      </section>
    </main>
  )
}

export default SettingsPage