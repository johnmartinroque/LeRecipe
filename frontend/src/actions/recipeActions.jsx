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
import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
export const listRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST });
    const { data } = await instance.get("/api/recipes/recipes/");
    dispatch({
      type: RECIPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRecipeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DETAILED_REQUEST });

    const { data } = await instance.get(`/api/recipes/recipe/${id}/`); // Adjust the API endpoint as needed

    dispatch({
      type: RECIPE_DETAILED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECIPE_DETAILED_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetCreateRecipe = () => (dispatch) => {
  dispatch({ type: 'RECIPE_CREATE_RESET' });
};


export const createRecipe = (recipeData) => async (dispatch, getState) => {
  try {
    dispatch({ type: RECIPE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure correct content type for form-data
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.post(
      "/api/recipes/recipe/create/",
      recipeData,
      config
    );

    dispatch({ type: RECIPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listBookmarks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.get(
      "/api/recipes/recipes/bookmarks/",
      config
    );

    dispatch({
      type: BOOKMARK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKMARK_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOwnRecipes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_OWN_RECIPES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.get(
      "/api/recipes/recipes/own-recipes/",
      config
    );

    dispatch({
      type: GET_OWN_RECIPES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_OWN_RECIPES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const bookmarkRecipe = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_RECIPE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/recipes/recipe/bookmark/${recipeId}/`,
      {},
      config
    );

    dispatch({
      type: BOOKMARK_RECIPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKMARK_RECIPE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};


export const removeBookmark = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_BOOKMARK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/recipes/recipe/remove-bookmark/${recipeId}/`, config);

    dispatch({
      type: REMOVE_BOOKMARK_SUCCESS,
      payload: recipeId, // Return recipeId to remove from state
    });
  } catch (error) {
    dispatch({
      type: REMOVE_BOOKMARK_FAIL,
      payload: error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};