import { Skeleton } from "../ui/skeleton"

const MomentSkeleton = () => {
    return (
        <div className="flex gap-4 py-2">
            <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="w-20 h-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="w-20 h-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="w-20 h-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="w-20 h-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="w-20 h-2 rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                <Skeleton className="w-20 h-2 rounded-lg" />
            </div>
           
        </div>
    )
}

export default MomentSkeleton