import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// context
import TasksContextProvider from './context/TasksContext.jsx'
import UserContextProvider from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <TasksContextProvider>
            <App />
        </TasksContextProvider>
    </UserContextProvider>
)
