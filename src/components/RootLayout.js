import React, { useEffect, useState } from 'react'
import './RootLayout.css'
import NavigationBar from './NavigationBar'
import TopNavigationBar from './TopNavigationBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'


function RootLayout() {
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




  return (
    <div className='rootStyles'>
      
      <TopNavigationBar/>

      {isUserLogedIn?
        <div className='row ms-0 p-0 w-100 h-100'>
          <div className='col-md-3 p-0 m-0 h-100'>
            <NavigationBar/>
          </div>
          <div className='col-md-9 p-0 m-0 h-100'>
            <Outlet/>
          </div>  
        </div> :
        <div><Outlet/></div>
      }
    </div>
  )
}

export default RootLayout