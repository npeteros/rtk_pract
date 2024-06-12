import { useDispatch, useSelector } from "react-redux";
import { CreatePostForm, Navbar, Post, Spinner } from "./components/mainComponentLibrary";
import { useGetPostsQuery } from "./lib/api";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAllUsers } from "./lib/reducers/userReducer";

function PostList() {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    let content;

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        content = posts.map((post, index) => <Post key={post.id} post={post} index={index} />)
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return content;
}

export default function App() {
    const auth = useSelector(state => state.authReducer)

    if (!auth.token) return <Navigate to="/login" />
    const dispatch = useDispatch();

    const userStatus = useSelector(state => state.userReducer.status)

    useEffect(() => {
        if (userStatus == 'idle') {
            dispatch(getAllUsers())sdsafsafsa
        }
    }, [userStatus, dispatch])

    return (
        <>
            <Navbar />
            <CreatePostForm />

            <section className="flex flex-col max-w-2xl w-full mx-auto">
                <PostList />
            </section>
        </>
    )
}