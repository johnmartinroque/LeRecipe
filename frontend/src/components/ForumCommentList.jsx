import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import { listComments } from "../actions/userActions";

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
      <ListGroup style={{ paddingLeft: '20px' }}>
        {replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} parentUsername={replies[0]?.user.username} />
        ))}
      </ListGroup>
    );
  };

  const CommentItem = ({ comment, parentUsername }) => {
    const [showReplies, setShowReplies] = useState(false); // Local state for this comment's replies

    const toggleReplies = () => {
      setShowReplies((prev) => !prev); // Toggle the visibility of replies
    };

    return (
      <ListGroup.Item key={comment.id}>
        {comment.replying_to && (
        <p style={{ fontStyle: 'italic' }}>
          Replying to: {comment.replying_to.username}
        </p>
      )}
        <strong>{comment.user.username}</strong>
        <p>{comment.content}</p>
        <small>
          Created At: {new Date(comment.created_at).toLocaleString()}
        </small>

        {/* Button to show/hide replies */}
        {comment.replies && comment.replies.length > 0 && (
          <>
            <Button 
              onClick={toggleReplies} 
              style={{ margin: '10px 0' }}
            >
              {showReplies ? 'Hide Replies' : 'Show Replies'}
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
