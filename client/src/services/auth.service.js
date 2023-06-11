import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_AUTH_API_URL;

const register = (username, email, password) => {
    return axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
    });
};

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/signin`, {
        username,
        password,
    });
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
    });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
    toast('Logout Successfully');
};

const authService = {
    register,
    login,
    logout,
    forgotPassword,
};

export default authService;
