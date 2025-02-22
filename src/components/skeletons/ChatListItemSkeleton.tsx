import { Skeleton } from '../ui/skeleton'

const ChatListItemSkeleton = () => {
    return (
        <>
            <div className='flex gap-4'>
                <Skeleton className='rounded-full h-10 w-10' />
                <div className='flex flex-col gap-2 '>
                    <Skeleton className='h-5 w-36 rounded-md' />
                    <Skeleton className='h-5 w-36 rounded-md' />
                </div>
            </div>
            <div className='flex gap-4'>
                <Skeleton className='rounded-full h-10 w-10' />
                <div className='flex flex-col gap-2 '>
                    <Skeleton className='h-5 w-36 rounded-md' />
                    <Skeleton className='h-5 w-36 rounded-md' />
                </div>
            </div>
            <div className='flex gap-4'>
                <Skeleton className='rounded-full h-10 w-10' />
                <div className='flex flex-col gap-2 '>
                    <Skeleton className='h-5 w-36 rounded-md' />
                    <Skeleton className='h-5 w-36 rounded-md' />
                </div>
            </div>
            <div className='flex gap-4'>
                <Skeleton className='rounded-full h-10 w-10' />
                <div className='flex flex-col gap-2 '>
                    <Skeleton className='h-5 w-36 rounded-md' />
                    <Skeleton className='h-5 w-36 rounded-md' />
                </div>
            </div>
        </>
    )
}

export default ChatListItemSkeleton