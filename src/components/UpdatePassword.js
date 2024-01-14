import React,{useState} from 'react'
import { useForm} from 'react-hook-form'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import {GoSignIn} from 'react-icons/go'

function UpdatePassword() {
  const navigate = useNavigate()
  const [isPasswordMatched,setIsPasswordMatched] = useState(true);
  const [updateResponse,setUpdateResponse] = useState({data:''})
  const {register, handleSubmit,formState:{errors}} = useForm();
  const location = useLocation();
  let userEmail = location.state;

  const onSubmit = async(data)=>{
    if(data.userPassword === data.confirmPassword){
      await setIsPasswordMatched(true);
      console.log("isPasswordMatched:",isPasswordMatched)
      if(isPasswordMatched){
        data.userEmail=userEmail;
        delete data.confirmPassword;
        axios.post('https://todo-5did.onrender.com/accounts/updatePassword',data)
        .then( (res)=> {
          console.log('response is: ',res)
          setUpdateResponse(res);
          if(res.data.message ==='success') {userEmail=null;navigate('/')}
        })
        .catch(err=>console.log('error in creating the user : ' ,err))
      }
    }
    else  await setIsPasswordMatched(false);
  }
  return (
    <div className='container-fuid  text-center border'>
        <form className=' bg-white bg-opacity-75 mt-5 rounded-5 w-50 m-auto' onSubmit={handleSubmit(onSubmit)}>
          <h4 className='text-warning fw-bolder fs-2'>Update Password</h4>
          {updateResponse.data.message !=='success' && updateResponse.data.message && <h5 className='text-danger  bg-dark bg-opacity-25 border d-inline rounded-3 px-2 border-2 border-danger '>*{updateResponse.data.message}</h5>}
                
          <div>
            {errors.userPassword&& <p htmlFor='userPassword' className='text-warning'>{errors.userPassword.message}</p>}
            <input type="password" placeholder='Password' defaultValue={''} className='mx-1 my-1 rounded border border-info '  id='userPassword' {...register('userPassword', {required:'*This field shouldn\'t be empty  '})}/>
          </div> 

          <div>
            {errors.confirmPassword&& <p htmlFor='confirmPassword' className='text-warning'>{errors.confirmPassword.message}</p>}
            <input type="password" placeholder='Confirm Password' defaultValue={''} className='mx-1 my-1 rounded border border-info '  id='confirmPassword' {...register('confirmPassword', {required:'*This field shouldn\'t be empty  '})}/>
          </div> 

            {!isPasswordMatched && <p className='text-danger'>*Passwords didn't matched!</p>}

          <button type='submit'  className="my-3 py-1 px-4 text-white btn btn-info"> <GoSignIn size={'25px'} className=''/> Create</button> 
        </form>
    </div>
)}

export default UpdatePassword