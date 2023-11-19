import useUserContext from './useUserContext'
import useTasksContext from './useTasksContext'

const useLogout = () => {
    const {dispatch} = useUserContext()
    const {dispatch: tasksDispatch} = useTasksContext()
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        // dispatch logout
        dispatch({type: 'LOGOUT'})
        tasksDispatch({type: 'SET_TASKS', payload: null})
    }
    return {logout}
}

export default useLogout