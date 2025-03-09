
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import SignoutBtn from './SignoutBtn'

const MobileNavSheet = () => {


    return (
        <Sheet >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetTrigger>
                <Image
                    src={'/icons/menu.svg'}
                    width={30}
                    height={30}
                    alt="menu"
                />
            </SheetTrigger>
            <SheetContent side={'top'} className="flex flex-col gap-6 !bg-dark-3 !bg-opacity-95 !rounded-[10px] !border-none">

                <SheetClose asChild>
                    <Link href={'/explore'} className="flex justify-start gap-4" >

                        <Image
                            src={'/icons/explore.svg'}
                            width={20}
                            height={20}
                            className=""
                            alt="explore"
                        />
                        Explore
                    </Link>
                </SheetClose>


                <SheetClose asChild>
                    <Link href={'/settings'} className="flex justify-start gap-4" >
                        <Image
                            src={'/icons/settings.svg'}
                            width={20}
                            height={20}
                            className=""
                            alt="settings"
                        />
                        Settings</Link>
                </SheetClose>

            <SignoutBtn />
        </SheetContent>
        </Sheet >
    )
}

export default MobileNavSheet