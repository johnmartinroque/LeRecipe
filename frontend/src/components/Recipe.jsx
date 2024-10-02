import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Bookmark from "./Bookmark";
import Rating from "./Rating";

function Recipe({ recipe }) {
  return (
    <Card style={{ padding: "1rem" }}>
      <Link to={`/recipe/${recipe.id}`}>
        <Card.Img src={recipe.image} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link style={{textDecoration: 'none', color: 'black'}} to={`/recipe/${recipe.id}`}>
            <strong>{recipe.name}</strong><br />
            <Rating value={recipe.average_rating} text={`${recipe.total_comments} reviews`} text={'#f8e825'} /><br />
            <strong>Comments: {recipe.total_comments}</strong>
          </Link>
          <Bookmark recipeId={recipe.id} />
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Recipe;
