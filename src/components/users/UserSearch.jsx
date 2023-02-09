import { useState } from "react";
import { useAlert } from "../context/alert/AlertContext";
import { useGithub } from "../context/github/GithubContext";

const UserSearch = () => {
    const [text, setText] = useState('');
    const { users, searchUsers, clearUsers } = useGithub();
    const { setAlert } = useAlert()

    const handleChange = (e) => setText(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (text === '') {
            setAlert('Please enter something', 'error')
        } else {
            searchUsers(text)
            setText('')
        }
    }
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
            <div>
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
                    <button className="btn btn-md btn-accent" onClick={clearUsers}>
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserSearch;