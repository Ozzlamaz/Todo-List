import { useEffect, useRef, useState } from 'react'
import './App.css'
import tasksList from './data'
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from './ListItem';
import {FaLinkedin} from 'react-icons/fa'
import {FaFreeCodeCamp} from 'react-icons/fa'



function App() {
  const [tasks, setTasksList] = useState(tasksList);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const addTask = () => {
    if(inputRef.current.value != '') {
      setTasksList(prevTasksList => {
        let newTasksList = [...prevTasksList, {text : inputRef.current.value, color: selectRef.current.value,isDone: '' ,key: inputRef.current.value}];
        inputRef.current.value = '';
        localStorage.setItem("tasks", JSON.stringify(newTasksList));
        return newTasksList;
      });
      return
    }
    alert('Please write a task to add');
  }

  const deleteTask = (text) => {
    let index = tasks.indexOf(tasks.find(task => task.key == text));
    setTasksList(prevTasksList => {
      let newTasksList = [...prevTasksList.slice(0, index), ...prevTasksList.slice(index + 1)];
      localStorage.setItem("tasks", JSON.stringify(newTasksList));
      return newTasksList;
    })
  }

  const checkComplete = (text) => {
    let index = tasks.indexOf(tasks.find(task => task.key == text));
    setTasksList(prevTasksList => {
      let newTasksList = [...prevTasksList];
      newTasksList[index].text += ' (Done)';
      newTasksList[index].color = 'bg-secondary';
      newTasksList[index].isDone = 'd-none';
      localStorage.setItem("tasks", JSON.stringify(newTasksList));
      return newTasksList;
    })
  }

  return (
    <>
      <div className='app-wrapper container py-1 bg-dark rounded'>
        <h1 className='h1'>ToDo List</h1>
        <div className='container'>
          <div className='tasks-header-wrapper d-flex justify-content-center'>
            <input ref={inputRef} type="text" className='py-1 px-1 w-100 mr-1' />
            <select ref={selectRef} className='py-1 mx-1 rounded' name="color" id="pick-color">
              <option value="bg-success">Green</option>
              <option value="bg-primary">Blue</option>
              <option value="bg-warning">Yellow</option>
              <option value="bg-danger">Red</option>
            </select>
            <button onClick={addTask} type='button' className='btn btn-secondary ml-1'>Add</button>
          </div>
          <div className='tasks-body-wrapper'>
            <ul className='mx-0 my-2 px-0 py-0 tasks-list'>
              {tasks.map(task => {
                return (
                  <ListItem key={task.key} task={task} deleteTask={deleteTask} checkComplete={checkComplete}/>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <footer className='mt-5 py-2'>
        <span className='fw-bold text-white mx-1'>By Ahmad Osman</span>
        <span className='mx-1 my-0 h3 hover-effect'><a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"><FaLinkedin role='button' className='icon text-white'/></a></span>
        <span className='mx-1 my-0 h3 hover-effect'><a href="https://www.freecodecamp.org/fccd5aa6897-439f-4b3e-b4a9-c5bda7c2e055"><FaFreeCodeCamp role='button' className='icon text-white'/></a></span>
      </footer>
    </>
  )
}

export default App
