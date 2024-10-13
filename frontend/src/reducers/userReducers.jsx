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
  FORUM_POST_CREATE_REQUEST,
  FORUM_POST_CREATE_SUCCESS,
  FORUM_POST_CREATE_FAIL,
  FORUM_POST_LIST_REQUEST,
  FORUM_POST_LIST_SUCCESS,
  FORUM_POST_LIST_FAIL,
  FORUM_POST_DETAILS_REQUEST,
  FORUM_POST_DETAILS_SUCCESS,
  FORUM_POST_DETAILS_FAIL,
  FORUM_POST_CREATE_RESET,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_DETAIL_REQUEST,
  COMMENT_DETAIL_SUCCESS,
  COMMENT_DETAIL_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const followingListReducer = (
  state = { following: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_FOLLOWING_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_FOLLOWING_LIST_SUCCESS:
      return { loading: false, following: action.payload };
    case GET_FOLLOWING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case USER_COMMENTS_REQUEST:
      return { loading: true, comments: [] };
    case USER_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case USER_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFollowReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FOLLOW_REQUEST:
      return { loading: true };
    case USER_FOLLOW_SUCCESS:
      return { loading: false, success: true };
    case USER_FOLLOW_FAIL:
      return { loading: false, error: action.payload };
    case USER_UNFOLLOW_REQUEST:
      return { loading: true };
    case USER_UNFOLLOW_SUCCESS:
      return { loading: false, success: true };
    case USER_UNFOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forumPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FORUM_POST_CREATE_REQUEST:
      return { loading: true };
    case FORUM_POST_CREATE_SUCCESS:
      return { loading: false, success: true, forumPost: action.payload };
    case FORUM_POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FORUM_POST_CREATE_RESET: // Add this case
      return {}; // Reset the state
    default:
      return state;
  }
};

// Reducer for listing all forum posts
export const forumPostListReducer = (state = { forumPosts: [] }, action) => {
  switch (action.type) {
    case FORUM_POST_LIST_REQUEST:
      return { loading: true, forumPosts: [] };
    case FORUM_POST_LIST_SUCCESS:
      return { loading: false, forumPosts: action.payload };
    case FORUM_POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for getting forum post details
export const forumPostDetailsReducer = (state = { forumPost: {} }, action) => {
  switch (action.type) {
    case FORUM_POST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FORUM_POST_DETAILS_SUCCESS:
      return { loading: false, forumPost: action.payload };
    case FORUM_POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentListReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return { loading: true, comments: [] };
    case COMMENT_LIST_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const commentDetailReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_DETAIL_REQUEST:
      return { loading: true };
    case COMMENT_DETAIL_SUCCESS:
      return { loading: false, comment: action.payload };
    case COMMENT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
