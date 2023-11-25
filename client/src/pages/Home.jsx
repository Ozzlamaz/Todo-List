import { useEffect } from "react"
//components
import AddTask from "../components/AddTask"
import TaskDetails from "../components/TaskDetails"
import Spinner from '../components/Spinner'
import ErrorPage from "./ErrorPage"



function Home() {

    const {tasks, loading, error, getTasks} = useGetTasks()

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

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner size={{width: '10rem', height: '10rem', fontSize: '3rem'}} />
            </div>
        )
    }

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    return (
    <div className="home page container">
        <div className="row">
            <div className="col-12 col-md-4">
                <AddTask />
            </div>
            <div className="col-12 col-md-8">
                <h3>Tasks</h3>
                {tasks.length === 0 ?
                <div className="d-flex justify-content-center align-items-center h-100">
                    <h4 className="m-auto">You Currently have no tasks</h4>
                </div>
                :
                <div>
                    {tasks.map((task) => {
                        return <TaskDetails key={task._id} task={task}/>
                    })
                    }
                </div>
                }
            </div>
        </div>
    </div>
    )
}

    
export default Home