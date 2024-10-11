import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecipes } from '../actions/recipeActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap'; // Import Bootstrap components
import Recipe from '../components/Recipe'; // Import the Recipe component

const UserScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get user ID from the URL

    // Get the entire state of userRecipes from Redux store
    const userRecipes = useSelector((state) => state.userRecipes);
    const { loading, error, user, recipes } = userRecipes;  // Destructure user and recipes

    useEffect(() => {
        if (id) {
            dispatch(getUserRecipes(id)); // Dispatch the action to get user recipes
        }
    }, [dispatch, id]);

    return (
        <div>
            <Button onClick={() => navigate(-1)}>Back</Button>
            {user && (
                <div style={{ display: "flex", padding: '2rem' }}>
                    <h2>{user.username}</h2>
                    <img src={user.profile_picture} style={{ maxWidth: "5rem", borderRadius: '50%' }} alt="profile picture" />
                </div>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Row>
                    {recipes && recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <Col key={recipe.id} sm={12} md={6} lg={4} xl={3}>
                                <Recipe recipe={recipe} /> {/* Use Recipe component here */}
                            </Col>
                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </Row>
            )}
        </div>
    );
};

export default UserScreen;
