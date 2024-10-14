import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/screens/Forum.css'; 

import { listForumPosts, resetForumPostCreate } from '../actions/userActions'
import { Alert, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ForumPost from '../components/ForumPost'


function Forum() {
  const dispatch = useDispatch()

  // Access forum posts from the Redux store
  const forumPostList = useSelector((state) => state.forumPostList)
  const { loading, error, forumPosts } = forumPostList

  // Dispatch action to get forum posts when the component loads
  useEffect(() => {
    dispatch(listForumPosts())
  }, [dispatch])

  useEffect(() => {
    // Reset the forum post state when the component mounts
    dispatch(resetForumPostCreate());
  }, [dispatch]);

  return (
    <div className="forum-container">
      <div className="forum-content">
        <h1>Forum</h1> {/* Forum title should be left-aligned */}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div>
            <ForumPost />
            {forumPosts.length === 0 ? (
              <Alert>No posts found</Alert>
            ) : (
              <ul>
                {forumPosts.map((post) => (
                  <li className="forum-box" key={post.id}>
                    <div className="post-info">
                      <img
                        src={post.user.profile_picture}
                        alt={`${post.user.username}'s profile`}
                      />
                      <div className="post-details">
                        <h2>{post.title}</h2>
                        <p className="created-at">
                          Created At: {new Date(post.created_at).toLocaleString()}
                        </p>
                        <p className="username">
                          Posted By: {post.user.username}
                        </p>
                        <p>{post.content}</p>
                        <Link to={`/forum/${post.id}`} className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Forum
