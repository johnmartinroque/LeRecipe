import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import '../css/screens/ForumDetailed.css';
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { getForumPostDetails } from "../actions/userActions";
import ForumCommentList from "../components/ForumCommentList";


function ForumDetailed() {
  const { id } = useParams(); // Retrieve the post id from the URL

  const dispatch = useDispatch();

  // Access forum post details from the Redux store
  const forumPostDetails = useSelector((state) => state.forumPostDetails);
  const { loading, error, forumPost } = forumPostDetails;

  useEffect(() => {
    dispatch(getForumPostDetails(id)); // Dispatch the action to get the post details
  }, [dispatch, id]);

  return (
    <div className="forum-detail-container">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="forum-detail-content">
          <div className="forum-detail-box">
            <h1 className="forum-detail-title">{forumPost?.title}</h1>
            <p className="forum-detail-content">{forumPost?.content}</p>
  
            {/* User info section */}
            {forumPost?.user && (
              <div className="user-info">
                {forumPost?.user?.profile_picture && (
                  <img
                    className="forum-user-picture"
                    src={forumPost.user.profile_picture}
                    alt={`${forumPost?.user?.username}'s profile`}
                  />
                )}
                <p className="forum-user-link">
                  <Link to={`/user/${forumPost?.user?.id}`}>
                    {forumPost?.user?.username}
                  </Link>
                </p>
                <p className="forum-created-at">
                  Created At:{" "}
                  {forumPost?.created_at
                    ? new Date(forumPost.created_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            )}
          </div>
          <ForumCommentList postId={id} />
        </div>
      )}
    </div>
  );
}

export default ForumDetailed;
