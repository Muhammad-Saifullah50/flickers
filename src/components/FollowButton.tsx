'use client'
import { Button } from './ui/button'
import { followUser, unfollowUser } from '@/actions/follow.actions';
interface FollowButtonProps {
    followerUserId: string;
    userToFollowId: string;
    isFollowing: boolean
    followId?: string
}
const FollowButton = ({ followerUserId, userToFollowId, isFollowing, followId }: FollowButtonProps) => {

    const handleFollow = async () => {
        await followUser(userToFollowId, followerUserId);
    }

    const handleUnfollow = async () => {
        if (followId) await unfollowUser(followId)
    }

    return (
            <Button
                onClick={isFollowing ? handleUnfollow : handleFollow}
                >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
    )
}

export default FollowButton