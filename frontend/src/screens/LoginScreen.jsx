import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import '../css/LoginScreen.css'

const LoginScreen = () => {
    const [username, setUsername] = useState(''); // Changed from email to username
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Accessing userLogin state from the Redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        // If user is logged in, redirect them to the home page
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password)); // Using username for login
    };


    return (
        <div className="modal-background">
        <div className="login-container">
            <div className="logo-login">
                <img src="/LeRecipelogoleft.png" alt="LeRecipe Logo" />
            </div>
            <div className="form-container-login">
            <h1>Sign In</h1>
            {error && <div className="error-message">{error}</div>} {/* Show error message */}
            {loading && <div className="loading-spinner">Loading...</div>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Username</label> {/* Changed from Email Address to Username */}
                    <input
                        type="text" // Changed to text instead of email
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Set username instead of email
                        placeholder="Enter username"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button type="submit" className="btn-login">
                    Login
                </button>
            </form>

            <div className="register-link">
                Don't have an account? <Link to="/register">Register Now</Link>
            </div>
            </div>
        </div>
        </div>
    );
};

export default LoginScreen;
