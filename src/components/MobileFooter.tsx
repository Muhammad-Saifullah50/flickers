import { mobileFooterLinks } from "@/constants"
import Image from "next/image"

const MobileFooter = () => {
    return (
        <footer className="flex p-4 justify-around sticky bottom-0 z-[1000] bg-dark-3 bg-opacity-95 h-[80px] w-screen rounded-[20px]">
            {mobileFooterLinks.map((link) => {
                return (
                    <div
                        key={link.route}
                        className="flex flex-col justify-center items-center">
                        <Image
                            src={link.icon}
                            width={25}
                            height={25}
                            alt={link.route}
                            className=""
                        />
                        <h5>{link.label}</h5>
                    </div>
                )
            })}
        </footer>
    )
}

export default MobileFooter