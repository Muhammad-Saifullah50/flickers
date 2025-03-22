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

const MessageAssetModal = ({ src, isVideo }: { src: string, isVideo: boolean }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {isVideo ? (
                    <video
                        src={src}
                        width={200}
                        height={200}
                        autoPlay={false}
                        muted
                        className="rounded-lg"
                    />
                ) : (
                    <Image
                        src={src}
                        width={200}
                        height={200}
                        alt={'image'}
                        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
                        placeholder='blur'
                        className="rounded-lg"
                    />
                )}

            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="sr-only">{isVideo ? 'Video' : 'Image'}</DialogTitle>

                </DialogHeader>
                {isVideo ? (
                    <video
                        src={src}
                        width={'100%'}
                        height={'100%'}
                        autoPlay
                        controls
                        className="rounded-lg"
                    />
                ) : (
                    <Image
                        src={src}
                        width={1000}
                        height={1000}
                        alt={'image'}
                        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
                        placeholder='blur'
                        className="rounded-lg"
                    />
                )}

            </DialogContent>
        </Dialog>
    )
}

export default MessageAssetModal