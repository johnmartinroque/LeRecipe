import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import { createReply, listComments } from "../actions/userActions";
import { Link } from "react-router-dom";
import '../css/components/ForumComments.css'


const ForumCommentList = ({ postId }) => {
  const dispatch = useDispatch();

  // Access comments from the Redux store
  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList;

  useEffect(() => {
    dispatch(listComments(postId)); // Dispatch action to fetch comments for the post
  }, [dispatch, postId]);

  const renderReplies = (replies) => {
    return (
      <ListGroup style={{ paddingLeft: "20px" }}>
        {replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            parentUsername={replies[0]?.user.username}
          />
        ))}
      </ListGroup>
    );
  };

  const CommentItem = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState("");
  
    const dispatch = useDispatch();
  
    const toggleReplies = () => setShowReplies((prev) => !prev);
    const toggleReplyInput = () => setShowReplyInput((prev) => !prev);
  
    const submitReply = () => {
      if (replyContent.trim()) {
        dispatch(createReply(postId, comment.id, replyContent));
        setReplyContent("");
        setShowReplyInput(false);
      }
    };
  
    return (
      <ListGroup.Item
        style={{
          margin: "1rem",
          backgroundColor: "#fefefe",
          border: "1px solid #ddd",
          borderRadius: "20px",
          padding: "15px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          width: "100%",
          marginLeft: '0rem'
        }}
      >
        {comment.replying_to && (
          <p style={{ fontStyle: "italic" }}>
            Replying to: {comment.replying_to.username}
          </p>
        )}
        <div className="user-info">
          {comment.user.profile_picture && (
            <img
              className="forum-user-picture"
              src={comment.user.profile_picture}
              alt={`${comment.user.username}'s profile`}
            />
          )}
          <div className="user-details">
            <Link to={`/user/${comment.user.id}`} className="forum-user-link">
              {comment.user.username}
            </Link>
            <small className="forum-created-at2">
              Created At: {new Date(comment.created_at).toLocaleString()}
            </small>
          </div>
        </div>
        <p className="comment-content2">{comment.content}</p>
  
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
            marginBottom: '10px',
            marginLeft: '10px'
          }}
        >
          <Button onClick={toggleReplyInput} variant="primary">
            {showReplyInput ? "Cancel" : "Reply"}
          </Button>
  
          {comment.replies && comment.replies.length > 0 && (
            <Button
              onClick={toggleReplies}
              variant={showReplies ? "danger" : "secondary"}
            >
              {showReplies ? "Hide Replies" : "Show Replies"}
            </Button>
          )}
        </div>
  
        {showReplyInput && (
          <div style={{ marginTop: "10px" }}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              rows="3"
              style={{
                width: "100%",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
            <Button onClick={submitReply}>Submit Reply</Button>
          </div>
        )}
  
        {showReplies && comment.replies && renderReplies(comment.replies)}
      </ListGroup.Item>
    );
  };

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {comments && comments.length === 0 && <p>No comments yet.</p>}

      {comments && comments.length > 0 && (
        <ListGroup>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ForumCommentList;
