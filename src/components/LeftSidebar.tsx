import { bottombarLinks, sidebarLinks } from '@/constants';
import { auth } from '@/lib/auth'
import Image from 'next/image'
import React from 'react'
import LeftSidebarItem from './LeftSidebarItem';
import Link from 'next/link';

const LeftSidebar = async () => {

  const session = await auth();
  return (
    <aside className='w-[270px] bg-dark-2 px-6 pt-8 pb-8 flex flex-col gap-12 overflow-y-scroll relative border-dark-4'>
      <Link href={'/'}>
        <div className="flex justify-start items-center gap-2">
          <Image
            src={'/icons/logo.svg'}
            width={25}
            height={25}
            alt="logo" />

          <h1 className="font-bold text-2xl">Flickers</h1>
        </div>
      </Link>

      {session?.user && <div className='flex items-center justify-start gap-4'>
        <Image src={session?.user?.image || '/icons/dummyuser.svg'}
          width={40}
          height={40}
          alt='profile photo'
          className='rounded-full ' />
        <p className='font-bold text-lg'>{session?.user?.name}</p>
      </div>}

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
          />
        ))}
      </ul>


    </aside>
  )
}

export default LeftSidebar
