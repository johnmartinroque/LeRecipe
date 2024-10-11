import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  GET_FOLLOWING_LIST_REQUEST,
  GET_FOLLOWING_LIST_SUCCESS,
  GET_FOLLOWING_LIST_FAIL,
  USER_COMMENTS_REQUEST,
  USER_COMMENTS_SUCCESS,
  USER_COMMENTS_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
} from "../constants/userConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Sending username instead of email for login
    const { data } = await instance.post(
      "/api/accounts/users/login/",
      { username: username, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail // Changed from 'details' to 'detail'
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (name, email, password1, password2) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await instance.post(
        "/api/accounts/users/register/",
        { name, email, password1, password2 },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS, // Automatically log in the user after registration
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getFollowingList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FOLLOWING_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.get("/api/accounts/following/", config);

    dispatch({
      type: GET_FOLLOWING_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWING_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUserComments = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_COMMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/recipes/user/comments/${userId}`,
      config
    );

    dispatch({
      type: USER_COMMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const followUser = (userId) => async (dispatch, getState) => {
  try {
      dispatch({ type: USER_FOLLOW_REQUEST });

      const {
          userLogin: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
          },
      };

      await axios.post(`/api/accounts/follow/${userId}/`, {}, config);

      // Update following list immediately after following a user
      dispatch({
          type: USER_FOLLOW_SUCCESS,
      });

      // Add the user to the following list in Redux state
      dispatch({
          type: GET_FOLLOWING_LIST_SUCCESS,
          payload: [...getState().followingList.following, { id: userId }], // Update to include the new followed user
      });
  } catch (error) {
      dispatch({
          type: USER_FOLLOW_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
      });
  }
};

// In your unfollowUser action
export const unfollowUser = (userId) => async (dispatch, getState) => {
  try {
      dispatch({ type: USER_UNFOLLOW_REQUEST });

      const {
          userLogin: { userInfo },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
          },
      };

      await axios.delete(`/api/accounts/unfollow/${userId}/`, config);

      dispatch({
          type: USER_UNFOLLOW_SUCCESS,
      });

      // Update following list immediately after unfollowing a user
      const updatedFollowing = getState().followingList.following.filter(user => user.id !== userId);
      dispatch({
          type: GET_FOLLOWING_LIST_SUCCESS,
          payload: updatedFollowing, // Update to exclude the unfollowed user
      });
  } catch (error) {
      dispatch({
          type: USER_UNFOLLOW_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
      });
  }
};