import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodOfTheMonth } from "../actions/recipeActions";
import Recipe from "../components/Recipe";
import { Row, Col } from "react-bootstrap";
import '../css/components/MonthRecipe.css';

function MonthRecipe() {
  const dispatch = useDispatch();

  const foodOfTheMonth = useSelector((state) => state.foodOfTheMonth);
  const { loading, error, foodOfTheMonth: recipes } = foodOfTheMonth;

  useEffect(() => {
    dispatch(getFoodOfTheMonth());
  }, [dispatch]);

  return (
    <div className="month-recipe-container">
      <h1 className="month-recipe-title">Recipe of the Month</h1>

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

export default MonthRecipe;
