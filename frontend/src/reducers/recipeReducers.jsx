import {
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_FAIL,
  RECIPE_DETAILED_REQUEST,
  RECIPE_DETAILED_SUCCESS,
  RECIPE_DETAILED_FAIL,
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAIL,
  BOOKMARK_LIST_REQUEST,
  BOOKMARK_LIST_SUCCESS,
  BOOKMARK_LIST_FAIL,
  GET_OWN_RECIPES_REQUEST,
  GET_OWN_RECIPES_SUCCESS,
  GET_OWN_RECIPES_FAIL,
  BOOKMARK_RECIPE_REQUEST,
  BOOKMARK_RECIPE_SUCCESS,
  BOOKMARK_RECIPE_FAIL,
  REMOVE_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAIL,
} from "../constants/recipeConstants";

export const recipeListReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
      return { loading: true, recipes: [] };
    case RECIPE_LIST_SUCCESS:
      return { loading: false, recipes: action.payload };
    case RECIPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const recipeDetailedReducer = (state = { recipe: {} }, action) => {
  switch (action.type) {
    case RECIPE_DETAILED_REQUEST:
      return { loading: true };
    case RECIPE_DETAILED_SUCCESS:
      return { loading: false, recipe: action.payload };
    case RECIPE_DETAILED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const recipeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_CREATE_REQUEST:
      return { loading: true };
    case RECIPE_CREATE_SUCCESS:
      return { loading: false, success: true, recipe: action.payload };
    case RECIPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookmarkListReducer = (state = { bookmarks: [] }, action) => {
    switch (action.type) {
      case BOOKMARK_LIST_REQUEST:
        return { loading: true, bookmarks: [] };
      case BOOKMARK_LIST_SUCCESS:
        return { loading: false, bookmarks: action.payload };
      case REMOVE_BOOKMARK_REQUEST:
        return { ...state, loading: true };
      case REMOVE_BOOKMARK_SUCCESS:
        return {
          ...state,
          loading: false,
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== action.payload), // Filter out the removed bookmark
        };
      case REMOVE_BOOKMARK_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const ownRecipesReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case GET_OWN_RECIPES_REQUEST:
      return { loading: true };
    case GET_OWN_RECIPES_SUCCESS:
      return { loading: false, recipes: action.payload };
    case GET_OWN_RECIPES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARK_RECIPE_REQUEST:
      return { loading: true };
    case BOOKMARK_RECIPE_SUCCESS:
      return { loading: false, success: true };
    case BOOKMARK_RECIPE_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_BOOKMARK_REQUEST:
      return { loading: true };
    case REMOVE_BOOKMARK_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_BOOKMARK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
