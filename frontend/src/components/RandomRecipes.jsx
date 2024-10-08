import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRandomRecipes } from '../actions/recipeActions';
import Recipe from '../components/Recipe';
import { Row, Col } from 'react-bootstrap';
import '../css/components/RandomRecipe.css';

const RandomRecipes = () => {
    const dispatch = useDispatch();

    const randomRecipeList = useSelector((state) => state.randomRecipes);
    const { loading, error, recipes } = randomRecipeList;

    useEffect(() => {
        dispatch(listRandomRecipes());
    }, [dispatch]);

    return (
        <div className="random-recipe-container">
        <h1 className="random-recipe-title">Random Recipes</h1>
        {loading ? (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        ) : error ? (
            <p className="error-message">Error: {error}</p>
        ) : (
            <Row>
                {(recipes || []).map((recipe) => ( 
                    <Col key={recipe.id} sm={12} md={6} lg={4} xl={3}>
                        <Recipe recipe={recipe} />
                    </Col>
                ))}
            </Row>
        )}
    </div>
    );
};

export default RandomRecipes;