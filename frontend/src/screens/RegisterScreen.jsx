import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import '../css/RegisterScreen.css';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Accessing userRegister state from the Redux store
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        // If user is logged in (after registration), redirect them to the home page
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        // Check if passwords match before dispatching the register action
        if (password1 !== password2) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password1, password2));
        }
    };

    const handleCloseModal = () => {
        navigate('/');
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal-background')) {
            handleCloseModal();
        }
    };

    return (
        <div className="modal-background" onClick={handleBackgroundClick}>
        <div className="register-container">
            <div className="form-container">
            <h1>Sign Up</h1>
            {message && <div className="error-message">{message}</div>} {/* Password mismatch error */}
            {error && <div className="error-message">{error}</div>} {/* Show registration error */}
            {loading && <div className="loading-spinner">Loading...</div>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />
                </div>

                <button type="submit" className="btn-register">
                    Sign Up
                </button>
            </form>

            <div className="login-link">
                Have an account? <Link to="/login">Sign In</Link>
            </div>
            </div>
            <div className="logo-register">
                <img src="/LeRecipelogoright.png" alt="LeRecipe Logo" />
            </div>
            <button className="close-button" onClick={handleCloseModal}>
                        x
            </button>
        </div>
        </div>
    );
};

export default RegisterScreen;
