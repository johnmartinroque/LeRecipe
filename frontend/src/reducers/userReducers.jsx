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

export const followingListReducer = (state = { following: [] }, action) => {
  switch (action.type) {
    case GET_FOLLOWING_LIST_REQUEST:
      return { loading: true };
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