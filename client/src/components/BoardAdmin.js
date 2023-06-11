import React, { useState, useEffect } from 'react';

import UserService from '../services/user.service';
import { setLoading } from '../slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

const BoardAdmin = () => {
    const [allUsers, setAllUsers] = useState([]);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const response = await UserService.getAdminBoard();
                setAllUsers(response.data);
            } catch (error) {
                const _content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setAllUsers(_content);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>All Users</h3>
            </header>
            {loading && <Loader />}
            {!loading && (
                <div className="table-wrapper ">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sr No</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.users?.length > 0 &&
                                allUsers?.users.map((user, index) => (
                                    <tr key={user._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user?.username}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.roles.map((role) => role?.name).join(', ')}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BoardAdmin;
