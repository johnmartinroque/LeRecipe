import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkRecipe, removeBookmark } from '../actions/recipeActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Bookmark = ({ recipeId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const [isBookmarked, setIsBookmarked] = useState(false); // Local state to track bookmark status

    const { bookmarks } = useSelector((state) => state.bookmarkList); // Get bookmark list from Redux
    const { userInfo } = useSelector((state) => state.userLogin); // Get user login state

    useEffect(() => {
        // Check if the recipe is already bookmarked when component mounts or bookmarks list changes
        const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark.id === recipeId);
        setIsBookmarked(isAlreadyBookmarked);
    }, [bookmarks, recipeId]);

    const handleBookmarkToggle = () => {
        if (!userInfo) {
            navigate('/login'); // Redirect to login if not logged in
            return; // Exit the function if the user is not logged in
        }

        if (isBookmarked) {
            dispatch(removeBookmark(recipeId)); // Dispatch action to remove bookmark
        } else {
            dispatch(bookmarkRecipe(recipeId)); // Dispatch action to add bookmark
        }
        setIsBookmarked(!isBookmarked); // Toggle local state
    };

    return (
        <button onClick={handleBookmarkToggle} className="btn">
            <i className={isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
        </button>
    );
};

export default Bookmark;
