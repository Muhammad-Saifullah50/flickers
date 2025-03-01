'use client';

import { createChat } from "@/actions/chat.actions";
import { Button } from "./ui/button"
import { useState } from "react";
import Loader from "./Loader";

const MessageButton = ({ currentUserId, otherUserId }: { currentUserId: string, otherUserId: string }) => {

    const [loading, setLoading] = useState(false);

    const handleCreateChat = async () => {

        try {
            setLoading(true);
            // will check for existing chat and the create a new one if need be in the database
            await createChat(currentUserId, otherUserId);

            
        } catch (error) {
            console.error('Error creating chat on client:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button onClick={handleCreateChat} className="!bg-white !text-black font-medium">
            {loading ? <Loader variant="white" /> : "Message"}</Button>
    )
}

export default MessageButton