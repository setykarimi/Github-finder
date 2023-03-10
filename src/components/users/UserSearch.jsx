import { useState } from "react";
import { useAlert } from "../context/alert/AlertContext";
import { useGithub } from "../context/github/GithubContext";
import { searchUsers } from "../context/github/GithubActions";
import Alert from "../layout/Alert";

const UserSearch = () => {
    const [text, setText] = useState('');
    const { users, dispatch } = useGithub();
    const { setAlert } = useAlert()

    // Handle change for text
    const handleChange = (e) => setText(e.target.value)
    // Handle submit for submitting text input
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (text === '') {
            setAlert('Please enter something', 'error')
        } else {
            dispatch({ type: 'SET_LOADING' })
            const users = await searchUsers(text)
            dispatch({ type: 'GET_USERS', payload: users })
            setText('')
        }
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
                <Alert />
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text" className="w-full pr-40 bg-gray-200 input input-md text-black"
                                placeholder="Search"
                                value={text}
                                onChange={handleChange} />
                            <button type="Submit" className="absolute top-0 right-0 rounded-l-none w-36 btn-primary btn btn-md">
                                Go
                            </button>
                        </div>
                    </div>
                </form>

            </div>
            {users?.length > 0 && (
                <div>
                    <button
                        className="btn btn-md btn-accent"
                        onClick={() => dispatch({ type: 'CLEAR_USERS' })}>
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserSearch;