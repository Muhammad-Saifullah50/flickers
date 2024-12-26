'use client';

import { savePost } from "@/actions/save.actions";
import Image from "next/image";
import { useState } from "react";
import Loader from "./Loader";
import { usePathname } from "next/navigation";

type SavePostBtn = {
    isHomeCard?: boolean
    userId: string
    postId: string
}

const SavePostBtn = ({ isHomeCard, userId, postId }: SavePostBtn) => {

    if (!userId) return;


    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === '/';

    let isSaved = false;

    const handleClick = async () => {
        try {
            setLoading(true);
            const save = await savePost(userId, postId, isHomePage && isHomePage)

            if (save?.postId === postId) isSaved = true

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    const homeAndSaved = isHomeCard && isSaved;
    const homeAndNotSaved = isHomeCard && !isSaved;
    const notHomeAndSaved = !isHomeCard && isSaved;
    const notHomeAndNotSaved = !isHomeCard && !isSaved

    return (
        loading ? (
            <Loader variant="white" />
        ) : (
            <Image
                src={
                    (homeAndSaved && '/icons/bookmark-red.svg') || (homeAndNotSaved && '/icons/bookmark.svg') ||
                    (notHomeAndSaved && '/icons/save-red.svg') ||
                    (notHomeAndNotSaved && '/icons/save.svg')
                }
                width={20}
                height={20}
                alt="savebtn"
                className=""
                onClick={(e) => { e.preventDefault(); handleClick() }}
            />
        )
    )
}

export default SavePostBtn