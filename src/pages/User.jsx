import { ArrowCircleLeft, ArrowDown2, ArrowLeft, Location, LocationCross, LocationMinus, Profile } from "iconsax-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser, getUserRepos } from "../components/context/github/GithubActions";
import { useGithub } from "../components/context/github/GithubContext";
import RepoList from "../components/repos/RepoList";

const User = () => {
    const { user, loading, repos, dispatch } = useGithub()
    const params = useParams()
    useEffect(() => {

        dispatch({ type: 'SET_LOADING' })
        const getUserData = async () => {
            const userData = await getUser(params.login)
            dispatch({ type: 'GET_USER', payload: userData })

            const userRepoData = await getUserRepos(params.login)
            dispatch({ type: 'GET_REPOS', payload: userData })
        }

        getUserData()
    }, [dispatch, params.login])

    const { name, type, avatar_url, location, bio, blog, twitter_username, login, html_url, followers, following, public_repos, public_gist, hireable } = user

    if (loading) {
        return <div>loading</div>
    }
    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to='/' className="btn btn-ghost">
                        Back to Search
                    </Link>
                </div>

                <div
                    className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="" />
                            </figure>
                            <div className="card-body justify-end ">
                                <h2 className="card-title mb-0 text-white">
                                    {name}
                                </h2>

                                <span className="text-white">{login}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl card-title">
                                {name}
                                <div className="ml-2 mr-1 badge badge-success">
                                    {type}
                                </div>

                                {hireable && (
                                    <div className="mx-1 badge badge-info">
                                        Hireable
                                    </div>
                                )}
                            </h1>

                            <p>{bio}</p>
                            <div className="mt-4 card-actions">
                                <a href={html_url} target='_blank' rel="noreferrer" className="btn btn-outline">
                                    Visit Github Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default User;