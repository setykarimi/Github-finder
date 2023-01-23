import { createContext, useContext, useReducer, useState } from "react";
import githubReucer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: true
    }

    const [state, dispatch] = useReducer(githubReucer, initialState)

    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            // }
        })

        const data = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading, fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export const useGithub = () => useContext(GithubContext)