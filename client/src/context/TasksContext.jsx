import { useReducer, createContext } from "react"

export const TasksContext = createContext();

const updateTask = (tasks, newTask) => {

  const newTasks = tasks.map((task) => {
    if (task._id === newTask._id) {
      return newTask;
    }
    return task
  })
  return newTasks
} 

export const tasksReducer = (state, action) => {
  switch(action.type) {
    case 'SET_TASKS': return {...state, tasks: action.payload};
    case 'CREATE_TASK': return {...state, tasks: [action.payload, ...state.tasks]}
    case 'DELETE_TASK': return {...state, tasks: [...state.tasks.filter((task) => task._id !== action.payload._id)]}
    case 'UPDATE_TASK': return {...state, tasks: updateTask(state.tasks, action.payload)}
    default: return state
  }
};

function TasksContextProvider({children}) {

    const [state, dispatch] = useReducer(tasksReducer, {tasks: []})

  return (
    <TasksContext.Provider value={{...state, dispatch}}>
        {children}
    </TasksContext.Provider>
  )
}
export default TasksContextProvider