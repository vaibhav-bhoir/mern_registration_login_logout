import { createSlice } from '@reduxjs/toolkit';
import { setMessage } from './message';
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const register =
    ({ username, email, password }) =>
    async (dispatch) => {
        try {
            const response = await AuthService.register(username, email, password);
            dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(setMessage(message));
            throw error;
        }
    };

export const login =
    ({ username, password }) =>
    async (dispatch) => {
        try {
            const data = await AuthService.login(username, password);
            dispatch(setMessage(''));
            return { user: data };
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(setMessage(message));
            throw error;
        }
    };

export const logout = () => async (dispatch) => {
    await AuthService.logout();
    dispatch(setMessage(''));
};

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { setLoggedIn, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
