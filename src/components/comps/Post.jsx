import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchAuthorByPost } from "../../lib/reducers/userReducer";

dayjs.extend(relativeTime);

function OpenButton({ id }) {
    return (
        <div className="absolute mt-1 bg-white w-48 right-0 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <button
                className="hover:bg-neutral-200 py-2 w-full text-left"
            >
                <span className="mx-2">Edit</span>
            </button>
            <button
                className="hover:bg-neutral-200 py-2 w-full text-left"
                onClick={() => {
                }}
            >
                <span className="mx-2">Delete</span>
            </button>
        </div>
    )
}

export default function Post({ post, index }) {

    const [openBtn, setOpenBtn] = useState(false)

    const author = useSelector(state => fetchAuthorByPost(state, post))

    return (
        <article className={`bg-white h-full w-full p-4 mb-2 flex flex-col ${index == 0 ? 'rounded-t-lg' : 'rounded-none'}`}>
            <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-lg">{author.username}</span>
                    </div>
                    <span className="text-sm text-neutral-600">
                        {dayjs(post.createdOn).fromNow()}
                    </span>
                </div>
                {
                    // author.id == user.id &&
                    <div className="relative">
                        <button
                            className="block"
                            onClick={() => setOpenBtn(!openBtn)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                        {openBtn && <OpenButton id={post.id} />}
                    </div>
                }
            </div>
            <span className="mx-8 py-4">{post.post}</span>

            <button
                className="mx-8"
            >
                <svg width="20" height="20" fill="#808080" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228 6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464Zm6.826 1.641a3.998 3.998 0 0 0-5.49-.153l-1.335 1.198-1.336-1.197a3.999 3.999 0 0 0-5.494.154 4 4 0 0 0-.192 5.451L12 18.654l7.02-7.03a4 4 0 0 0-.193-5.454Z">
                    </path>
                </svg>
                {/* <svg width="20" height="20" fill="#ff3a40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228 6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464Z"></path>
                </svg> */}
            </button>
        </article >
    )
}