import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from './Recipe';
import { listBookmarks } from "../actions/recipeActions"
import { Col, Row } from "react-bootstrap";

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
        <h1>Your Bookmarked Recipes</h1>
  
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Row>
            {bookmarks.map((bookmark) => (
              <Col key={bookmark.id}>
                <Recipe recipe={{ // Pass the bookmark directly to the Recipe component
                  id: bookmark.id,
                  name: bookmark.name,
                  image: bookmark.image,
                }} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  };
  
  export default Bookmarks;