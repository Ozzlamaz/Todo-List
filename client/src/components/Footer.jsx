//icons
import {BsLinkedin} from 'react-icons/bs';

function Footer() {
  return (
    <footer className='d-flex flex-column align-items-center my-5'>
        <div><span><u>Designed and Coded by </u></span><span><u><strong>Ahmad Osman</strong></u></span></div>
        <div className='linkedin-icon'><a role='button' className='btn btn-dark' href="https://www.linkedin.com/in/ahmadosman-linked" target='_blank'><BsLinkedin style={{fontSize: '2rem'}}/></a></div>
    </footer>
  )
}
export default Footer