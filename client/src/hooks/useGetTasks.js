import { useState } from "react"
import useUserContext from "./useUserContext"
import useTasksContext from "./useTasksContext"

const useGetTasks = () => {
    const [loading, setLoading] = useState(false)
    const {user, dispatch: userDispatch} = useUserContext();
    const {tasks, dispatch: taskDispatch} = useTasksContext();

    const getTasks = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://todo-list-api-lakr.onrender.com/api/tasks',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if(response.ok) {
                setLoading(false)
                const data = await response.json()
                taskDispatch({type: 'SET_TASKS', payload: data})
            }
            if(response.status === 401) {
                throw Error ('Unauthorized')
            }
        } catch (error) {
            setLoading(false)
            userDispatch({type: 'LOGOUT'})
        }
    }

    return {tasks, loading, getTasks}
}

export default useGetTasks