import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRecipes } from '../actions/recipeActions'; // Import the action


function HomeScreen() {
  const dispatch = useDispatch();

  // Fetching the state from the Redux store
  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipes } = recipeList;

  useEffect(() => {
    // Dispatch the action to fetch recipes when the component mounts
    dispatch(listRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipes</h1>
      
      {loading ? (
        <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <div style={{backgroundColor: 'blue', maxWidth: "20rem"}} >
              <li style={{listStyleType: 'none'}} key={recipe.id}>
              <h2>{recipe.name}</h2>
              <img src={recipe.image} alt={recipe.name} style={{ width: '200px' }} />
              <p>{recipe.description}</p>
            </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomeScreen;
