// src/screens/RecipeDetailScreen.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, getRecipeDetails } from "../actions/recipeActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, Alert, Row, Col, Button, Form, Modal } from "react-bootstrap";
import {
  listComments,
  createComment,
  updateComment,
  deleteComment,
} from "../actions/commentActions";
import Rating from "../components/Rating";
import Footer from "../components/Footer";

const RecipeDetailedScreen = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipeDetailed = useSelector((state) => state.recipeDetailed);
  const { loading, error, recipe } = recipeDetailed;

  const commentList = useSelector((state) => state.commentList);
  const {
    loading: loadingComments,
    error: errorComments,
    comments,
  } = commentList;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successCreateComment, error: errorCreateComment } =
    commentCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // Get logged-in user info

  useEffect(() => {
    console.log(userInfo); // Check if the userInfo object contains correct data
  }, [userInfo]);

  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null); // Store the commen

  const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false);
  const [commentToUpdate, setCommentToUpdate] = useState(null); // Store the comment to update
  const [updatedCommentText, setUpdatedCommentText] = useState(""); // Comment text for update
  const [updatedRating, setUpdatedRating] = useState(0); // Rating for update

  useEffect(() => {
    dispatch(getRecipeDetails(id));
    dispatch(listComments(id));
  }, [dispatch, id, successCreateComment]);

  useEffect(() => {
    if (successCreateComment) {
      setCommentText("");
      setRating(0);
    }
  }, [successCreateComment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(id, { text: commentText, rating }));
  };

  const deleteHandler = () => {
    dispatch(deleteRecipe(id));
    navigate("/recipes");
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeleteCommentModal = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteCommentModal(true);
  };

  const handleCloseDeleteCommentModal = () => {
    setShowDeleteCommentModal(false);
    setCommentToDelete(null);
  };

  const deleteCommentHandler = () => {
    dispatch(deleteComment(id, commentToDelete)); // Dispatch action to delete comment
    handleCloseDeleteCommentModal();
  };

  const handleShowUpdateCommentModal = (comment) => {
    setCommentToUpdate(comment.id); // Set the comment to update
    setUpdatedCommentText(comment.text); // Pre-fill the comment text
    setUpdatedRating(comment.rating); // Pre-fill the rating
    setShowUpdateCommentModal(true);
  };

  const handleCloseUpdateCommentModal = () => {
    setShowUpdateCommentModal(false);
    setCommentToUpdate(null);
    setUpdatedCommentText(""); // Reset fields when modal closes
    setUpdatedRating(0);
  };

  const updateCommentHandler = () => {
    dispatch(
      updateComment(id, commentToUpdate, {
        text: updatedCommentText,
        rating: updatedRating,
      })
    );
    handleCloseUpdateCommentModal();
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
                {userInfo &&
                  recipe &&
                  recipe.user &&
                  userInfo.id === recipe.user.id && ( // Check if the logged-in user owns the recipe
                    <div className="mb-3">
                      <Button variant="warning" className="me-2">
                        <Link to={`/update/${recipe.id}`}>Update</Link>
                      </Button>
                      <Button variant="danger" onClick={handleShowDeleteModal}>
                        Delete
                      </Button>
                    </div>
                  )}
                <div style={{ backgroundColor: "green", padding: "2rem" }}>
                  {recipe && recipe.user ? (
                    <>
                      <Link
                        to={`/user/${recipe.user.id}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        {recipe.user.username}
                      </Link>
                      <img
                        style={{ maxWidth: "20rem" }}
                        src={recipe.user.profile_picture}
                        alt="profile picture"
                      />
                      <Button>Follow</Button>
                    </>
                  ) : (
                    <p>No user information available.</p>
                  )}
                </div>
                <h1>{recipe.name}</h1>
                {recipe.image && (
                  <img
                    style={{ maxWidth: "40rem" }}
                    src={recipe.image}
                    alt={recipe.name}
                  />
                )}
                <div>
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div>
                      {recipe.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p>{recipe.category}</p>
                <p>{recipe.description}</p>
                <div>
                  <h2>Ingredients</h2>
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    <ul style={{listStyle: 'none'}}>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}><span>{index + 1}</span><p>{ingredient}</p></li>
                      ))}
                    </ul>
                  ) : (
                    <p>No ingredients listed for this recipe.</p>
                  )}
                </div>

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
                      <h3>
                        {index + 1}. {step.stepname}
                      </h3>
                      <p>{step.description}</p>
                      {step.image && (
                        <img
                          style={{ maxWidth: "30rem" }}
                          src={step.image}
                          alt={step.stepname}
                        />
                      )}
                      {step.video && (
                        <video
                          controls
                          src={step.video}
                          style={{ width: "100%" }}
                        />
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
                        <div
                          key={comment.id}
                          style={{
                            margin: "1rem 0",
                            padding: "1rem",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>{comment.username}</strong>
                          <Rating
                            value={comment.rating}
                            text={"#f8e825"}
                            color={"#f8e825"}
                          />
                          <br />
                          <p>{comment.text}</p>
                          {userInfo &&
                            userInfo.username === comment.username && (
                              <div className="mb-3">
                                <Button
                                  variant="warning"
                                  className="me-2"
                                  onClick={() =>
                                    handleShowUpdateCommentModal(comment)
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleShowDeleteCommentModal(comment.id)
                                  }
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                        </div>
                      ))
                    )}
                  </>
                )}

                {/* Create Comment Form */}
                <h3>Add a Comment</h3>
                {errorCreateComment && (
                  <Alert variant="danger">{errorCreateComment}</Alert>
                )}
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
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDeleteCommentModal}
        onHide={handleCloseDeleteCommentModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteCommentModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteCommentHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showUpdateCommentModal}
        onHide={handleCloseUpdateCommentModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updatedCommentText">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedCommentText}
                onChange={(e) => setUpdatedCommentText(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="updatedRating" className="my-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={updatedRating}
                onChange={(e) => setUpdatedRating(e.target.value)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateCommentModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateCommentHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default RecipeDetailedScreen;
