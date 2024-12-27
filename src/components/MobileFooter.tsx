'use client'
import { mobileFooterLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

const MobileFooter = () => {

    const pathname = usePathname();
    const router = useRouter();
    return (
        <footer className="sm:hidden flex p-4 justify-around sticky bottom-0 z-[1000] bg-dark-3 bg-opacity-95 h-[80px] w-full rounded-t-[20px]">
            {mobileFooterLinks.map((link) => {
                    const isActive = pathname === `${link.route}`;
                return (
                    <div
                        onClick={() => router.push(link.route)}
                        key={link.route}
                        className={cn("flex flex-col justify-center items-center p-2 rounded-lg", isActive && 'bg-purple-primary')}>
                        <Image
                            src={isActive ? link.whiteIcon : link.icon}
                            width={22}
                            height={22}
                            alt={link.route}
                            className=""
                        />
                        <h5 className="text-[10px]">{link.label}</h5>
                    </div>
                )
            })}
        </footer>
    )
}

export default MobileFooter