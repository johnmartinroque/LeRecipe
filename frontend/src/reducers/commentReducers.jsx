import {
COMMENT_LIST_REQUEST,
COMMENT_LIST_SUCCESS,
COMMENT_LIST_FAIL,
COMMENT_CREATE_REQUEST,
COMMENT_CREATE_SUCCESS,
COMMENT_CREATE_FAIL,
} from '../constants/commentConstants'

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

export const commentCreateReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case COMMENT_CREATE_REQUEST:
            return { loading: true, comments: [] };
        case COMMENT_CREATE_SUCCESS:
            return { loading: false, comments: action.payload };
        case COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
