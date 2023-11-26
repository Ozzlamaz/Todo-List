import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import useUserContext from './hooks/useUserContext'
// components
import NavBar from './components/Navbar'
import Footer from './components/Footer'
// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ErrorPage from './pages/ErrorPage'


function App() {

  const { user } = useUserContext()

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={ user ? <Home /> : <Navigate to='/login' />}/>
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}/>
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}/>
        <Route path='/*' element={<ErrorPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
