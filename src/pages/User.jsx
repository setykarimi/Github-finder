import { Profile } from "iconsax-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGithub } from "../components/context/github/GithubContext";

const User = () => {
    const { getUser, user, loading } = useGithub()
    const params = useParams()
    useEffect(() => {
        getUser(params.login)
    }, [])

    const { name, type, avatar_url, location, bio, blog, twitter_username, login, html_url, followers, following, public_repos, public_gist, hireable } = user

    if (loading) {
        return <div>loading</div>
    }
    return (
        <>
            <div className="w-full mx-auto lg:w-10/12" >
                <div className="mb-4">
                    <Link to='/' className='btn btn-ghost'>
                        Back to Search
                    </Link>
                </div>

                <figure>
                    <img src={avatar_url} alt="" />
                </figure>
                <h2>{name}</h2>
                <p>{login}</p>

                <div className="ml-2 mr-1 badge badge-success">
                    {type}
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
                </div>
            </div>
        </>);
}

export default User;