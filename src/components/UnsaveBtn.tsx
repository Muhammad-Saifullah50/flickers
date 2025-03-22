'use client'

import { UnsavePostAndFlick } from "@/actions/save.actions"
import Image from "next/image"
import { usePathname } from "next/navigation"

const UnsaveBtn = ({saveId}: {saveId: string}) => {

    const pathname = usePathname()

    const handleClick = async () => {
        await UnsavePostAndFlick(saveId, pathname)
    }
    return (
        <Image
            src={'/icons/save-red.svg'}
            width={20}
            height={20}
            className="absolute top-4 right-4 z-50"
            alt="save"
            onClick={handleClick}
        />
    )
}

export default UnsaveBtn