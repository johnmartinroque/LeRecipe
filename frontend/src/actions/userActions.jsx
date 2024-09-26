import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"




export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        // Sending username instead of email for login
        const { data } = await axios.post(
            '/api/accounts/users/login/',
            { 'username': username, 'password': password },
            config
        );
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail  // Changed from 'details' to 'detail'
                ? error.response.data.detail
                : error.message,
        });
    }
};