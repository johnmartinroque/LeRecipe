import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from './Recipe';
import { listBookmarks } from "../actions/recipeActions";
import '../css/components/Bookmarks.css'

const Bookmarks = () => {
    const dispatch = useDispatch();

    // Fetching the state from the Redux store
    const bookmarkList = useSelector((state) => state.bookmarkList);
    const { loading, error, bookmarks } = bookmarkList;

    useEffect(() => {
      // Dispatch the action to fetch bookmarks when the component mounts
      dispatch(listBookmarks());
    }, [dispatch]);

    return (
      <div>
        <h2 style={{ fontWeight: "bold" }}>Your Bookmarked Recipes</h2>

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="scroll-container">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="scroll-item">
                <Recipe
                  recipe={{
                    id: bookmark.id,
                    name: bookmark.name,
                    image: bookmark.image,
                    average_rating: bookmark.average_rating,
                    total_comments: bookmark.total_comments,
                    tags: bookmark.tags,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default Bookmarks;
