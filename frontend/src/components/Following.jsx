import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingList } from '../actions/userActions'; // Import your action
import { ListGroup, Image } from 'react-bootstrap';

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
                <ListGroup>
                    {following.map((user) => (
                        <ListGroup.Item key={user.username} className="d-flex align-items-center">
                            {/* Display Profile Picture */}
                            <Image
                                src={user.profile_picture || 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'}  // Provide a default image if profile_picture is null
                                roundedCircle
                                width="50"
                                height="50"
                                className="mr-3"
                                alt={user.username}
                            />
                            {/* Display Username */}
                            <span>{user.username}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default Following;
