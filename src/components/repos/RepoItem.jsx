import { Eye, Link } from 'iconsax-react';
import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {
    const {
        name,
        description,
        htm_url,
        forks,
        open_issues,
        watchers_count,
        stargazers_count
    } = repo
    return (
        <div>
            <h3>
                <a href={htm_url}>
                    <Link />
                    {name}
                </a>

                <p>{description}</p>

                <p>
                    <Eye />
                    {watchers_count}
                </p>

                <p>
                    {stargazers_count}
                </p>

                <p>
                    {open_issues}
                </p>
                
                <p>
                    {forks}
                </p>
            </h3>
        </div>
    );
}

RepoItem.propTypes = {
    repos: PropTypes.object.isRequired
}

export default RepoItem;