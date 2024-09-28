import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingList } from '../actions/userActions'; // Import your action
import { ListGroup } from 'react-bootstrap';

const Following = () => {
    const dispatch = useDispatch();

    const followingList = useSelector((state) => state.followingList);
    const { loading, error, following } = followingList;

    useEffect(() => {
        dispatch(getFollowingList());
    }, [dispatch]);

    return (
        <div>
            <h1>Following</h1>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    {following.map((username) => (
                        <ListGroup.Item key={username}>
                            {username}
                        </ListGroup.Item>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Following;