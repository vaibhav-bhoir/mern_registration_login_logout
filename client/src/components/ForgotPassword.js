import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clearUser, forgotPassword } from '../slices/auth';
import { setMessage } from '../slices/message';
import Loader from './Loader';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        dispatch(clearUser());
        dispatch(setMessage(''));
    }, [dispatch]);

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('This is not a valid email.').required('This field is required!'),
    });

    const handleSubmit = async (formValues, { resetForm }) => {
        const { email } = formValues;
        try {
            await dispatch(forgotPassword({ email }));
            toast('Reset Password link sent over email');
            resetForm();
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
                                    <h3 className="mb-5 text-center heading">Forgot Password</h3>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form>
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
                                            <div className="row justify-content-center my-3 px-3">
                                                <button
                                                    type="submit"
                                                    className="btn-block btn-color"
                                                    disabled={loading}
                                                >
                                                    {loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                    )}
                                                    <span>Submit</span>
                                                </button>
                                            </div>
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

export default ForgotPassword;
