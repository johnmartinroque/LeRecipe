import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingList } from '../actions/userActions'; // Import your action
import { ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/components/Following.css'

const Following = () => {
    const dispatch = useDispatch();

    const followingList = useSelector((state) => state.followingList);
    const { loading, error, following } = followingList;

    useEffect(() => {
        dispatch(getFollowingList());
    }, [dispatch]);

    return (
        <div>
            <h2 style={{fontWeight:"bold"}}>Following</h2>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ListGroup className='following-list'>
                    {following.map((user) => (
                        <ListGroup.Item style={{padding: "10px", textAlign: 'center', justifyContent: 'center'}} key={user.username} className="d-flex align-items-center">
                            {/* Display Profile Picture */}
                            <Image
                                src={user.profile_picture || 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'}  
                                roundedCircle
                                width="50"
                                height="50"
                                className="mr-3"
                                alt={user.username}
                            />
                            {/* Display Username */}
                            <Link style={{textDecoration: "none", padding: "10px", color: 'black', fontSize: '18px'}}to={`/user/${user.id}`}><span>{user.username}</span></Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default Following;
