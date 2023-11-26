import { useEffect, useState } from "react"
import useGetTasks from "../hooks/useGetTasks"
//components
import AddTask from "../components/AddTask"
import TaskDetails from "../components/TaskDetails"
import Spinner from '../components/Spinner'
import ErrorPage from "./ErrorPage"
import Filter from "../components/Filter"
import { set } from "date-fns"



function Home() {

    const {tasks, loading, error, getTasks} = useGetTasks()
    const [filteredTasks, setFilteredTasks] = useState([])

    useEffect(() => {
        getTasks()
    },[]);

    useEffect(() => {
        setFilteredTasks(tasks)
    },[tasks])

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
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Tasks</h3>
                    <Filter setFilteredTasks={setFilteredTasks}/>
                </div>
                {filteredTasks.length === 0 ?
                <div className="d-flex justify-content-center align-items-center h-100">
                    <h4 className="m-auto">You currently have no tasks</h4>
                </div>
                :
                <div>
                    {filteredTasks.map((task) => {
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