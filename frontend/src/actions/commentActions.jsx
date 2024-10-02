import axios from 'axios'

import {
COMMENT_LIST_REQUEST,
COMMENT_LIST_SUCCESS,
COMMENT_LIST_FAIL,
COMMENT_CREATE_REQUEST,
COMMENT_CREATE_SUCCESS,
COMMENT_CREATE_FAIL,
} from '../constants/commentConstants'

export const listComments = (recipeId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST })

    const { data } = await axios.get(`/api/recipes/recipe/${recipeId}/comments/`)

    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const createComment = (recipeId, comment) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST })

    const { userLogin: { userinfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ${userInfo.token}',
      },
    };
    
    const { data } = await axios.get(`/api/recipes/${recipeId}/comments/create/`)

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};
