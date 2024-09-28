import React, { useState } from 'react'
import Bookmarks from '../components/Bookmarks'
import UserComments from '../components/UserComments';
import OwnRecipes from '../components/OwnRecipes'



function ProfileScreen() {
  const [activeComponent, setActiveComponent] = useState('userPosts'); // Default to Bookmarks

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ownRecipe':
        return <OwnRecipes />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'comments':
        return <UserComments />;
      default:
        return <OwnRecipes />; // Fallback to Bookmarks
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveComponent('ownRecipe')}>Recipes</button>
        <button onClick={() => setActiveComponent('bookmarks')}>Bookmarks</button>
        <button onClick={() => setActiveComponent('comments')}>Comments</button>
      </div>
      <div>
        {renderComponent()} 
      </div>
    </div>
  );
}

export default ProfileScreen;