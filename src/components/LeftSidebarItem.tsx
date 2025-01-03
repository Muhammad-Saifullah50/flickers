'use client'

import { signoutOnServer } from "@/actions/auth.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LeftSidebarItemProps = {
    link: string
    label: string
    icon: string
    whiteIcon?: string
};

const LeftSidebarItem = ({ link, label, icon, whiteIcon }: LeftSidebarItemProps) => {

    const pathname = usePathname();

    const isActive = pathname === `${link}`;

    const isLogoutLink = link === '/logout';

    return (
        <div className="relative">
            {isActive && 
            <span className="bg-purple-primary w-4 h-[63px] rounded-r-full absolute -left-8" />}
            <Link
                href={isLogoutLink ? '#' : link}
                onClick={() => {
                    if (isLogoutLink) {
                       signoutOnServer();
                    }
                }}
            >
                <li className={cn("w-full rounded-lg p-4  flex items-center justify-start gap-6", {
                    'bg-purple-primary': isActive
                })}>

                    <Image
        //@ts-expect-error have to correct this 
        src={isActive ? whiteIcon : icon}
                        width={20}
                        height={20}
                        alt="icon"
                    />
                    <h2 className={cn("text-lg font-medium", { 'font-bold': isActive })}>{label}</h2>
                </li>
            </Link>
        </div>)
}

export default LeftSidebarItem

// button whote variant