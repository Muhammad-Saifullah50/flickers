'use client'
import { Moment, User } from '@prisma/client'
import Image from 'next/image'

interface MomentCircleProps {
  moment: Moment & { author: User }
  classNames?: string
  setModalOpen: (open: boolean) => void
}

const MomentCircle = ({ moment, classNames, setModalOpen }: MomentCircleProps) => {

  return (
    <div onClick={( ) => setModalOpen(true)} className={`flex flex-col items-center justify-center gap-2 ${classNames}`}>
      <div className="bg-[linear-gradient(180deg,#877EFF_0%,#685DFF_46.15%,#3121FF_100%)] rounded-full p-0.5">


        <div className="relative bg-dark-2 rounded-full p-[2px]">

          <Image
            src={moment.author.image || '/icons/dummyuser.png'}
            width={45} height={45}
            alt="user"
            className="rounded-full"
          />

        </div>
      </div>

      <span className="text-xs text-light-2 line-clamp-1 text-center
      ">
        {moment.author.name.split(' ')[0]}
      </span>
    </div>
  )
}

export default MomentCircle