import useTasksContext from "../hooks/useTasksContext"

const size = {height: '1.25rem', width: "1.25rem"}

function Filter({setFilteredTasks}) {

    const {tasks} = useTasksContext()

    const handleFilter = (e) => {
        e.stopPropagation()

        if(e.target.value === '') {
            setFilteredTasks(tasks)
            return
        }
        setFilteredTasks(tasks.filter(task => task.color === e.target.value))
    }

    return (
        <dispatchEvent>
            <h5 className="d-inline me-3">Filter:</h5>
            <button onClick={(e) => handleFilter(e)} type="button" value="" className="bg-light rounded me-1" style={size}></button>
            <button onClick={(e) => handleFilter(e)} type="button" value="bg-success" className="bg-success rounded me-1" style={size}></button>
            <button onClick={(e) => handleFilter(e)} type="button" value="bg-primary" className="bg-primary rounded me-1" style={size}></button>
            <button onClick={(e) => handleFilter(e)} type="button" value="bg-warning" className="bg-warning rounded me-1" style={size}></button>
            <button onClick={(e) => handleFilter(e)} type="button" value="bg-danger" className="bg-danger rounded me-1" style={size}></button>
        </dispatchEvent>
    )
}
export default Filter