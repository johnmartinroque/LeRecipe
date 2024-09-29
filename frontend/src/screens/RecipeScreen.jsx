import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRecipes, listBookmarks } from "../actions/recipeActions"; // Import both actions
import Recipe from "../components/Recipe";
import { Col, Form, Row } from "react-bootstrap";

function RecipeScreen() {
  const dispatch = useDispatch();

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipes = [] } = recipeList;

  const bookmarkList = useSelector((state) => state.bookmarkList);
  const { bookmarks } = bookmarkList;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(listRecipes());
    dispatch(listBookmarks()); // Fetch bookmarks whenever the component mounts
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
        className="mb-3"
        style={{ width: "50rem" }}
      />
      <h1>Recipes</h1>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
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
