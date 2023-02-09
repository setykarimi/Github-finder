import PropTypes from 'prop-types'
import RepoItem from './RepoItem'


const RepoList = ({ repos }) => {
    return (
        <div>
            {repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)}
        </div>);
}

RepoList.propTypes = {
    repos: PropTypes.array.isRequired
}

export default RepoList;