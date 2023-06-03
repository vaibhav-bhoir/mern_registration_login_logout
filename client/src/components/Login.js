import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clearUser, login } from '../slices/auth';
import { setMessage } from '../slices/message';
import Loader from './Loader';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

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
        setLoading(true);
        try {
            await dispatch(login({ username, password }));
            navigate('/profile');
            window.location.reload();
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="col-md-12 login-form">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className="form-control" />
                                <ErrorMessage name="username" component="div" className="alert alert-danger" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="alert alert-danger" />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                                    <span>Login</span>
                                </button>
                                <p className="mt-4">
                                    No Account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </Form>
                    </Formik>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
            {loading && <Loader />}
        </>
    );
};

export default Login;
