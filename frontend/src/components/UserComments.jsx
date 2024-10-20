import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUserComments } from "../actions/userActions";
import '../css/components/UserComments.css'

function UserComments() {
  const dispatch = useDispatch();

  // Get the logged-in user's information and comments from the Redux store
  const { userInfo } = useSelector((state) => state.userLogin);
  const { comments, loading, error } = useSelector(
    (state) => state.userComments
  );

  useEffect(() => {
    if (userInfo) {
      // Call the action to fetch comments for the logged-in user
      dispatch(listUserComments(userInfo.id));
    }
  }, [dispatch, userInfo]);

  return (
    <div>
      <h2 style={{fontWeight: "bold"}}>User Comments</h2>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {comments && comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((comment) => (
            <div className="user-comments">
              <li key={comment.id} style={{ listStyle: "none" }}>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{comment.username}</strong> 
                <span>Posted on: {new Date(comment.created_at).toLocaleDateString()}</span>
              </p>
                <p style={{textIndent: "2rem", fontStyle:"italic"}}>{comment.text}</p>
                <p>Rating: {comment.rating}</p>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
}

export default UserComments;
