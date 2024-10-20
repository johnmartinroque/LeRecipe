import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUserComments } from "../actions/userActions";
import '../css/components/UserComments.css';

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

  // Helper function to display star rating (with half stars)
  const renderStars = (rating) => {
    const fullStar = '★';
    const halfStar = '☆'; // You can also use '⭐' if you prefer
    const emptyStar = '☆';
    const maxStars = 5;

    const fullStars = Math.floor(rating);  // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="stars">
        {fullStar.repeat(fullStars)}
        {hasHalfStar && halfStar}
        {emptyStar.repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div>
      <h2 style={{ fontWeight: "bold" }}>User Comments</h2>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {comments && comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((comment) => (
            <div className="user-comments" key={comment.id}>
              <li style={{ listStyle: "none" }}>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{comment.username}</strong>
                  <span className="userspan">Posted on: {new Date(comment.created_at).toLocaleDateString()}</span>
                </p>
                <p style={{ textIndent: "2rem", fontStyle: "italic" }}>{comment.text}</p>
                <p>Rating: {renderStars(comment.rating)}</p>
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
