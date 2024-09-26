import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRecipes } from '../actions/recipeActions'; // Import the action
import Recipe from '../components/Recipe';
import { Col, Row } from 'react-bootstrap';



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
          <Row>
          {recipes.map((recipe) => (
            <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
              <Recipe recipe={recipe}/>

            </Col>
          ))}
          </Row>
      )}
    </div>
  );
}

export default HomeScreen;
