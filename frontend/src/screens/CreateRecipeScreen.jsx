import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../actions/recipeActions';
import { useNavigate } from 'react-router-dom';




const CreateRecipeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipeCreate = useSelector((state) => state.recipeCreate);
    const { loading, error, success, recipe } = recipeCreate;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState([{ stepname: '', description: '', image: null, video: null }]);

    const [isRedirecting, setIsRedirecting] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = new FormData();
        recipeData.append('name', name);
        recipeData.append('description', description);
        recipeData.append('image', image);
        steps.forEach((step, index) => {
            recipeData.append(`steps[${index}][stepname]`, step.stepname);
            recipeData.append(`steps[${index}][description]`, step.description);
            if (step.image) recipeData.append(`steps[${index}][image]`, step.image);
            if (step.video) recipeData.append(`steps[${index}][video]`, step.video);
        });
        dispatch(createRecipe(recipeData));

        if (success && recipe) {
            setIsRedirecting(true);
        }
    };

    if (isRedirecting && recipe) {
        navigate(`/recipe/${recipe.id}`);
    }


        

    return (
        <form onSubmit={handleSubmit}>
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
                    <button type="button" onClick={() => handleRemoveStep(index)}>Remove Step</button>
                </div>
            ))}
            <button type="button" onClick={handleAddStep}>Add Step</button>
            <button type="submit">Create Recipe</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Recipe created successfully!</p>}
        </form>
    );
};

export default CreateRecipeScreen;