import { useReducer, createContext, useEffect } from "react"

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN': return {...state, user: action.payload}
    case 'LOGOUT': return {...state, user: null}
  }
}

function UserContextProvider({children}) {

    const [state, dispatch] = useReducer(userReducer, {user: null})

    useEffect(() => {
      const user = localStorage.getItem('user')
      if (user) {
        dispatch({type: 'LOGIN', payload: user})
      }
    },[])

  return (
    <UserContext.Provider value={{...state, dispatch}}>
        {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider