import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecipes } from '../actions/recipeActions';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import Recipe from '../components/Recipe'; // Import the Recipe component

const UserScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get user ID from the URL

    const userRecipes = useSelector((state) => state.userRecipes);
    const { loading, error, recipes } = userRecipes;

    useEffect(() => {
        if (id) {
            dispatch(getUserRecipes(id)); // Dispatch the action to get user recipes
        }
    }, [dispatch, id]);

    return (
        <div>
            <h2>User Recipes</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Row>
                    
                    {recipes.map((recipe) => (
                        <Col key={recipe.id} sm={12} md={6} lg={4} xl={3}>
                            <Recipe recipe={recipe} /> {/* Use Recipe component here */}
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default UserScreen;
