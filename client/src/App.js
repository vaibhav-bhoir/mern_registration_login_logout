import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import ProtectedRoute from './ProtectedRoute';
import { logout } from './slices/auth';
import ResetPassword from './components/ResetPassword';

const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'));
            setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }
    }, [currentUser, logOut]);

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={'/'} className="navbar-brand">
                        Vaibhav
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/home'} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={'/mod'} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={'/admin'} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={'/user'} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/profile'} className="nav-link">
                                    <img
                                        className="logo"
                                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                        alt=""
                                        style={{ width: '25px', height: '25px', marginRight: '10px' }}
                                    />
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    Logout
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={'/register'} className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute>
                                    <BoardUser />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/mod"
                            element={
                                <ProtectedRoute>
                                    <BoardModerator />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <BoardAdmin />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
