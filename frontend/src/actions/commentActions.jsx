import axios from 'axios'

import {
COMMENT_LIST_REQUEST,
COMMENT_LIST_SUCCESS,
COMMENT_LIST_FAIL,
COMMENT_CREATE_REQUEST,
COMMENT_CREATE_SUCCESS,
COMMENT_CREATE_FAIL,
COMMENT_UPDATE_REQUEST,
COMMENT_UPDATE_SUCCESS,
COMMENT_UPDATE_FAIL,
COMMENT_DELETE_REQUEST,
COMMENT_DELETE_SUCCESS,
COMMENT_DELETE_FAIL,

} from '../constants/commentConstants'

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const listComments = (recipeId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST })

    const { data } = await instance.get(`/api/recipes/recipe/${recipeId}/comments/`)

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

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await instance.post(`/api/recipes/recipe/${recipeId}/comments/create/`, comment, config)

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: data,
    });

    const updatedComments = await instance.get(`/api/recipes/recipe/${recipeId}/comments/`)

   dispatch({
          type: COMMENT_LIST_SUCCESS,
          payload: [...getState().commentList.comments, data],
      });
    
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const updateComment = (recipeId, commentId, updatedComment) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMMENT_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/recipes/recipe/${recipeId}/comments/${commentId}/update/`, updatedComment, config);

        dispatch({
            type: COMMENT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COMMENT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteComment = (recipeId, commentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMMENT_DELETE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/recipes/recipe/${recipeId}/comments/${commentId}/delete/`, config);

        dispatch({
            type: COMMENT_DELETE_SUCCESS,
            payload: commentId,  // Optionally use this to remove the comment from the state
        });
    } catch (error) {
        dispatch({
            type: COMMENT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
