import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "./Recipe";
import { getOwnRecipes } from "../actions/recipeActions"; // Ensure this imports your action correctly
import { Col, Row } from "react-bootstrap";

const OwnRecipes = () => {
  const dispatch = useDispatch();

  // Fetching the state from the Redux store
  const ownRecipes = useSelector((state) => state.ownRecipes);
  const { loading, error, recipes } = ownRecipes;

  useEffect(() => {
    // Dispatch the action to fetch own recipes when the component mounts
    dispatch(getOwnRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Your Own Recipes</h1>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Row className="flex-column">
          {recipes.map((recipe) => (
            <Col key={recipe.id} style={{ maxWidth: "30rem" }}>
              <Recipe
                recipe={{
                  // Pass the recipe directly to the Recipe component
                  id: recipe.id,
                  name: recipe.name,
                  image: recipe.image,
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default OwnRecipes;
