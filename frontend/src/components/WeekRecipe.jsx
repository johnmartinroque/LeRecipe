import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodOfTheWeek } from "../actions/recipeActions"; // Import the action
import Recipe from "../components/Recipe";
import { Row, Col } from "react-bootstrap";
import '../css/components/WeekRecipe.css';

function WeekRecipe() {
  const dispatch = useDispatch();
  const foodOfTheWeek = useSelector((state) => state.foodOfTheWeek);
  const { loading, error, foodOfTheWeek: recipes } = foodOfTheWeek;

  useEffect(() => {
    dispatch(getFoodOfTheWeek());
  }, [dispatch]);

  return (
    <div className="week-recipe-container">
      <h1 className="week-recipe-title">Recipe of the Week</h1>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe.id} sm={12} md={6} lg={4} xl={3}>
              <Recipe recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}


export default WeekRecipe;
