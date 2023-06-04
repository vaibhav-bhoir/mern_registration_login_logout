import { createSlice } from '@reduxjs/toolkit';
import { setMessage } from './message';
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const register =
    ({ username, email, password }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
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
        } finally {
            dispatch(setLoading(false));
        }
    };

export const login =
    ({ username, password }) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
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
        } finally {
            dispatch(setLoading(false));
        }
    };

export const logout = () => async (dispatch) => {
    await AuthService.logout();
    dispatch(setMessage(''));
};

const initialState = {
    isLoggedIn: user ? true : false,
    user: user ? user : null,
    loading: false,
};

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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoggedIn, setUser, clearUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
