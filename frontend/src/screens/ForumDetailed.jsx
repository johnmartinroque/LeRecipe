import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import '../css/screens/ForumDetailed.css';
import { Alert, Spinner, Form, Button } from "react-bootstrap";
import { getForumPostDetails, createComment, listComments } from "../actions/userActions";
import ForumCommentList from "../components/ForumCommentList";


function ForumDetailed() {
  const { id } = useParams(); // Retrieve the post id from the URL

  const dispatch = useDispatch();

  // Access forum post details from the Redux store
  const forumPostDetails = useSelector((state) => state.forumPostDetails);
  const { loading, error, forumPost } = forumPostDetails;

  // State for the new comment input
  const [commentContent, setCommentContent] = useState("");

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: commentSuccess } = commentCreate;

  useEffect(() => {
    dispatch(getForumPostDetails(id)); // Dispatch the action to get the post details
  }, [dispatch, id]);

  useEffect(() => {
    if (commentSuccess) {
      dispatch(listComments(id)); // Re-fetch comments after successfully creating a comment
    }
  }, [commentSuccess, dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentContent) {
      dispatch(createComment(id, commentContent));
      setCommentContent("");
    }
  };
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
          <p className="forum-detail-content">{forumPost?.content}</p>

          </div>

          {/* Comment Input Section */}
          <Form onSubmit={handleCommentSubmit} className="Form-submit-comment">
            <Form.Group controlId="commentContent">
              <Form.Control
                type="text"
                placeholder="Add a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                style={{ marginBottom: '20px', padding: '1rem', width: '100%'}}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit Comment
            </Button>
          </Form>

          <ForumCommentList postId={id} />
        </div>
      )}
    </div>
  );
}

export default ForumDetailed;
