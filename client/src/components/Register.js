import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../slices/auth';
import { clearMessage } from '../slices/message';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { toast } from 'react-toastify';

const Register = () => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                'len',
                'The username must be between 3 and 20 characters.',
                (val) => val && val.toString().length >= 3 && val.toString().length <= 20
            )
            .required('This field is required!'),
        email: Yup.string().email('This is not a valid email.').required('This field is required!'),
        password: Yup.string()
            .test(
                'len',
                'The password must be between 6 and 40 characters.',
                (val) => val && val.toString().length >= 6 && val.toString().length <= 40
            )
            .required('This field is required!'),
    });

    const handleRegister = async (formValues) => {
        const { username, email, password } = formValues;
        setSuccessful(false);
        try {
            await dispatch(register({ username, email, password }));
            toast('You have been Registered Successfully');
            setSuccessful(true);
            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setSuccessful(false);
        }
    };

    return (
        <>
            {loading && <Loader />}
            {!successful && (
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
                                        <h6 className="msg-info">Please Create your Account</h6>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleRegister}
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
                                                        placeholder="Enter your Username"
                                                    />
                                                    <ErrorMessage name="username" component="div" className="error" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email" className="form-control-label text-muted">
                                                        Email
                                                    </label>
                                                    <Field
                                                        name="email"
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Enter your Email"
                                                    />
                                                    <ErrorMessage name="email" component="div" className="error" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password" className="form-control-label text-muted">
                                                        Password
                                                    </label>
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter your Password"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="error" />
                                                </div>
                                                <div className="row justify-content-center my-3 px-3">
                                                    <button type="submit" className="btn-block btn-color">
                                                        Register
                                                    </button>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                                <div className="bottom text-center">
                                    <p className="sm-text mx-auto mb-3">
                                        Have an account?
                                        <Link className="btn btn-white ml-2" to="/login">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="card card2">
                                <div className="my-auto mx-md-5 px-md-5 right">
                                    <h3 className="text-white">We are more than just a company</h3>
                                    <small className="text-white">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {message && (
                <div className="form-group">
                    <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                        {message}
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;
