import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../actions/recipeActions';
import { useNavigate } from 'react-router-dom';
import { RECIPE_CREATE_RESET } from '../constants/recipeConstants';
import '../css/screens/CreateRecipeScreen.css'
import Footer from "../components/Footer";

const categoryChoices = [
    { value: '', label: 'Select Category' },
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

    const [isCategoryFocused, setIsCategoryFocused] = useState(false);
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isStepNameFocused, setIsStepNameFocused] = useState(false);
    const [isStepDescriptionFocused, setIsStepDescriptionFocused] = useState(false);
    const [isIngredientFocused, setIsIngredientFocused] = useState(false);
    const [isTagFocused, setIsTagFocused] = useState(false);
    const [inputTag, setInputTag] = useState('');

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        
        if (file) {
            setImage(file); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = null;
    };

    const handleRemovePhoto = () => {
        setImage(null);
        setPreviewImage(null);
        console.log("Image removed, current state:", null);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value) {
            setIsCategoryFocused(false);
        }
    };

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


    const handleRemoveTag = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    };

    const handleTagChange = (index, value) => {
        const updatedTags = [...tags];
        const lettersOnly = /^[a-zA-Z]*$/;
        if (lettersOnly.test(value)) {
            if (index !== undefined) {
            updatedTags[index] = value; 
            } else if (value.length <= 10) {
            setInputTag(value); 
            }
        }
        setTags(updatedTags);

    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (inputTag.trim() && inputTag.length >= 3 && inputTag.length <= 10 && tags.length < 3) {
                setTags([...tags, inputTag.trim()]); 
                setInputTag(''); 
                setIsTagFocused(true);
            }
        }
    };

    const handleTagBlur = () => {
        if (inputTag.trim().length >= 3 && inputTag.length <= 10 && tags.length < 3) {
            setTags([...tags, inputTag.trim()]); 
            setInputTag(''); 
            setIsTagFocused(false);
        }
    };
    

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Recipe with Image:", image);

        const recipeData = new FormData();
        recipeData.append('name', name);
        recipeData.append('description', description);
        recipeData.append('image', image);
        recipeData.append('category', category);

        ingredients.forEach((ingredient) => {
            recipeData.append('ingredients[]', ingredient);
        });


        tags.forEach((tag) => {
            recipeData.append('tags[]', tag);
        });


        steps.forEach((step, index) => {
            recipeData.append(`steps[${index}][stepname]`, step.stepname);
            recipeData.append(`steps[${index}][description]`, step.description);
            if (step.image) recipeData.append(`steps[${index}][image]`, step.image);
            if (step.video) recipeData.append(`steps[${index}][video]`, step.video);
        });
        dispatch(createRecipe(recipeData));
    };


    useEffect(() => {
        if (success && recipe) {
            dispatch({ type: RECIPE_CREATE_RESET }); 
            navigate(`/recipe/${recipe.id}`);
        }
    }, [success, recipe, navigate, dispatch]);

    return (
        <div>
        <form onSubmit={handleSubmit} style={{maxWidth: '50rem'}}>
        <h1>Create Recipe</h1>
        {previewImage ? (
            <div className="image-preview-container">
                <img src={previewImage} alt="Recipe Preview" className="image-preview" />
                <div className="remove-photo" onClick={handleRemovePhoto}>
                    Remove Photo
                </div>
            </div>
        ) : ( 
            <div>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                <div className="upload-box" onClick={handleUploadClick}>
                    <span className="plus-sign">+</span>
                </div>
            </div>
        )}

            {/* Title */}
            <div className="TitleBox">
            <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsTitleFocused(true)} onBlur={() => {if (!name) {setIsTitleFocused(false);}}}      
                required
            />
                <span className={name || isTitleFocused ? 'focused' : ''}>
                    {isTitleFocused ? 'TITLE' : 'Title'}
                </span>
            </div>

            {/* Description */}
            <div className="DescriptionBox">
                <textarea 
                    value={description} onChange={(e) => setDescription(e.target.value)} 
                    onFocus={() => setIsDescriptionFocused(true)} onBlur={() => {if (!description) {setIsDescriptionFocused(false);}}}
                    required 
                />
                <span className={description || isDescriptionFocused ? 'focused' : ''}>
                    {isDescriptionFocused || description ? 'DESCRIPTION' : 'Description'}
                </span>
            </div>

            <div className="category-tags-container">
                {/* Category */}
                <div className="CategoryBox">
                    <input type="text" style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                        onFocus={() => setIsCategoryFocused(true)} onBlur={() => { if (!category) { setIsCategoryFocused(false); } }}
                    />
                    <select value={category}onChange={handleCategoryChange}
                        onFocus={() => setIsCategoryFocused(true)} onBlur={() => { if (!category) { setIsCategoryFocused(false); } }}
                        required
                    >
                        {categoryChoices.map((choice, index) => ( <option key={index} value={choice.value}> {choice.label} </option> ))}
                    </select>
                    <span className={category || isCategoryFocused ? 'focused' : ''}>
                        {isCategoryFocused || category ? 'CATEGORY' : '  '}
                    </span>
                </div>

                <div className="TagBox">
                    <div className="tag-input-wrapper">
                        {tags.length > 0 && (
                            <div className="tag-list">
                                {tags.map((tag, index) => (
                                    <div key={index} className="tag">
                                        <span>#{tag}</span>
                                        <button
                                            type="button"
                                            className="remove-tag-button"
                                            onClick={() => handleRemoveTag(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {tags.length < 3 && (
                            <div className="TagInputBox">
                                <input
                                    type="text"
                                    value={inputTag}
                                    onChange={(e) => handleTagChange(undefined, e.target.value)} 
                                    onFocus={() => setIsTagFocused(true)}
                                    onBlur={handleTagBlur}
                                    onKeyDown={handleKeyDown}
                                />
                                <span className={inputTag || isTagFocused || tags.length > 0 ? 'focused' : ''}>
                                    {isTagFocused || tags.length > 0 ? 'TAGS' : 'Insert HashTag'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* INGREDIENT */}
            {ingredients.map((ingredient, index) => (
                <div key={index} className="IngredientInputBox">
                    <input 
                        type="text" 
                        value={ingredient} 
                        onChange={(e) => handleIngredientChange(index, e.target.value)} 
                        onFocus={() => setIsIngredientFocused(true)}
                        onBlur={() => { if (!ingredient) setIsIngredientFocused(false); }}
                        required 
                    />
                    <span className={ingredient || isIngredientFocused ? 'focused' : ''}>
                        {isIngredientFocused ? 'INGREDIENT' : 'Ingredient'}
                    </span>
                    {ingredients.length > 1 && (
                    <button type="button" className="remove-ingredient-button" onClick={() => handleRemoveIngredient(index)}>
                        &times;
                    </button>
                     )}
                    <button type="button" className="add-ingredient-button" onClick={handleAddIngredient}> + </button>
                </div>
            ))}
            

            {/* STEP BY STEP */}
            {steps.map((step, index) => (
                <div key={index} className="StepInputBox">
                    <input 
                        type="text" 
                        value={step.stepname} 
                        onChange={(e) => handleStepChange(index, 'stepname', e.target.value)} 
                        onFocus={() => setIsStepNameFocused(true)}
                        onBlur={() => { if (!step.stepname) setIsStepNameFocused(false); }}
                        required 
                    />
                    <span className={step.stepname || isStepNameFocused ? 'focused' : ''}>
                        {isStepNameFocused ? 'STEP NAME' : 'Step Name'}
                    </span>
                    <button type="button" className="add-step-button" onClick={handleAddStep}> + </button>

                    <div className="media-upload-section">
                        <div className="media-upload image-upload">
                            <label htmlFor={`image-upload-${index}`}>Image</label>
                            <input
                                id={`image-upload-${index}`}
                                type="file"
                                onChange={(e) => handleStepChange(index, 'image', e.target.files[0])}
                                accept="image/*"
                            />
                            
                        </div>

                        <div className="media-upload video-upload">
                            <label htmlFor={`video-upload-${index}`}>Video</label>
                            <input
                                id={`video-upload-${index}`}
                                type="file"
                                onChange={(e) => handleStepChange(index, 'video', e.target.files[0])}
                                accept="video/*"
                            />
                        </div>
                    </div>

                    <textarea 
                        value={step.description} 
                        onChange={(e) => handleStepChange(index, 'description', e.target.value)} 
                        onFocus={() => setIsStepDescriptionFocused(true)}
                        onBlur={() => { if (!step.description) setIsStepDescriptionFocused(false); }}
                        required 
                    />
                    <span className={step.description || isStepDescriptionFocused ? 'focused' : ''}>
                        {isStepDescriptionFocused ? ' STEP DESCRIPTION' : 'Step Description'}
                    </span>

                    <div class="line"></div>

                    {steps.length > 1 && (
                    <button type="button" className="remove-step-button" onClick={() => handleRemoveStep(index)}>
                        &times;
                    </button>
                    )}
                </div>
            ))}
            <div className="submit-button">
            <button type="submit">Create Recipe</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Recipe created successfully!</p>}
        </form>
        <Footer/>
        </div>
    );
};

export default CreateRecipeScreen;
