'use client';

import { savePost } from "@/actions/save.actions";
import Image from "next/image";
import { useState } from "react";
import Loader from "./Loader";

type SavePostBtn = {
    isHomeCard?: boolean
    userId: string
    postId: string
}

const SavePostBtn = ({ isHomeCard, userId, postId }: SavePostBtn) => {

    if (!userId) return;


    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        try {
            setLoading(true);
            const save = await savePost(userId, postId)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        loading ? (
            <Loader variant="white" />
        ) : (
            <Image
                src={isHomeCard ? '/icons/bookmark.svg' : '/icons/save.svg'}
                width={20}
                height={20}
                alt="savebtn"
                className=""
                    onClick={(e) => { e.stopPropagation(); handleClick() }}
            />
        )
    )
}

export default SavePostBtn