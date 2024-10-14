import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUserComments } from "../actions/userActions";

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
      <h2>User Comments</h2>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <div style={{ backgroundColor: "#e8e3dd", padding: "0.8rem", margin: '1rem', borderRadius: "8px" }}>
              <li key={comment.id} style={{ listStyle: "none" }}>
                <p>
                  <strong>{comment.username}</strong>: {comment.text}
                </p>
                <p>Rating: {comment.rating}</p>
                <p>
                  Posted on: {new Date(comment.created_at).toLocaleDateString()}
                </p>
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
