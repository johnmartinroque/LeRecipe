import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRandomRecipes } from '../actions/recipeActions';
import Recipe from '../components/Recipe';
import Slider from "react-slick"; 
import "../css/components/RandomRecipe.css";

const RandomRecipes = () => {
    const dispatch = useDispatch();

    const randomRecipeList = useSelector((state) => state.randomRecipes);
    const { loading, error, recipes } = randomRecipeList;

    useEffect(() => {
        dispatch(listRandomRecipes());
    }, [dispatch]);

    const settings = {
        dots: true,   
        infinite: true,           
        speed: 500,             
        slidesToShow: 4,         
        slidesToScroll: 2,      
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,  
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

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
                <Slider {...settings}>
                    {(recipes || []).map((recipe) => (
                        <div key={recipe.id} >
                            <Recipe recipe={recipe} />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default RandomRecipes;
