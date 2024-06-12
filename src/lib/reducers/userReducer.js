import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
    }
})

export default userReducer.reducer

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Unable to login');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAuthorByPost = (state, post) => {
    return state.userReducer.users.find(u => u.id == post.userID)
}