// src/screens/RecipeDetailScreen.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../actions/recipeActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, Alert, Row, Col, Button } from "react-bootstrap";



const RecipeDetailedScreen = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipeDetailed = useSelector((state) => state.recipeDetailed);
  const { loading, error, recipe } = recipeDetailed;

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

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
                  style={{ maxWidth: "40rem" }} // Ensure image is responsive
                  src={recipe.image}
                  alt={recipe.name}
                />
              )}
              <p>{recipe.description}</p>
              <h2>Ingredients</h2>
              {recipe.ingredients && (
                  <ul style={{listStyle: 'none'}}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                )}
              <h2>Steps</h2>
              {recipe.steps &&
                recipe.steps.map((step, index) => (
                  <div
                    key={index}
                    className="step"
                    style={{ backgroundColor: "gray", margin: "1rem auto", maxWidth: "50rem", padding: "1rem" }} // Center the step div
                  >
                    <h3>
                      {index + 1}. {step.stepname}
                    </h3>
                    <p>{step.description}</p>
                    {step.image && (
                      <img
                        style={{ maxWidth: "30rem" }} // Ensure step images are responsive
                        src={step.image}
                        alt={step.stepname}
                      />
                    )}
                    {step.video && <video controls src={step.video} style={{ width: '100%' }} />} {/* Make video responsive */}
                  </div>
                ))}
            </div>
          )}
        </div>
      </Col>
    </Row>

    </div>
  );
};

export default RecipeDetailedScreen;
