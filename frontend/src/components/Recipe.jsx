import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Recipe({ recipe }) {
  return (
    <Card style={{ padding: "1rem" }}>
      <Link to={`/recipe/${recipe.id}`}>
        <Card.Img src={recipe.image} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link style={{textDecoration: 'none', color: 'black'}} to={`/recipe/${recipe.id}`}>
            <strong>{recipe.name}</strong>
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Recipe;
