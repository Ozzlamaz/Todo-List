import { useState } from "react"
import useLogin from "../hooks/useLogin"
// components
import Spinner from "../components/spinner"

function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const {login, error, loading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form 
      className="bg-light text-dark container d-flex flex-column py-3 rounded" 
      style={{maxWidth: '24.5rem'}}
      onSubmit={handleSubmit}
    >

        <h3 className="text-center">Login</h3>

        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            className="mb-1 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
            className="mb-4 p-1"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
        />

        <button disabled={loading} className="btn btn-success mx-auto">{loading ? <Spinner /> : 'Login'}</button>
        {error &&
        <div className="alert alert-danger mt-2">{error}</div>
        }
    </form>
  )
}
export default Login