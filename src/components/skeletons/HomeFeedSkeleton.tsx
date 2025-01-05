import { Skeleton } from "../ui/skeleton"

const HomeFeedSkeleton = () => {
    return (

        <div className="flex flex-col gap-6 p-4 border border-dark-3 rounded-3xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <Skeleton className="w-[40px] h-[40px] rounded-full" />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="w-40 h-4 rounded-sm" />
                        <Skeleton className="w-40 h-4 rounded-sm" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="w-4 h-4 rounded-sm" />
                    <Skeleton className="w-4 h-4 rounded-sm" />
                </div>
            </div>

            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-40" />

            <Skeleton className="h-[35rem] w-full " />

            <Skeleton className="w-full h-6 rounded-sm" />

            <div className="flex gap-6">
                <Skeleton className="w-[40px] h-[40px] rounded-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

export default HomeFeedSkeleton