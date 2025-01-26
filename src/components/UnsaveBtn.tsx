'use client'

import { UnsavePostAndFlick } from "@/actions/save.actions"
import Image from "next/image"

const UnsaveBtn = ({saveId}: {saveId: string}) => {

    const handleClick = async () => {
        await UnsavePostAndFlick(saveId)
    }
    return (
        <Image
            src={'/icons/save-red.svg'}
            width={20}
            height={20}
            className="absolute top-4 right-4"
            alt="save"
            onClick={handleClick}
        />
    )
}

export default UnsaveBtn