import { useEffect } from "react"
import useTasksContext from "../hooks/useTasksContext"
import useUserContext from "../hooks/useUserContext"
//components
import AddTask from "../components/AddTask"
import TaskDetails from "../components/TaskDetails"



function Home() {

    const {user, dispatch: userDispatch} = useUserContext();
    const {tasks, dispatch} = useTasksContext();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://todo-list-api-lakr.onrender.com/api/tasks',{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if(response.ok) {
                    const data = await response.json()
                    dispatch({type: 'SET_TASKS', payload: data})
                }
                if(response.status === 401) {
                    throw Error ('Unauthorized')
                }
            } catch (error) {
                userDispatch({type: 'LOGOUT'})
            }
        }
        fetchTasks()
    },[]);

  return (
    <div className="home page container">
        <div className="row">
            <div className="col-8">
                <h3>Tasks</h3>
                {tasks && tasks?.length !== 0 ?
                <>
                    {tasks.map((task) => {
                        return <TaskDetails key={task._id} task={task}/>
                    })
                    }
                </>
                :
                <div className="d-flex justify-content-center align-items-center h-100">
                    <h4 className="m-auto">You Currently have no tasks</h4>
                </div>
                }
            </div>
            <div className="col-4">
                <AddTask />
            </div>
        </div>
    </div>
  )
}
export default Home