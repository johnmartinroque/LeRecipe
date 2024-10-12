import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


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
    <div>
      <h1>Forum</h1>

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
                <Link to={`/forum/${post.id}`} style={{textDecoration: 'none', color: 'white'}}>
                <div style={{backgroundColor: 'gray'}}>
                    <li key={post.id} style={{listStyle: 'none'}}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <p>{post.user.username}</p>
                  <img
                    src={post.user.profile_picture}
                    alt={`${post.user.username}'s profile`}
                    style={{ width: '50px', borderRadius: '50%' }}
                  />
                  <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
                </li>
                </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Forum
