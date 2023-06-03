import axios from 'axios';

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

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
