import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const useTasksContext = () => {
    return useContext(TasksContext)
}

export default useTasksContext