import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Bookmark from "./Bookmark";
import Rating from "./Rating";
import '../css/components/Recipe.css'; 

function Recipe({ recipe }) {
  return (
    <Card className="recipe-card">
      <Link to={`/recipe/${recipe.id}`}>
        <Card.Img className="card-img-top" src={recipe.image} alt={recipe.name} />
        <div className="hover-content">
          {/* <p className="recipe-description">{recipe.description}</p> */}
          <button className="try-now-button">Try Now!</button>
        </div>
      </Link>
      <Card.Body className="card-body">
        <Card.Title className="card-title">
          <Link style={{ textDecoration: 'none', color: 'black' }} to={`/recipe/${recipe.id}`}>
            <strong>{recipe.name}</strong>
          </Link>
          <div>
            {recipe.tags && recipe.tags.length > 0 && (
              <div>
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="rating-container">
            <Rating value={recipe.average_rating} text={`${recipe.total_comments} reviews`} color={'#f8e825'} />
            <span className="ms-2"> ({recipe.total_comments})</span>
            <Bookmark recipeId={recipe.id} className="bookmark-button ms-2" />
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Recipe;
