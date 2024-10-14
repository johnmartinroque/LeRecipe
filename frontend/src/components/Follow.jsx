import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser, getFollowingList } from '../actions/userActions';
import '../css/components/Follow.css'

const Follow = ({ userId }) => {
    const dispatch = useDispatch();

    const followingListState = useSelector((state) => state.followingList);
    const { following = [], loading: loadingFollowingList } = followingListState;

    const isFollowing = following.some(user => user.id === userId);

    useEffect(() => {
        if (following.length === 0) {
            dispatch(getFollowingList());
        }
    }, [dispatch, following.length]);

    const handleFollow = () => {
        if (isFollowing) {
            dispatch(unfollowUser(userId));
        } else {
            dispatch(followUser(userId));
        }
    };

    return (
        <button className="follow-button" onClick={handleFollow} disabled={loadingFollowingList}>
            {loadingFollowingList ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default Follow;
