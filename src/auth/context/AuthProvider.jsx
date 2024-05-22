import { useReducer } from "react"
import { AuthContext, authReducer } from "./"

const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );
    return{
        logged: !!user, 
        user: user,
    }
}

export const AuthProvider = ({children}) => {

   const [ authState, dispatch ] =  useReducer( authReducer, {}, init );

   const login = ( username = '' ) => {
      const user = { id: new Date().getTime(), username: username }
      const action = {
        type: '[Auth] Login', 
        payload: user
      }

      localStorage.setItem('user', JSON.stringify(user));

      dispatch( action ); 
   }

   const logout = () => {
      localStorage.removeItem('user');
      const action = { type: '[Auth] Logout'}
      dispatch( action ); 
   }

  return (
    <AuthContext.Provider value={{ ...authState, login: login, logout: logout }}>
        {children}
    </AuthContext.Provider>
  )
}