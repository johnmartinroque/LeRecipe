import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createForumPost, resetForumPostCreate } from "../actions/userActions"; // Import the reset action
import '../css/screens/Forum.css';

function ForumPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const forumPostCreate = useSelector((state) => state.forumPostCreate);
  const { loading, error, success, forumPost } = forumPostCreate;

  // Access user authentication state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user is logged in; if not, redirect to /login
    if (!userInfo) {
      navigate("/login");
    } else {
      // Dispatch action to create a forum post if user is logged in
      dispatch(createForumPost(title, content));
    }
  };

  useEffect(() => {
    if (success && forumPost) {
      // Redirect to the detailed view of the new post
      navigate(`/forum/${forumPost.id}`);
    }

    // Reset success state after the post has been created and navigated
    return () => {
      if (success) {
        dispatch(resetForumPostCreate()); // Reset state when navigating away
      }
    };
  }, [success, forumPost, navigate, dispatch]); // Added dispatch to dependencies

  return (
    <div >
      {loading && <div>Loading...</div>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" style={{ marginBottom: '20px'}}>
          <Form.Label >Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContent"  style={{ marginBottom: '20px'}}>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ForumPost;
