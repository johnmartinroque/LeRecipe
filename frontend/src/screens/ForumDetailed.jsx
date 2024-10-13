import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

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
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          <Col>
            <div style={{ background: "gray" }}>
              <h1>{forumPost?.title}</h1>
              <p>{forumPost?.content}</p>
              {forumPost?.user && (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/user/${forumPost?.user?.id}`}
                >
                  {forumPost?.user?.username}
                </Link>
              )}
              {forumPost?.user?.profile_picture && (
                <img
                  src={forumPost.user.profile_picture}
                  alt={`${forumPost?.user?.username}'s profile`}
                  style={{ width: "100px", borderRadius: "50%" }}
                />
              )}
              <p>
                Created At:{" "}
                {forumPost?.created_at
                  ? new Date(forumPost.created_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <ForumCommentList postId={id} />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ForumDetailed;
