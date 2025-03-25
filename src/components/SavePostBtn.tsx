'use client';

import { savePost, UnsavePostAndFlick } from "@/actions/save.actions";
import Image from "next/image";
import { useState } from "react";
import Loader from "./Loader";
import { usePathname } from "next/navigation";

type SavePostBtn = {
    isHomeCard?: boolean
    userId: string
    postId: string
    isSaved: boolean
    saveId: string | undefined
    handleSavePost?: (postId: string, isSaved: boolean, saveId: string) => void

}

const SavePostBtn = ({ isHomeCard, userId, postId, isSaved, saveId, handleSavePost }: SavePostBtn) => {

    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const [saved, setSaved] = useState(isSaved);

    if (!userId) return;

    const isHomePage = pathname === '/';


    const handleClick = async () => {
        try {
            setLoading(true);

            if (isSaved && saveId) {
                await UnsavePostAndFlick(saveId, pathname)
                setSaved(false)
            } else {
                await savePost(userId, postId, isHomePage && isHomePage)
                setSaved(true)
            }

            if (handleSavePost) {
                handleSavePost(postId, isSaved, saveId || '')
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    const homeAndSaved = isHomeCard && saved;
    const homeAndNotSaved = isHomeCard && !saved;
    const notHomeAndSaved = !isHomeCard && saved;
    const notHomeAndNotSaved = !isHomeCard && !saved

    return (
        loading ? (
            <Loader variant="white" />
        ) : (
            <Image
                //@ts-expect-error have to correct this 
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