import './Home.css';
import { useNavigate } from 'react-router-dom';
import {GrFormNext} from 'react-icons/gr'
import {SiGoogletagmanager} from 'react-icons/si'
import {BiPlus} from 'react-icons/bi';
import React from 'react'

function Home() {
  let navigate= useNavigate();

  return (
    <div className='border border-2  border-success bg-dark rounded-4 homeStyles text-white'>
      <h1 className="  text-center  bg-secondary bg-opacity-50 p-2 m-0 rounded fw-bold "> <SiGoogletagmanager className='mx-2 '/>Manage Time and Complete Tasks</h1>
      <div className="row homeRoutes mt-5">
        <div className="col-sm-6  ">
            <div className="row border border-info rounded-4 m-2  "><h3 className='fs-3 text-end'>Create New Task <button onClick={()=>navigate('/')} className=" btn mx-5 p-1 px-3 btn-info"><BiPlus/></button></h3></div>
            <div className="row border border-info rounded-4 m-2  "><h3 className='fs-3  text-end'> High  Tasks <button onClick={()=>navigate('/High')} className=" btn mx-5 p-1 px-3 btn-info"><GrFormNext/></button></h3></div>
            <div className="row border border-info rounded-4 m-2 "><h3 className='fs-3 text-end '> Medium  Tasks <button onClick={()=>navigate('/Medium')} className=" btn mx-5 p-1 px-3 btn-info"><GrFormNext/></button></h3></div>
            <div className="row border border-info rounded-4 m-2  "><h3 className='fs-3 text-end'> Low  Tasks  <button onClick={()=>navigate('/Low')} className=" btn mx-5 p-1 px-3 btn-info"><GrFormNext/></button></h3></div>
        </div>
      </div>
    </div>
  )
}

export default Home