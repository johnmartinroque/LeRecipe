import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "./Recipe";
import { getOwnRecipes, listBookmarks } from "../actions/recipeActions"; // Import the listBookmarks action
import { Col, Row } from "react-bootstrap";

const OwnRecipes = () => {
  const dispatch = useDispatch();

  // Fetching the state from the Redux store
  const ownRecipes = useSelector((state) => state.ownRecipes);
  const { loading, error, recipes } = ownRecipes;

  const bookmarkList = useSelector((state) => state.bookmarkList);
  const { bookmarks } = bookmarkList;

  useEffect(() => {
    // Dispatch both actions to fetch own recipes and bookmarks when the component mounts
    dispatch(getOwnRecipes());
    dispatch(listBookmarks());
  }, [dispatch]);

  return (
    <div>
      <h2 style={{fontWeight: "bold"}}>Your Own Recipes</h2>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Row className="flex-column">
          {recipes.map((recipe) => (
            <Col key={recipe.id} style={{ maxWidth: "30rem"}}>
              <Recipe
                recipe={{
                  id: recipe.id,
                  name: recipe.name,
                  image: recipe.image,
                  average_rating: recipe.average_rating, 
                  total_comments: recipe.total_comments, 
                  tags: recipe.tags, 
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
