import { useState,useEffect } from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({ element: Component }) => {
    // const [token,setToken] = useState(localStorage.getItem('access'));

//   useEffect(()=>{
//     const handleStorageChange = () =>{
//       setToken(localStorage.getItem('access'));
//     };
//     window.addEventListener("storage",handleStorageChange);
//     return () => window.removeEventListener("storage",handleStorageChange);
   
//   },[])

    const token = localStorage.getItem('access');

    
    return token ? Component : <Navigate to="/login" />;
}
 
export default PrivateRoute;