import { useState } from 'react'
import useUserContext from './useUserContext'

function useSignup() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {dispatch} = useUserContext()

    const signup = async (userName, email, password) => {
        setLoading(true)
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName, email, password})
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

    return {signup, error, loading}

}
export default useSignup