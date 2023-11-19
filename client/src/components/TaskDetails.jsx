import useTasksContext from '../hooks/useTasksContext'
import { useState } from 'react'
import useUserContext from '../hooks/useUserContext'
// icons
import {BsTrash} from 'react-icons/bs'
import {LiaCheckSquareSolid} from 'react-icons/lia'
import {FiEdit} from 'react-icons/fi'
import {BiRefresh} from 'react-icons/bi'
// date format
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


function TaskDetails({task}) {

  const { user } = useUserContext()
  const {dispatch} = useTasksContext();
  const {_id, title, color, completed, createdAt, updatedAt} = task;
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(title)

  const handleDelete = async() => {
     try {
      const response = await fetch(`/api/tasks/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const data = await response.json();

      if(response.ok) {
        dispatch({type: 'DELETE_TASK', payload: data})
      }

     } catch (error) {
      console.log(error)
     }
  }

  const handleCompleted = async() => {
    try {
     const response = await fetch(`/api/tasks/${_id}`, {
       method: 'PATCH',
       body: JSON.stringify({...task, completed: !completed}),
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }
     })

     const data = await response.json();

     if(response.ok) {
       dispatch({type: 'UPDATE_TASK', payload: {...data, completed: !completed}})
     }

    } catch (error) {
     console.log(error)
    }
 }

 const handleUpdate = async() => {
  try {
   const response = await fetch(`/api/tasks/${_id}`, {
     method: 'PATCH',
     body: JSON.stringify({...task, title: text}),
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
  }
   })

   const data = await response.json();

   if(response.ok) {
     dispatch({type: 'UPDATE_TASK', payload: {...data, title: text }})
     setEditMode(false)
   }

  } catch (error) {
   console.log(error)
  }
}

    return (
        <div className={'p-3 rounded mb-4 position-relative ' + (completed ? 'bg-secondary' : color)}>
          {editMode ? 
          <div>
            <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className={'w-100 rounded'}>
            </textarea>
          </div>
          : 
          <h4 className='bg-light text-dark p-1 rounded d-inline-block'>{completed ? <del>{title}</del> : title}</h4>
          }
          <p className='mb-0' style={{fontSize: '0.75rem'}}>Added: {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
          <p className='mb-0' style={{fontSize: '0.75rem'}}>Last Updated: {formatDistanceToNow(new Date(updatedAt), {addSuffix: true})}</p>
          <div className='position-absolute end-0 btn-group' role='group'>

            {!completed ?
            <LiaCheckSquareSolid 
              className={'btn btn-light text-dark p-1 ' + (editMode && 'invisible')} 
              style={{fontSize: '1.75rem'}} 
              role='button'
              onClick={handleCompleted}
            />
            :
            <BiRefresh
              className={'btn btn-light text-dark p-1 ' + (editMode && 'invisible')} 
              style={{fontSize: '1.75rem'}} 
              role='button'
              onClick={handleCompleted}
            />
            }

            {editMode ? 
            <button 
              className='btn btn-light rounded'
              onClick={handleUpdate}
              >save
            </button>
            :
            <FiEdit 
              className='btn btn-light text-dark p-1' 
              style={{fontSize: '1.75rem'}} 
              role='button'
              onClick={() => setEditMode(true)}
            />
            }

            <BsTrash 
              className={'btn btn-light text-dark p-1 ' + (editMode && 'invisible')} 
              style={{fontSize: '1.75rem'}} 
              role='button'
              onClick={handleDelete}
            />
          </div>
        </div>
    )
}
export default TaskDetails