import { getCurrentUserFromDb } from "@/actions/user.actions"
import Image from "next/image"
import Link from "next/link"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import SignoutBtn from "./SignoutBtn"


const MobileNavbar = async () => {

    const user = await getCurrentUserFromDb();

    return (
        <nav className="sm:hidden flex sticky top-0 z-50 bg-dark-2 border-b border-dark-4 p-4 h-[64px] items-center justify-between">
            <div>
                <Link href={'/'}>
                    <div className="flex justify-start items-center gap-2">
                        <Image
                            src={'/icons/logo.svg'}
                            width={25}
                            height={25}
                            alt="logo" />

                        <h1 className="font-semibold text-2xl">Flickers</h1>
                    </div>
                </Link>
            </div>
            <div className="flex gap-4 ">
                {user && (
                    <Image
                        src={user.image!}
                        width={30}
                        height={30}
                        className="rounded-full"
                        alt='profile photo'
                    />
                )}


                < Sheet >
                    <SheetTrigger>
                        <Image
                            src={'/icons/menu.svg'}
                            width={30}
                            height={30}
                            alt="menu"
                        />
                    </SheetTrigger>
                    <SheetContent side={'top'} className="flex flex-col gap-6 !bg-dark-3 !bg-opacity-95 !rounded-[10px] !border-none">
                        <Link href={'/explore'} className="flex justify-start gap-4">
                        <SheetClose asChild>
                            <Image
                                src={'/icons/explore.svg'}
                                width={20}
                                height={20}
                                className=""
                                alt="explore"
                            />
                            Explore
                            </SheetClose>
                            </Link>
                        <Link href={'/notifications'} className="flex justify-start gap-4" >
                            <Image
                                src={'/icons/notifications.svg'}
                                width={20}
                                height={20}
                                className=""
                                alt="notifications"
                            />
                            Notifications</Link>
                            <Link href={'/settings'} className="flex justify-start gap-4">
                            <Image
                                src={'/icons/settings.svg'}
                                width={20}
                                height={20}
                                className=""
                                alt="settings"
                            />
                            Settings</Link>
                        
                        <SignoutBtn/>
                    </SheetContent>
                </Sheet >
            </div>
        </nav>
    )
}

export default MobileNavbar


