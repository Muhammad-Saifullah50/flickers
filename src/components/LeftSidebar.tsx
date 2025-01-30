import { bottombarLinks, sidebarLinks } from '@/constants';
import Image from 'next/image'
import React from 'react'
import LeftSidebarItem from './LeftSidebarItem';
import Link from 'next/link';
import { getCurrentUserFromDb } from '@/actions/user.actions';

const LeftSidebar = async () => {

  const user = await getCurrentUserFromDb();
  return (
    <aside className='max-sm:hidden w-[270px] bg-dark-2 px-6 pt-8 pb-8 flex flex-col gap-12 overflow-y-scroll min-h-screen relative border-dark-4'>
      <Link href={'/'}>
        <div className="flex justify-start items-center gap-2">
          <Image
            src={'/icons/logo.svg'}
            width={25}
            height={25}
            alt="logo" />

          <h1 className="font-bold text-2xl text-white
          ">Flickers</h1>
        </div>
      </Link>

      {user &&
        <Link href={`/users/${user.id}`} className='flex items-center justify-start gap-4'>
          <Image src={user?.image || '/icons/dummyuser.svg'}
            width={40}
            height={40}
            alt='profile photo'
            className='rounded-full ' />
          <p className='font-bold text-lg text-white'>{user?.name}</p>
        </Link>
      }

      <ul className='flex flex-col gap-4'>
        {sidebarLinks.map((item) => (
          <LeftSidebarItem
            key={item.route}
            link={item.route}
            label={item.label}
            icon={item.icon}
            whiteIcon={item.whiteIcon}
          />
        ))}
      </ul>

      <ul className='flex justify-end flex-col'>
        {bottombarLinks.map((item) => (
          <LeftSidebarItem
            key={item.route}
            link={item.route}
            label={item.label}
            icon={item.icon}
            whiteIcon={item.whiteIcon}

          />
        ))}
      </ul>


    </aside>
  )
}

export default LeftSidebar
