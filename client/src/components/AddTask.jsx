import { useRef, useState } from "react"
import useTasksContext from "../hooks/useTasksContext";
import useUserContext from "../hooks/useUserContext";

function AddTask() {

    const {user} = useUserContext();
    const {dispatch} = useTasksContext();
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('bg-success');
    const [error, setError] = useState(null);
    const colorSelect = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = {title, color, completed: false}

        try {
            const response = await fetch('https://todo-list-api-lakr.onrender.com/api/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const data = await response.json();

            if(!response.task) {
                setError(data.error)
            }

            if(response.ok) {
                dispatch({type: 'CREATE_TASK', payload: data})
                setTitle('')
                setColor('bg-success')
                setError(null)
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <h3>Add a new task</h3>
            <form className='tasks-form bg-light text-black container py-3 rounded' onSubmit={(e) => handleSubmit(e)}>
            
                <label htmlFor='task-field'>Task:</label>
                <input 
                    id="task-field" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    type="text" 
                    className={'w-100 p-1 mb-2 rounded ' + (error && 'border-1 border-danger')} 
                />

                <label htmlFor='color-select'>Color:</label>
                <select id='color-select' ref={colorSelect} onChange={() => setColor(colorSelect.current.value)} className='mb-2 form-select rounded'>
                    <option value="bg-success">Green</option>
                    <option value="bg-primary">Blue</option>
                    <option value="bg-warning">Yellow</option>
                    <option value="bg-danger">Red</option>
                </select>

                <button type='submit' className='btn btn-success w-100 mt-3'>Add</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </>
    )
}
export default AddTask