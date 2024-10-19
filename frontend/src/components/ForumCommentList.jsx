import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import { createReply, listComments } from "../actions/userActions";


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

  const CommentItem = ({ comment, parentUsername }) => {
    const [showReplies, setShowReplies] = useState(false); // For toggling replies visibility
    const [showReplyInput, setShowReplyInput] = useState(false); // To show/hide the reply input
    const [replyContent, setReplyContent] = useState(""); // Reply content state

    const dispatch = useDispatch(); // To dispatch reply action

    const toggleReplies = () => setShowReplies((prev) => !prev);
    const toggleReplyInput = () => setShowReplyInput((prev) => !prev);

    const submitReply = () => {
      if (replyContent.trim()) {
        // Ensure the postId is being correctly passed
        dispatch(createReply(postId, comment.id, replyContent)); // Use postId from component props
        setReplyContent("");
        setShowReplyInput(false);
      }
    };

    return (
      <ListGroup.Item
        key={comment.id}
        style={{
          margin: "1rem",
          backgroundColor: "#fefefe", // Light background color for comments
          border: "1px solid #ddd", // Light border for definition
          borderRadius: "8px", // Rounded corners
          padding: "15px", // More padding for content
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
          transition: "transform 0.3s ease", // Animation for hover effect
        }}
      >
        {comment.replying_to && (
          <p style={{ fontStyle: "italic" }}>
            Replying to: {comment.replying_to.username}
          </p>
        )}
        <strong>{comment.user.username}</strong>
        <p>{comment.content}</p>

        {/* Created at timestamp */}
        <small>
          Created At: {new Date(comment.created_at).toLocaleString()}
        </small>

        {/* Buttons for Reply and Show Replies */}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-start", // Align buttons to the left
            gap: "10px", // Add space between buttons
          }}
        >
          {/* Reply Button */}
          <Button onClick={toggleReplyInput} variant="primary">
            {showReplyInput ? "Cancel" : "Reply"}
          </Button>

          {/* Show Replies Button */}
          {comment.replies && comment.replies.length > 0 && (
            <Button 
              onClick={toggleReplies} 
              variant={showReplies ? "danger" : "secondary"} // Change color based on state
            >
              {showReplies ? "Hide Replies" : "Show Replies"}
            </Button>
          )}
        </div>

        {/* Reply Input Section */}
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
                border: "1px solid #ccc", // Light border for input
                borderRadius: "4px", // Rounded corners for input
                padding: "8px", // Padding for input
              }}
            />
            <Button onClick={submitReply}>Submit Reply</Button>
          </div>
        )}

        {/* Replies Section */}
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
