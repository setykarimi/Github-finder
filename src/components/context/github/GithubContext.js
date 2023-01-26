import { createContext, useContext, useReducer, useState } from "react";
import githubReucer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReucer, initialState)

    
    const searchUsers = async (text) => {
        const params = new URLSearchParams({
            q: text
        })
        setLoading()
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            // }
        })

        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    const clearUsers = () => {
        dispatch({type: 'CLEAR_USERS'})
    }

    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading, 
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export const useGithub = () => useContext(GithubContext)