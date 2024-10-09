import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../actions/recipeActions';
import { useNavigate } from 'react-router-dom';
import { RECIPE_CREATE_RESET } from '../constants/recipeConstants';
import '../css/screens/CreateRecipeScreen.css'
import Footer from "../components/Footer";

const categoryChoices = [
    { value: '', label: 'Not specified' },
    { value: 'Appetizers & Snacks', label: 'Appetizers & Snacks' },
    { value: 'Breakfast & Brunch', label: 'Breakfast & Brunch' },
    { value: 'Main Dishes', label: 'Main Dishes' },
    { value: 'Soups & Stews', label: 'Soups & Stews' },
    { value: 'Salads', label: 'Salads' },
    { value: 'Side Dishes', label: 'Side Dishes' },
    { value: 'Desserts & Sweets', label: 'Desserts & Sweets' },
    { value: 'Beverages', label: 'Beverages' },
    { value: 'Vegan & Vegetarian', label: 'Vegan & Vegetarian' },
    { value: 'Gluten-Free', label: 'Gluten-Free' },
    { value: 'Low-Carb & Keto', label: 'Low-Carb & Keto' },
    { value: 'Quick & Easy Meals', label: 'Quick & Easy Meals' },
    { value: 'Seafood & Fish', label: 'Seafood & Fish' },
    { value: 'Pasta & Noodles', label: 'Pasta & Noodles' },
    { value: 'Breads & Baked Goods', label: 'Breads & Baked Goods' },
    { value: 'Casseroles', label: 'Casseroles' },
    { value: 'Grilling & BBQ', label: 'Grilling & BBQ' },
    { value: 'International Cuisine', label: 'International Cuisine' },
    { value: 'Comfort Food', label: 'Comfort Food' },
    { value: 'Healthy Recipes', label: 'Healthy Recipes' },
];


const CreateRecipeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipeCreate = useSelector((state) => state.recipeCreate);
    const { loading, error, success, recipe } = recipeCreate;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState([{ stepname: '', description: '', image: null, video: null }]);
    const [ingredients, setIngredients] = useState(['']);
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState(['']); 
    
    const handleAddStep = () => {
        setSteps([...steps, { stepname: '', description: '', image: null, video: null }]);
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = steps.filter((_, i) => i !== index);
        setSteps(updatedSteps);
    };

    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        setSteps(updatedSteps);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };
    
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };
    
    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddTag = () => {
        if (tags.length < 3) {
            setTags([...tags, '']);
        }
    };

    const handleRemoveTag = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    };

    const handleTagChange = (index, value) => {
        const updatedTags = [...tags];
        updatedTags[index] = value;
        setTags(updatedTags);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = new FormData();
        recipeData.append('name', name);
        recipeData.append('description', description);
        recipeData.append('image', image);
        recipeData.append('category', category);

        ingredients.forEach((ingredient) => {
            recipeData.append('ingredients[]', ingredient);
        });


        tags.forEach((tag) => {
            recipeData.append('tags[]', tag); // Add tags to the form data
        });


        steps.forEach((step, index) => {
            recipeData.append(`steps[${index}][stepname]`, step.stepname);
            recipeData.append(`steps[${index}][description]`, step.description);
            if (step.image) recipeData.append(`steps[${index}][image]`, step.image);
            if (step.video) recipeData.append(`steps[${index}][video]`, step.video);
        });
        dispatch(createRecipe(recipeData));
    };

    // Redirect to the recipe page after successful creation
    useEffect(() => {
        if (success && recipe) {
            dispatch({ type: RECIPE_CREATE_RESET }); // Reset the state
            navigate(`/recipe/${recipe.id}`);
        }
    }, [success, recipe, navigate, dispatch]);

    return (
        <div>
        <form onSubmit={handleSubmit} style={{maxWidth: '50rem'}}>
            <h1>Create Recipe</h1>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Image:</label>
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    accept="image/*" 
                    required 
                />
            </div>
            <h2>Tags</h2>
            {tags.map((tag, index) => (
                <div key={index}>
                    <label>Tag:</label>
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => {
                            if (e.target.value.length <= 10) {
                                handleTagChange(index, e.target.value);
                            }
                        }}
                        
                    />
                    <button type="button" className ="create-recipe-buttons" onClick={() => handleRemoveTag(index)}>Remove Tag</button>
                </div>
            ))}
            {tags.length < 3 && (
                <button type="button" className ="create-recipe-buttons" onClick={() => setTags([...tags, ''])}>Add Tag</button>
            )}
            <h2>Ingredients</h2>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <label>Ingredient:</label>
                    <input 
                        type="text" 
                        value={ingredient.ingredient} 
                        onChange={(e) => handleIngredientChange(index, e.target.value)} 
                        required 
                    />
                    <button type="button" className ="create-recipe-buttons" onClick={() => handleRemoveIngredient(index)}>Remove Ingredient</button>
                </div>
            ))}
            <button type="button" className ="create-recipe-buttons" onClick={handleAddIngredient}>Add Ingredient</button>
            <h2>Steps</h2>
            {steps.map((step, index) => (
                <div key={index}>
                    <h3>Step {index + 1}</h3>
                    <div>
                        <label>Step Name:</label>
                        <input 
                            type="text" 
                            value={step.stepname} 
                            onChange={(e) => handleStepChange(index, 'stepname', e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea 
                            value={step.description} 
                            onChange={(e) => handleStepChange(index, 'description', e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input 
                            type="file" 
                            onChange={(e) => handleStepChange(index, 'image', e.target.files[0])} 
                            accept="image/*" 
                        />
                    </div>
                    <div>
                        <label>Video:</label>
                        <input 
                            type="file" 
                            onChange={(e) => handleStepChange(index, 'video', e.target.files[0])} 
                            accept="video/*" 
                        />
                    </div>
                    <button type="button" className ="create-recipe-buttons" onClick={() => handleRemoveStep(index)}>Remove Step</button>
                </div>
            ))}
            <button type="button" className ="create-recipe-buttons" onClick={handleAddStep}>Add Step</button>
            <button type="submit">Create Recipe</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Recipe created successfully!</p>}
        </form>
        <Footer/>
        </div>
    );
};

export default CreateRecipeScreen;
