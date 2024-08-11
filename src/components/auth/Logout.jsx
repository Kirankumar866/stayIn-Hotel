import React,{useContext} from 'react'
import { AuthContext } from './AuthProvider'
import { Link,useNavigate } from 'react-router-dom'

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()


    const handleLogout = ()=>{
        auth.handleLogout()
        navigate("/", {state : {message: "You have been logged out!"}})
        
    }


    const isLoggedIn = localStorage.getItem("token")

  return isLoggedIn ? (
    
    <button className='dropdown-item' onClick={handleLogout}>
        Logout
    </button>
    
  ) : null
}

export default Logout