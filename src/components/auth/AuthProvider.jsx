import React,{createContext, useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext({
    user : null,
    handleLogin : (token)=>{},
    handleLogout : ()=>{}
})




const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    var decodedToken

    const handleLogin = (token) => {
        
        if (typeof token !== "string" || token.trim() === "") {
            console.error("Invalid token: must be a non-empty string");
            return;
        }

        try {
            decodedToken = jwtDecode(token);
            
            localStorage.setItem("userId", decodedToken.sub);
            localStorage.setItem("userRole", decodedToken.roles);
            localStorage.setItem("token", token);
            setUser(decodedToken);
            
        } catch (error) {
            console.error("Error decoding token:", error.message);
        }
    };

    
    const handleLogout = ()=>{
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }

   
  return (
    <AuthContext.Provider value = {{user, handleLogin, handleLogout}}>
        {children}

    </AuthContext.Provider>
  )
}

export default AuthProvider
