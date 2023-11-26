import { useEffect } from "react"
import useGetTasks from "../hooks/useGetTasks"
//components
import AddTask from "../components/AddTask"
import TaskDetails from "../components/TaskDetails"
import Spinner from '../components/Spinner'
import ErrorPage from "./ErrorPage"



function Home() {

    const {tasks, loading, error, getTasks} = useGetTasks()

    useEffect(() => {
        getTasks()
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
            <div className="col-12 col-md-4 mb-3">
                <AddTask />
            </div>
            <div className="col-12 col-md-8">
                <h3>Tasks</h3>
                {tasks.length === 0 ?
                <div className="d-flex justify-content-center align-items-center h-100">
                    <h4 className="m-auto">You currently have no tasks</h4>
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