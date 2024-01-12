import './NavigationBar.css'
import React from 'react'
// import {FiSearch} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {RiTodoFill} from 'react-icons/ri'
import {TbUrgent} from 'react-icons/tb'
import {FcMediumPriority} from 'react-icons/fc'
import {FcLowPriority} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function NavigationBar() {

  const [searchQuery, setSearchQuery] = useState('search todo');
  const handleSearch = (e) => {
    e.preventDefault();
    // perform search using searchQuery
    setSearchQuery('search todo');
  }

  return (
    <div className='navStyles bg-dark me-0 p-0 '>
      <ul className='bg-secondary bg-opacity-50 p-2 list-unstyled '>
      <li className='my-4  ms-4   searchDiv'>
      <form className='border me-5 p-2  rounded ' onSubmit={handleSearch}>
      <input
        className='rounded'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className='btn bg-white p-1 mx-1' type="submit "><BsSearch className='reactIcon text-info mx-2'/></button>
    </form>
      </li>  

        <li className='navItemStyles my-3 ms-2  nav-item me-0 '>
          <Link className='text-white nav-link ' to='/Home'><AiFillHome className='text-white reactIcon mx-2'/>Home</Link>  
        </li>  
        <li className='navItemStyles my-3 nav-item ms-2'>
          <Link className='text-white nav-link me-5'to='/'><RiTodoFill className='text-white reactIcon mx-2'/>Todos</Link>  
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