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
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(listRecipes());
    dispatch(listBookmarks()); // Fetch bookmarks whenever the component mounts
  }, [dispatch]);

  const categories = [
    { value: "", label: "All" },
    { value: "Appetizers & Snacks", label: "Appetizers & Snacks" },
    { value: "Breakfast & Brunch", label: "Breakfast & Brunch" },
    { value: "Main Dishes", label: "Main Dishes" },
    { value: "Soups & Stews", label: "Soups & Stews" },
    { value: "Salads", label: "Salads" },
    { value: "Side Dishes", label: "Side Dishes" },
    { value: "Desserts & Sweets", label: "Desserts & Sweets" },
    { value: "Beverages", label: "Beverages" },
    { value: "Vegan & Vegetarian", label: "Vegan & Vegetarian" },
    { value: "Gluten-Free", label: "Gluten-Free" },
    { value: "Low-Carb & Keto", label: "Low-Carb & Keto" },
    { value: "Quick & Easy Meals", label: "Quick & Easy Meals" },
    { value: "Seafood & Fish", label: "Seafood & Fish" },
    { value: "Pasta & Noodles", label: "Pasta & Noodles" },
    { value: "Breads & Baked Goods", label: "Breads & Baked Goods" },
    { value: "Casseroles", label: "Casseroles" },
    { value: "Grilling & BBQ", label: "Grilling & BBQ" },
    { value: "International Cuisine", label: "International Cuisine" },
    { value: "Comfort Food", label: "Comfort Food" },
    { value: "Healthy Recipes", label: "Healthy Recipes" },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory = selectedCategory
      ? recipe.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });



  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search for recipes or tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
        style={{ width: "50rem" }}
      />
      <Form.Select
        aria-label="Select Category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-3"
        style={{ width: "50rem" }}
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </Form.Select>
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
