import React, { useState } from 'react'
import Bookmarks from '../components/Bookmarks'
import UserComments from '../components/UserComments';
import OwnRecipes from '../components/OwnRecipes'
import Following from '../components/Following';



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
      case 'following':
        return <Following />;
      default:
        return <OwnRecipes />; // Fallback to Bookmarks
    }
  };

  return (
    <div>
      <div>
        <button class="btn btn-primary" onClick={() => setActiveComponent('ownRecipe')}>My Recipes</button>
        <button class="btn btn-primary" onClick={() => setActiveComponent('bookmarks')}>Bookmarks</button>
        <button class="btn btn-primary" onClick={() => setActiveComponent('comments')}>Comments</button>
        <button class="btn btn-primary" onClick={() => setActiveComponent('following')}>Following</button>
      </div>
      <div>
        {renderComponent()} 
      </div>
    </div>
  );
}

export default ProfileScreen;