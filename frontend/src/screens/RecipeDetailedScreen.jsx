// src/screens/RecipeDetailScreen.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../actions/recipeActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, Alert, Row, Col, Button, Form } from "react-bootstrap";
import { listComments, createComment } from '../actions/commentActions';



const RecipeDetailedScreen = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipeDetailed = useSelector((state) => state.recipeDetailed);
  const { loading, error, recipe } = recipeDetailed;


  const commentList = useSelector((state) => state.commentList);
  const { loading: loadingComments, error: errorComments, comments } = commentList;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successCreateComment, error: errorCreateComment } = commentCreate;

  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(getRecipeDetails(id));
    dispatch(listComments(id));
  }, [dispatch, id, successCreateComment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(id, { text: commentText, rating }));
    setCommentText(""); // Clear the comment field
    setRating(0);       // Reset the rating
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <div className="recipe-detail-container">
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div className="recipe-detail">
                <h1>{recipe.name}</h1>
                {recipe.image && (
                  <img
                    style={{ maxWidth: "40rem" }}
                    src={recipe.image}
                    alt={recipe.name}
                  />
                )}
                <p>{recipe.description}</p>

                <h2>Steps</h2>
                {recipe.steps &&
                  recipe.steps.map((step, index) => (
                    <div
                      key={index}
                      className="step"
                      style={{
                        backgroundColor: "gray",
                        margin: "1rem auto",
                        maxWidth: "50rem",
                        padding: "1rem",
                      }}
                    >
                      <h3>{index + 1}. {step.stepname}</h3>
                      <p>{step.description}</p>
                      {step.image && (
                        <img
                          style={{ maxWidth: "30rem" }}
                          src={step.image}
                          alt={step.stepname}
                        />
                      )}
                      {step.video && (
                        <video controls src={step.video} style={{ width: '100%' }} />
                      )}
                    </div>
                  ))}

                {/* Comment Section */}
                <h2>Comments</h2>
                {loadingComments ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : errorComments ? (
                  <Alert variant="danger">{errorComments}</Alert>
                ) : (
                  <>
                    {comments.length === 0 ? (
                      <p>No comments yet. Be the first to comment!</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} style={{ margin: "1rem 0", padding: "1rem", border: "1px solid #ccc" }}>
                          <strong>{comment.user.username}</strong>
                          <p>{comment.text}</p>
                          <span>Rating: {comment.rating}</span>
                        </div>
                      ))
                    )}
                  </>
                )}

                {/* Create Comment Form */}
                <h3>Add a Comment</h3>
                {errorCreateComment && <Alert variant="danger">{errorCreateComment}</Alert>}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="commentText">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="rating" className="my-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="0">Select Rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2 - Fair</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3 - Good</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4 - Very Good</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecipeDetailedScreen;
