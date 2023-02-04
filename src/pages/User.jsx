import { ArrowCircleLeft, ArrowDown2, ArrowLeft, Profile } from "iconsax-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGithub } from "../components/context/github/GithubContext";
import RepoList from "../components/repos/RepoList";

const User = () => {
    const { getUser, user, loading, getUserRepos, repos } = useGithub()
    const params = useParams()
    useEffect(() => {
        getUser(params.login)
        getUserRepos(params.login)
    }, [])

    const { name, type, avatar_url, location, bio, blog, twitter_username, login, html_url, followers, following, public_repos, public_gist, hireable } = user

    if (loading) {
        return <div>loading</div>
    }
    return (
        <>
            <div className="w-full mx-auto lg:w-10/12" >
                <div className="mb-4">
                    <Link to='/' className='flex items-center text-sm w-fit'>
                        <ArrowLeft className="mr-2 text-sm" size="15" />  Back to Search
                    </Link>
                </div>

                <div className="flex">
                    <figure>
                        <img src={avatar_url} alt="" className="rounded-full" />
                    </figure>
                    <div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="card-title	font-bold text-lg">{name}</h2>
                                <span className="text-base-content text-opacity-40">{login}</span>
                            </div>
                            <div className="badge px-4 py-3 badge-accent">
                                {type}
                            </div>
                        </div>

                        {hireable &&
                            <div className="mx-1 badge badge-info">
                                Hirebale
                            </div>}
                        <p>{bio}</p>
                        <a className="btn btn-" href={html_url} target='_blank' rel="noreferrer">
                            Visit Github Profile
                        </a>


                        {location && <div className="stat">
                            {location}</div>}
                    </div>
                </div>



                {blog && <div><div className="stat">
                    {blog}</div>
                    <a href={`https://${blog}`} target='_blank' rel="noreferrer">blog</a></div>
                }

                {twitter_username && <div><div className="stat">
                    {blog}</div>
                    <a href={`https://twitter.com/${twitter_username}`} target='_blank' rel="noreferrer">{twitter_username}</a></div>
                }

                <div className="">
                    <div className="">
                        <div className="">
                            <h2>Followers</h2>
                            <span>{followers}</span>
                        </div>

                        <div className="">
                            <h2>Following</h2>
                            <span>{following}</span>
                        </div>

                        <div className="">
                            <h2>Public Repos</h2>
                            <span>{public_repos}</span>
                        </div>

                        <div className="">
                            <h2>Public Gist</h2>
                            <span>{public_gist}</span>
                        </div>
                    </div>

                    <RepoList repos={repos} />
                </div>
            </div>
        </>);
}

export default User;