import { useState } from 'react'
import useUserContext from './useUserContext'

function useLogin() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useUserContext()

    const login = async (email, password) => {
        setLoading(true)
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const json = await response.json()

        if(!response.ok) {
            setLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            setLoading(false)
            setError(null)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
        }
    }

    return {login, error, loading}

}
export default useLogin