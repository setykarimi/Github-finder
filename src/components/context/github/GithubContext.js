import { createContext, useContext, useReducer, useState } from "react";
import gtihubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(gtihubReducer, initialState)


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
    const getUser = async (login) => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            // }
        })

        if (response.status === 400) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }

    }

    // Get user repos
    const getUserRepos = async (login) => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            // }
        })

        const data = await response.json()
        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    const clearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' })
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return <GithubContext.Provider value={{
        ...state,
        dispatch,
        // searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export const useGithub = () => useContext(GithubContext)