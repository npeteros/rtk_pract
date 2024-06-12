import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../lib/reducers/authReducer";

export default function Navbar() {
    const [floatingNav, setFloatingNav] = useState(false)

    const auth = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const nav = useNavigate();

    function signOut() {
        try {
            dispatch(logoutUser());
            return nav('/login')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="h-20 bg-white">
            <div className="max-w-[90rem] w-full h-full mx-auto flex justify-between items-center">
                <span className="font-bold uppercase">Chirper</span>
                <div className="relative">
                    <button
                        onClick={() => setFloatingNav(!floatingNav)}
                        className="flex gap-2 items-center">
                        <span>{auth.user.username}</span>
                        {
                            floatingNav ?
                                <svg width="18" height="18" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m6 15 6-6 6 6"></path>
                                </svg>
                                :
                                <svg width="18" height="18" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                        }
                    </button>
                    {
                        floatingNav &&
                        <div className="absolute right-0 bg-white w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2">
                            {/* <button
                                className="hover:bg-neutral-200 px-4 py-2 max-w-48 w-full text-left text-xs break-words"
                                disabled
                            >
                                {auth.user.email}
                            </button> */}
                            <button
                                className="hover:bg-neutral-200 px-4 py-2 w-full text-left"
                                onClick={signOut}
                            >
                                Log Out
                            </button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}