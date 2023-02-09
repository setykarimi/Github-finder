import { ArrowCircleLeft, ArrowDown2, ArrowLeft, Location, LocationCross, LocationMinus, Profile } from "iconsax-react";
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
        <div className="w-full mx-auto lg:w-10/12" >
            <div className="mb-4">
                <Link to='/' className='flex items-center text-sm w-fit'>
                    <ArrowLeft className="mr-2 text-sm" size="15" />  Back to Search
                </Link>
            </div>

            <div className="grid grid-cols-4 gap-5 border p-4 rounded-lg">
                <figure className="flex flex-col items-center">
                    <img src={avatar_url} alt="" className="rounded-full" />
                    <a className="link link-secondary text-xs mt-3" href={html_url} target='_blank' rel="noreferrer">
                        Visit Github Profile
                    </a>
                </figure>

                <div className="col-span-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="card-title font-bold text-lg">{name}</h2>
                            <div className="flex w-full mt-2">
                                <span className="text-base-content text-opacity-40">{login}</span>
                                <div className="divider divider-horizontal mx-2"></div>
                                {
                                    location &&
                                    <div className="flex gap-1 items-center text-base-content text-opacity-40">
                                        <Location size={15} />
                                        <span>{location}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="badge badge-accent">
                                {type}
                            </div>
                            {
                                hireable &&
                                <div className="badge badge-info">
                                    Hirebale
                                </div>
                            }
                        </div>
                    </div>
                    <p className="mt-2">{bio}</p>
                    {blog &&
                        <a className="link link-info mt-1 block" href={`https://${blog}`} target='_blank' rel="noreferrer">{blog}</a>
                    }
                </div>
            </div>


            {
                twitter_username &&
                <a href={`https://twitter.com/${twitter_username}`} target='_blank' rel="noreferrer">{twitter_username}</a>
            }

            
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
    );
}

export default User;