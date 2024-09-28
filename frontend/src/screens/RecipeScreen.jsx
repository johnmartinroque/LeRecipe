import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRecipes } from "../actions/recipeActions"; // Import the action
import Recipe from "../components/Recipe";
import { Col, Form, Row } from "react-bootstrap";


function RecipeScreen() {
  const dispatch = useDispatch();

  // Fetching the state from the Redux store
  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipes } = recipeList;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Dispatch the action to fetch recipes when the component mounts
    dispatch(listRecipes());
  }, [dispatch]);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3" // Add some margin below the search bar
        style={{width: "50rem"}}
      />
      <h1>Recipes</h1>

      {loading ? (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Row>
          {filteredRecipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <Recipe recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default RecipeScreen;
