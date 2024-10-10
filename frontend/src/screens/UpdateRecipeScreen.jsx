import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails, updateRecipe } from '../actions/recipeActions'; 
import { useNavigate, useParams } from 'react-router-dom';
import { RECIPE_UPDATE_RESET } from '../constants/recipeConstants';
import '../css/screens/CreateRecipeScreen.css';
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

const UpdateRecipeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const recipeDetailed = useSelector((state) => state.recipeDetailed);
    const { loading, error, recipe } = recipeDetailed;

    const recipeUpdate = useSelector((state) => state.recipeUpdate);
    const { success } = recipeUpdate;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState([{ stepname: '', description: '', image: null, video: null }]);
    const [ingredients, setIngredients] = useState(['']);
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState(['']);

    // Fetch the recipe details when the component mounts
    useEffect(() => {
        if (!recipe || recipe.id !== Number(id)) {
            dispatch(getRecipeDetails(id)); // Fetch the recipe details
        } else if (recipe) {
            // Prefill the state with existing recipe data
            setName(recipe.name);
            setDescription(recipe.description);
            setImage(recipe.image);
            setSteps(recipe.steps || [{ stepname: '', description: '', image: null, video: null }]);
            setIngredients(recipe.ingredients || ['']);
            setCategory(recipe.category);
            setTags(recipe.tags || ['']);
        }
    }, [dispatch, id, recipe]);

    const handleAddStep = () => {
        setSteps([...steps, { stepname: '', description: '', image: null, video: null }]);
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = steps.filter((_, i) => i !== index);
        setSteps(updatedSteps);
    };

    const handleStepChange = (index, field, value) => {
        const updatedSteps = steps.map((step, i) => 
            i === index ? { ...step, [field]: value } : step
        );
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a new FormData object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image); // Make sure 'image' is a File object
        formData.append('category', category);
        
        // Append ingredients as an array
        ingredients.forEach((ingredient) => {
            formData.append('ingredients[]', ingredient); // Use 'ingredients[]' to send as an array
        });
        
        // Append tags as an array
        tags.forEach((tag) => {
            formData.append('tags[]', tag); // Use 'tags[]' to send as an array
        });
    
        // Append steps
        steps.forEach((step, index) => {
            formData.append(`steps[${index}][stepname]`, step.stepname);
            formData.append(`steps[${index}][description]`, step.description);
            if (step.image) {
                formData.append(`steps[${index}][image]`, step.image); // Ensure step.image is a File object
            }
            if (step.video) {
                formData.append(`steps[${index}][video]`, step.video); // Ensure step.video is a File object
            }
        });
    
        // Call the updateRecipe action with the correct parameters
        dispatch(updateRecipe(id, formData)); // Use 'id' as the recipeId
    };

    useEffect(() => {
        if (success) {
            dispatch({ type: RECIPE_UPDATE_RESET });
            navigate(`/recipe/${id}`);
        }
    }, [success, id, navigate, dispatch]);

    
    

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '50rem' }}>
                <h1>Update Recipe</h1>
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
                    />
                </div>
                <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    {categoryChoices.map((choice, index) => (
                        <option key={index} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </select>
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
                        <button type="button" className="create-recipe-buttons" onClick={() => handleRemoveTag(index)}>Remove Tag</button>
                    </div>
                ))}
                {tags.length < 3 && (
                    <button type="button" className="create-recipe-buttons" onClick={handleAddTag}>Add Tag</button>
                )}
                <h2>Ingredients</h2>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <label>Ingredient:</label>
                        <input 
                            type="text" 
                            value={ingredient} 
                            onChange={(e) => handleIngredientChange(index, e.target.value)} 
                            required 
                        />
                        <button type="button" className="create-recipe-buttons" onClick={() => handleRemoveIngredient(index)}>Remove Ingredient</button>
                    </div>
                ))}
                <button type="button" className="create-recipe-buttons" onClick={handleAddIngredient}>Add Ingredient</button>
                <h2>Steps</h2>
                {steps.map((step, index) => (
                    <div key={index}>
                        <label>Step Name:</label>
                        <input
                            type="text"
                            value={step.stepname}
                            onChange={(e) => handleStepChange(index, 'stepname', e.target.value)}
                            required
                        />
                        <label>Description:</label>
                        <textarea
                            value={step.description}
                            onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                            required
                        />
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={(e) => handleStepChange(index, 'image', e.target.files[0])}
                            accept="image/*"
                        />
                        <label>Video:</label>
                        <input
                            type="file"
                            onChange={(e) => handleStepChange(index, 'video', e.target.files[0])}
                            accept="video/*"
                        />
                        <button type="button" className="create-recipe-buttons" onClick={() => handleRemoveStep(index)}>Remove Step</button>
                    </div>
                ))}
                <button type="button" className="create-recipe-buttons" onClick={handleAddStep}>Add Step</button>
                <button type="submit" className="create-recipe-buttons">Update Recipe</button>
            </form>
            <Footer />
        </div>
    );
};

export default UpdateRecipeScreen;
