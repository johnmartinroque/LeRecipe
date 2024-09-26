import {
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_FAIL,
  RECIPE_DETAILED_REQUEST,
  RECIPE_DETAILED_SUCCESS,
  RECIPE_DETAILED_FAIL,
} from "../constants/recipeConstants";
import axios from "axios";

export const listRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST });
    const { data } = await axios.get("/api/recipes/recipes/");
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

        const { data } = await axios.get(`/api/recipes/recipe/${id}/`);  // Adjust the API endpoint as needed

        dispatch({
            type: RECIPE_DETAILED_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: RECIPE_DETAILED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};