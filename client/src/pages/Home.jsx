import { useEffect } from "react"
import useTasksContext from "../hooks/useTasksContext"
import useUserContext from "../hooks/useUserContext"
import useGetTasks from "../hooks/useGetTasks"
//components
import AddTask from "../components/AddTask"
import TaskDetails from "../components/TaskDetails"
import Spinner from '../components/Spinner'



function Home() {

    const {tasks, loading, getTasks} = useGetTasks()

    useEffect(() => {
        getTasks()
    },[])

    return (
    <div className="home page container">
        <div className="row">
            <div className="col-12 col-md-8">
                <h3>Tasks</h3>
                {!loading ?
                    tasks.length === 0 ?
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
                :
                <div className="d-flex justify-content-center">
                    <Spinner size={{width: '10rem', height: '10rem', fontSize: '3rem'}} />
                </div>
                }
            </div>
            <div className="col-12 col-md-4">
                <AddTask />
            </div>
        </div>
    </div>
    )
    }
export default Home