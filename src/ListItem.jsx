import { useRef } from 'react';
import {BsTrash} from 'react-icons/bs'
import {ImCheckmark2} from 'react-icons/IM'

function ListItem(props) {
    
  const {text, color,isDone, key} = props.task;
  
  return (
    <li className={color+' h5 mb-1 px-2 py-2 rounded d-flex justify-content-between align-items-center'}>
        <span id='text' className='text container-fluid text-center'>
            {text}
        </span>
        <BsTrash role='button' className='icon' onClick={()=>{props.deleteTask(key)}}/>
        <ImCheckmark2 role='button' className={isDone + ' icon'} onClick={()=> {props.checkComplete(key)}}/>
    </li>
  )
}
export default ListItem