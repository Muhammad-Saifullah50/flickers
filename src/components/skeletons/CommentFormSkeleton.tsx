import { Skeleton } from "../ui/skeleton"

const CommentFormSkeleton = () => {
  return (
    <div className="flex space-x-4 items-center">
        <Skeleton className="w-14 h-10 rounded-full" />
        <Skeleton className="h-8 w-full" />
    </div>
  )
}

export default CommentFormSkeleton