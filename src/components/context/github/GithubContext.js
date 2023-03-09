import { createContext, useContext, useReducer } from "react";
import gtihubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(gtihubReducer, initialState)


    return <GithubContext.Provider value={{
        ...state,
        dispatch,
        // searchUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

export const useGithub = () => useContext(GithubContext)

// const searchUsers = async (text) => {
//     const params = new URLSearchParams({
//         q: text
//     })
//     setLoading()
//     const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
//         // headers: {
//         //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
//         // }
//     })

//     const { items } = await response.json()
//     dispatch({
//         type: 'GET_USERS',
//         payload: items
//     })
// }

// Get single user
