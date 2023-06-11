import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const BoardUser = () => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error) {
                    localStorage.removeItem('user');
                }

                setContent(_content);
                navigate('/login');
            }
        );
    }, [navigate]);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default BoardUser;
