import { getCurrentUserFromDb } from "@/actions/user.actions"
import Image from "next/image"
import Link from "next/link"
import MobileNavSheet from "./MobileNavSheet"



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

                        <h1 className="font-semibold text-2xl text-white">Flickers</h1>
                    </div>
                </Link>
            </div>
            <div className="flex gap-4 ">

                {user && (
                    <Link href={`/users/${user.id} `}>
                        <Image
                            src={user.image!}
                            width={30}
                            height={30}
                            className="rounded-full"
                            alt='profile photo'
                        />
                    </Link>
                )}
                <MobileNavSheet />
            </div>
        </nav>
    )
}

export default MobileNavbar


