import { useForm } from "react-hook-form";
import { useAddPostMutation } from "../../lib/api";
import { useSelector } from "react-redux";

export default function CreatePostForm() {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const [addPost, { isLoading }] = useAddPostMutation();
    const auth = useSelector(state => state.authReducer)


    async function addNewPost(data) {
        try {
            const newData = {
                authorID: auth.user.id,
                post: data.post
            }
            await addPost(newData).unwrap()
            reset();
        } catch (error) {
            console.error('Failed to save the post: ', err)
        }
    }

    return (
        <>
            <main
                className="max-w-2xl w-full mx-auto mt-20 mb-12"
            >
                <form onSubmit={handleSubmit(addNewPost)}>
                    <textarea
                        className="w-full h-24 rounded-lg placeholder:text-neutral-400 p-4"
                        placeholder="What&apos;s on your mind?"
                        {...register('post', {
                            required: 'This field is required',
                            maxLength: {
                                value: 256,
                                message: 'Post cannot exceed 256 characters'
                            }
                        })}
                    />
                    {errors.post && <p className="text-red-600 text-sm mb-4">* {errors.post.message}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg uppercase"
                    >
                        {isLoading ? "Chirping..." : 'Chirp'}
                    </button>
                </form>
            </main>
        </>
    )
}