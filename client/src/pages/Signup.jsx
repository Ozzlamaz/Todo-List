import useSignup from '../hooks/useSignup'
import { useState } from 'react'

function Signup() {

    const {signup, error, loading} = useSignup()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

        const handleSubmit = async (e) => {
            e.preventDefault()

            await signup(userName, email, password)
        }

    return (
        <form 
            className="bg-light text-dark container d-flex flex-column py-3 rounded" 
            style={{maxWidth: '24.5rem'}}
            onSubmit={handleSubmit}
        >
            <h3 className="text-center">Login</h3>

            <label htmlFor="user-name">User:</label>
            <input
                type="text"
                id="user-name"
                className="mb-1 p-1"
                onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                className="mb-1 p-1"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                className="mb-4 p-1"
                onChange={(e) => setpassword(e.target.value)}
            />

            <button disabled={loading} className="btn btn-success mx-auto">Signup</button>
            {error &&
            <div className="alert alert-danger mt-2">{error}</div>
            }
        </form>
    )
  }
  export default Signup