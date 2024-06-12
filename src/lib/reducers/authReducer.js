import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
        status: 'idle',
        error: null
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const {
    logoutUser
} = authReducer.actions;

export default authReducer.reducer;

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Unable to login');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);