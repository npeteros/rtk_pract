import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../lib/reducers/authReducer";
import { useEffect } from "react";

export default function Login() {
    const {
        register,
        handleSubmit,
    } = useForm()

    const auth = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()

    const nav = useNavigate();

    useEffect(() => {
        if (auth) nav('/')
    }, [])

    async function onSubmit(logData) {
        try {
            const response = await dispatch(loginUser(logData)).unwrap();
            if (response.error) alert(response.error);
            else nav('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen max-w-lg m-auto flex flex-col justify-center gap-4 font-serif">
            <span className="text-2xl font-bold text-center uppercase">Chirper</span>
            <div className="bg-white rounded-lg w-full p-4">
                <span className="flex justify-center font-bold text-lg my-4">Log In</span>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-md text-neutral-600">Email Address</label>
                        <input
                            type="email"
                            className="border border-neutral-400 rounded-sm px-2"
                            placeholder="Enter your email address"
                            required
                            {...register("email")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-md text-neutral-600">Password</label>
                        <input
                            type="password"
                            className="border border-neutral-400 rounded-sm px-2"
                            placeholder="Enter your password"
                            required
                            {...register("password")}
                        />
                    </div>
                    <div className="flex gap-1">
                        <button
                            className={`bg-neutral-400 w-1/3 rounded-md text-white 
                                ${'lod' != 'loading' && "hover:bg-neutral-600"}
                            `}
                        // disabled={authStatus == 'loading'}
                        >
                            {'lod' == 'loading' ? "Logging in..." : "Log In"}
                        </button>
                        <span>or</span>
                        <Link to='/register' className="underline text-blue-500">create a new account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}