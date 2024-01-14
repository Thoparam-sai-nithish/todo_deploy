import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {useForm,} from 'react-hook-form'
import {NavLink , useNavigate} from 'react-router-dom'
import {BiRename} from 'react-icons/bi'
import {RiLoginBoxFill} from 'react-icons/ri'
function Login() {
//   const {isUserLogedin,userData,userLoginResponse,loginUser} = useContext(userContextObj)
//   console.log(isUserLogedin,userData,userLoginResponse,loginUser)
  let [userLoginResponse, setUserLoginResponse] = useState("")

  const navigate = useNavigate();
  let onSubmit = (data)=>{
    console.log("User Submitted data is :" , data) 
    axios.post(' https://todo-5did.onrender.com/accounts/login', data)
    .then( (res)=>{
        console.log('Login Response :',res.data);
        if(res.data.message === 'success') {
          localStorage.setItem('todoAppJWToken',res.data.jwToken)
          localStorage.setItem('userEmail',data.userEmail)
          navigate('/Home');
        }else{
          localStorage.clear();
          setUserLoginResponse(res.data.message)
        }
    })
    .catch((err)=>{
        console.log(err.message)
    })
  } 

  let {register,handleSubmit,formState:{errors}}=useForm();

  return (
    <div className='container-fuid  text-center border'>
      <form className='m-auto p-2 m-2 w-75 roundedborder border-5 bg-white bg-opacity-75 rounded-5 mt-5 ' onSubmit={handleSubmit(onSubmit)}>
        <h4 className='text-warning fw-bolder fs-2 '>Login</h4>
        {userLoginResponse.length !== 0 && <h5 className='text-danger  bg-dark bg-opacity-25 border d-inline rounded-3 px-2 border-2 border-danger '>*{userLoginResponse}</h5>}
        <div>
          {errors.userEmail&& <label htmlFor='userEmail' className='text-warning me-2'>{errors.userEmail.message}</label>}
          <input type="email" placeholder='enter E-mail' className='my-1 rounded border border-info '  id='userEmail' {...register('userEmail', {required:'*This field shouldn\'t be empty  '})}/>
        </div>  
        
        <div  >
          {errors.userPassword&& <label htmlFor='uesrPassword' className='text-warning me-2'>{errors.userPassword.message}</label>}
          <input type="password" placeholder='enter password' className='my-1 rounded border border-info' id='userPassword' {...register('userPassword', {required:'*This field shouldn\'t be empty '})}/>
        </div>  

        <button type='submit' className="my-1 py-1 px-4 text-white btn btn-info"> <RiLoginBoxFill size={'25px'} /> Login</button>


        <div className='mt-5'>
          <NavLink to='/ForgetPassword' className='text-decoration-none text-info ' ><BiRename size={'20px'} className='text-warning me-1'/> Forget Password</NavLink>
          <br />
          dont have the account   
          <NavLink to='/CreateAccount' className='text-decoration-none text-primary fw-bold bg-white bg-opacity-75 rounded-5 px-1  ms-1'>create Here</NavLink>
        </div>
      </form>
    </div>
    
  ) 
}

export default Login