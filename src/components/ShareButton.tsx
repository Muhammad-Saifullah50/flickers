'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react";
import ShareButtons from "./ShareButtons";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
    link: string;
    modalOpen: boolean;
    authorName: string;
    caption: string;
    itemId: string,
    currentShares?: number
}

const ShareButton = ({link, modalOpen, authorName, caption, itemId, currentShares}: ShareButtonProps) => {

    const [open, setOpen] = useState(modalOpen);

    const handleClick = () => {
        navigator.clipboard.writeText(link);
        setOpen(false);
        
        toast( {
            title: "Copied to clipboard",
            variant: "default",
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Image
                src={'/icons/share.svg'}
                width={20}
                height={20}
                alt="share"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share</DialogTitle>
                    <DialogDescription>
                        Share with your friends via the link or share through Whatsapp.
                    </DialogDescription>
                </DialogHeader>
                    <div className="flex  items-center justify-center gap-6">
                        <Label  className="text-right">
                        Link
                        </Label>
                        <Input
                            id="name"
                            value={link}
                            readOnly
                            className="col-span-3"
                        />
                    </div>

                    <ShareButtons 
                    url={link} 
                    title={`${authorName} posted on Flickers`} 
                    message={caption}
                    postId={itemId}
                    currentShares={currentShares}/>
    
                <DialogFooter>
                    <Button onClick={handleClick}>Copy Link</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareButton