import {Link} from 'react-router-dom'
 
function ErrorPage({error}) {

    return (
    <div className="col-12 text-center">
        <h2>Looks like there was Error</h2>
        <h4>{error}</h4>
        <Link to='/' role="button" className='btn btn-danger'>Go Back</Link>
    </div>
    )
}
export default ErrorPage