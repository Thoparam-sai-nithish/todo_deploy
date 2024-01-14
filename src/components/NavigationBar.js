import './NavigationBar.css'
import React, { useEffect } from 'react'
// import {FiSearch} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {RiTodoFill} from 'react-icons/ri'
import {TbUrgent} from 'react-icons/tb'
import {FcMediumPriority} from 'react-icons/fc'
import {FcLowPriority} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
function NavigationBar() {

  const [searchQuery, setSearchQuery] = useState('search todo');
  const handleSearch = (e) => {
    e.preventDefault();
    // perform search using searchQuery
    setSearchQuery('search todo');
  }

  const [loggedInUser,setLoggedInUser]=useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('todoAppJWToken');
    if(!token) {
      setLoggedInUser(null);
      navigate('/'); 
    }
    else{
      axios
        .post('https://todo-5did.onrender.com/accounts/getUserDetails',{token:token})
        .then((response)=>{
          if (response.data.message === 'ok'){
            // navigate('/Home');
            setLoggedInUser(response.data.details);
            localStorage.setItem('userEmail',response.data.details.userEmail);
            console.log(response.data.details)
          }
          else {
            setLoggedInUser(null);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedInUser(false);
        }); 

    }
  },[localStorage.getItem('todoAppJWToken')])



  return (
  <div className='navStyles bg-dark  bg-opacity-50 h-100 m-0 p-0 '>
    <ul className='bg-secondary p-2 list-unstyled '>
      <li className='my-4  ms-4  h-auto  searchDiv'>
        {loggedInUser&&<h2 className='text-warning'>welcome <span className='text-white'>{loggedInUser.userName}</span></h2>}
        {/* <form className='border me-5 p-2  rounded ' onSubmit={handleSearch}>
        <input
          className='rounded'
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <but/ton className='btn bg-white p-1 mx-1' type="submit "><BsSearch className='reactIcon text-info mx-2'/></but> 
        </form>  */}
      </li>  

      <li className='navItemStyles my-3 ms-2  nav-item me-0 '>
        <Link className='text-white nav-link ' to='/Home'><AiFillHome className='text-white reactIcon mx-2'/>Home</Link>  
      </li>  
      <li className='navItemStyles my-3 nav-item ms-2'>
        <Link className='text-white nav-link me-5'to='/Todos'><RiTodoFill className='text-white reactIcon mx-2'/>Todos</Link>  
      </li>  
        {/* <li className='navItemStyles my-3 nav-item ms-2'>
          <Link className='text-white nav-link me-5'to='/AllTasks'>AllTasks</Link>  
        </li>   */}

        <hr className=' text-white' />

      <li className='navItemStyles my-3 nav-item ms-2'>
        <Link className='text-white nav-link me-5'to='/High'><TbUrgent className='text-danger reactIcon mx-2'/>High</Link>  
      </li>  
      <li className='navItemStyles my-3 nav-item ms-2'>
        <Link className='text-white nav-link me-5'to='/Medium'><FcMediumPriority className='reactIcon mx-2'/>Medium</Link>  
      </li>  
      <li className='navItemStyles my-3 nav-item ms-2'>
        <Link className='text-white nav-link me-5'to='/Low'><FcLowPriority className='reactIcon mx-2'/>Low</Link>  
      </li>  

      <hr className='text-white' />

      {/* <li  className='navItemStyles my-3 nav-item ms-2'>
        <Link className='text-white nav-link me-5'to='/Personal'>Personal</Link>  
      </li>   */}
    </ul>  
  </div>
  )
}

export default NavigationBar