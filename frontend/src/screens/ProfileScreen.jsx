import React, { useState } from 'react'
import Bookmarks from '../components/Bookmarks'
import UserComments from '../components/UserComments';
import UserPosts from '../components/UserPosts';


function ProfileScreen() {
  const [activeComponent, setActiveComponent] = useState('userPosts'); // Default to Bookmarks

  const renderComponent = () => {
    switch (activeComponent) {
      case 'userPosts':
        return <UserPosts />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'comments':
        return <UserComments />;
      default:
        return <UserPosts />; // Fallback to Bookmarks
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveComponent('userPosts')}>Posts</button>
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