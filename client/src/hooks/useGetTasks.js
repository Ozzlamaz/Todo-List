import { useState } from "react"
import useUserContext from "./useUserContext"
import useTasksContext from "./useTasksContext"

const useGetTasks = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user, dispatch: userDispatch} = useUserContext();
    const {tasks, dispatch: taskDispatch} = useTasksContext();

    const getTasks = async () => {
        setLoading(true)

        const response = await fetch('https://todo-list-api-lakr.onrender.com/api/tasks',{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const data = await response.json()


        if(response.status === 401) {
            setLoading(false)
            userDispatch({type: 'LOGOUT'})
        }

        if(!response.ok) {
            setLoading(false)
            setError(data.error)
        }

        if(response.ok) {
            setLoading(false)
            setError(false)
            taskDispatch({type: 'SET_TASKS', payload: data})
        }
    }

    return {tasks, loading, error, getTasks}
}

export default useGetTasks