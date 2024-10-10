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
  RECIPE_CREATE_RESET,
  FOOD_OF_THE_WEEK_REQUEST,
  FOOD_OF_THE_WEEK_SUCCESS,
  FOOD_OF_THE_WEEK_FAIL,
  FOOD_OF_THE_MONTH_REQUEST,
  FOOD_OF_THE_MONTH_SUCCESS,
  FOOD_OF_THE_MONTH_FAIL,
  RANDOM_RECIPE_REQUEST,
  RANDOM_RECIPE_SUCCESS,
  RANDOM_RECIPE_FAIL,
  RECIPE_DELETE_REQUEST,
  RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_FAIL,
  USER_RECIPES_REQUEST,
  USER_RECIPES_SUCCESS,
  USER_RECIPES_FAIL,
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAIL,
  RECIPE_UPDATE_RESET,
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
    case RECIPE_CREATE_RESET: // Reset case
      return {};
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
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload
        ), // Filter out the removed bookmark
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

export const foodOfTheWeekReducer = (state = { foodOfTheWeek: [] }, action) => {
  switch (action.type) {
    case FOOD_OF_THE_WEEK_REQUEST:
      return { loading: true };
    case FOOD_OF_THE_WEEK_SUCCESS:
      return { loading: false, foodOfTheWeek: action.payload };
    case FOOD_OF_THE_WEEK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const foodOfTheMonthReducer = (
  state = { foodOfTheMonth: [] },
  action
) => {
  switch (action.type) {
    case FOOD_OF_THE_MONTH_REQUEST:
      return { loading: true };
    case FOOD_OF_THE_MONTH_SUCCESS:
      return { loading: false, foodOfTheMonth: action.payload };
    case FOOD_OF_THE_MONTH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const randomRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case RANDOM_RECIPE_REQUEST:
      return { loading: true };
    case RANDOM_RECIPE_SUCCESS:
      return { loading: false, recipes: action.payload || [] };
    case RANDOM_RECIPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const recipeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_DELETE_REQUEST:
      return { loading: true };
    case RECIPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RECIPE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRecipesReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case USER_RECIPES_REQUEST:
      return { loading: true, recipes: [] };
    case USER_RECIPES_SUCCESS:
      return { loading: false, recipes: action.payload };
    case USER_RECIPES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const recipeUpdateReducer = (state = { recipe: {} }, action) => {
  switch (action.type) {
      case RECIPE_UPDATE_REQUEST:
          return { loading: true };
      case RECIPE_UPDATE_SUCCESS:
          return { loading: false, success: true, recipe: action.payload };
      case RECIPE_UPDATE_FAIL:
          return { loading: false, error: action.payload };
      case RECIPE_UPDATE_RESET:
          return { recipe: {} };
      default:
          return state;
  }
};