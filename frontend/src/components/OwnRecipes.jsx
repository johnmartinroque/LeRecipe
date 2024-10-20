import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "./Recipe";
import { getOwnRecipes, listBookmarks } from "../actions/recipeActions";
import "../css/components/OwnRecipes.css"

const OwnRecipes = () => {
  const dispatch = useDispatch();

  const ownRecipes = useSelector((state) => state.ownRecipes);
  const { loading, error, recipes } = ownRecipes;

  const bookmarkList = useSelector((state) => state.bookmarkList);
  const { bookmarks } = bookmarkList;

  useEffect(() => {
    dispatch(getOwnRecipes());
    dispatch(listBookmarks());
  }, [dispatch]);

  return (
    <div className="Ownrecipes-container">
      <h2 style={{ fontWeight: "bold" }}>Your Own Recipes</h2>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="scroll-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="scroll-item">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnRecipes;
