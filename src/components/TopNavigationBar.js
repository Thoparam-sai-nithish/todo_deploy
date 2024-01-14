import React, { useEffect, useState } from 'react'
import './TopNavigationBar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

function TopNavigationBar() {
  const [isUserLogedIn,setIsUserLoggedIn]=useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('todoAppJWToken');
    if(!token) {
      setIsUserLoggedIn(false);
      navigate('/'); 
    }
    else{
      axios
        .post('https://todo-5did.onrender.com/accounts/getUserDetails',{token:token})
        .then((response)=>{
          if (response.data.message === 'ok'){
            navigate('/Home');
            setIsUserLoggedIn(true);
          }
          else {
            setIsUserLoggedIn(false);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          setIsUserLoggedIn(false);
        }); 

    }
  },[localStorage.getItem('todoAppJWToken')])


  function handleLogout(){
    localStorage.clear();
    setIsUserLoggedIn(false)
    navigate('/'); // Move this line inside a useEffect to ensure it runs after the localStorage is cleared.
  };


  return (
    <div className=' bg-info'
        style={{
            display:'flex',
            justifyContent:'end',
            alignItems:'center',
            height:'50px',  
        }}
    >
        
        {!isUserLogedIn&&<NavLink to='/' className='text-decoration-none text-dark mx-2 h-100 d-flex align-items-center fw-bold' >Login</NavLink>}
        {!isUserLogedIn&&<NavLink to='/CreateAccount' className='text-decoration-none text-dark mx-2 h-100 d-flex align-items-center fw-bold' >Signup</NavLink>}
        {isUserLogedIn &&
         <NavLink onClick={handleLogout} className='text-decoration-none text-dark mx-2 h-100 d-flex align-items-center fw-bold'>
            Logout
          </NavLink>}
    </div>
  )
}

export default TopNavigationBar