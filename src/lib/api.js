import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/`
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials
            })
        }),
        getPosts: build.query({
            query: () => ({ url: 'posts' }),
            providesTags: ['Post']
        }),
        addPost: build.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        })
    })
});

export const {
    useRegisterUserMutation,
    useGetPostsQuery, useAddPostMutation
} = api;