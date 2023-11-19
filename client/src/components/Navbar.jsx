import { Link } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import useLogout from '../hooks/useLogout'

function Navbar() {

  const { user } = useUserContext()
  const { logout } =  useLogout()

  return (
    <header className="container-fluid d-flex justify-content-between align-items-center bg-light text-black mb-5">
        <Link to='/'>
          <h1>ToDo List</h1>
        </Link>
        <nav>
          {user ?
          <button type='button' className='btn btn-dark' onClick={logout}>Logout</button>
          :
          <>
            <Link to='/login' role='button' className='btn btn-dark me-1'>Login</Link>
            <Link to='/signup' role='button' className='btn btn-dark'>Signup</Link>
          </>
          }
        </nav>
    </header>
  )
}
export default Navbar