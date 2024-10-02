import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodOfTheMonth } from "../actions/recipeActions"; // Import the action
import Recipe from "../components/Recipe";
import { Row, Col } from "react-bootstrap";

function MonthRecipe() {
  const dispatch = useDispatch();

  const foodOfTheMonth = useSelector((state) => state.foodOfTheMonth);
  const { loading, error, foodOfTheMonth: recipes } = foodOfTheMonth;

  useEffect(() => {
    dispatch(getFoodOfTheMonth());
  }, [dispatch]);

  return (
    <div>
      <h1>Recipe of the Month</h1>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
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
