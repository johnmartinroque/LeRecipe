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
        setReplyContent(''); 
        setShowReplyInput(false); 
      }
    };

    return (
      <ListGroup.Item key={comment.id} style={{ margin: "1rem" }}>
        {comment.replying_to && (
          <p style={{ fontStyle: "italic" }}>
            Replying to: {comment.replying_to.username}
          </p>
        )}
        <strong>{comment.user.username}</strong>
        <p>{comment.content}</p>
        <small>
          Created At: {new Date(comment.created_at).toLocaleString()}
        </small>

        {/* Reply button to toggle input */}
        <Button onClick={toggleReplyInput} style={{ margin: "10px 0" }}>
          {showReplyInput ? "Cancel" : "Reply"}
        </Button>

        {showReplyInput && (
          <div>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              rows="3"
              style={{ width: "100%", margin: "10px 0" }}
            />
            <Button onClick={submitReply}>Submit Reply</Button>
          </div>
        )}

        {/* Show replies */}
        {comment.replies && comment.replies.length > 0 && (
          <>
            <Button onClick={toggleReplies} style={{ margin: "10px 0" }}>
              {showReplies ? "Hide Replies" : "Show Replies"}
            </Button>
            {showReplies && renderReplies(comment.replies)}
          </>
        )}
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
