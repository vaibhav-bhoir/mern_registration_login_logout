import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clearUser, login } from '../slices/auth';
import { setMessage } from '../slices/message';
import Loader from './Loader';

const Login = () => {
    const navigate = useNavigate();
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        dispatch(clearUser());
        dispatch(setMessage(''));
    }, [dispatch]);

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required!'),
        password: Yup.string().required('This field is required!'),
    });

    const handleLogin = async (formValues) => {
        const { username, password } = formValues;
        try {
            await dispatch(login({ username, password }));
            navigate('/profile');
            window.location.reload();
        } catch (error) {}
    };

    return (
        <>
            {loading && <Loader />}
            <div className="container px-0 py-5 mx-auto">
                <div className="card card0">
                    <div className="d-flex flex-lg-row flex-column-reverse">
                        <div className="card card1">
                            <div className="row justify-content-center my-auto">
                                <div className="col-12 col-md-11 my-4">
                                    <div className="row justify-content-center px-3 mb-3">
                                        <img
                                            className="logo"
                                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                            alt=""
                                        />
                                    </div>
                                    <h3 className="mb-5 text-center heading">We are Developer</h3>
                                    <h6 className="msg-info">Please Create your account</h6>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleLogin}
                                    >
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="username" className="form-control-label text-muted">
                                                    Username
                                                </label>
                                                <Field
                                                    name="username"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Username or email id"
                                                />
                                                <ErrorMessage name="username" component="div" className="error" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" className="form-control-label text-muted">
                                                    Password
                                                </label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                />
                                                <ErrorMessage name="password" component="div" className="error" />
                                            </div>
                                            <div className="row justify-content-center my-3 px-3">
                                                <button
                                                    type="submit"
                                                    className="btn-block btn-color"
                                                    disabled={loading}
                                                >
                                                    {loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                    )}
                                                    <span>Login</span>
                                                </button>
                                            </div>
                                            {/* <div className="row justify-content-center my-2">
                                                <Link to="/">
                                                    <small className="text-muted">Forgot Password?</small>
                                                </Link>
                                            </div> */}
                                            {message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        {message}
                                                    </div>
                                                </div>
                                            )}
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                            <div className="bottom text-center">
                                <p className="sm-text mx-auto mb-3">
                                    Don't have an account?
                                    <Link className="btn btn-white ml-2" to="/register">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="card card2">
                            <div className="my-auto mx-md-5 px-md-5 right">
                                <h3 className="text-white">We are more than just a company</h3>
                                <small className="text-white">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
