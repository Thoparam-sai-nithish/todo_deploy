import React,{useState} from 'react'
import { useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {GoSignIn} from 'react-icons/go'
function CreateAccount() {
  const navigate = useNavigate()
  const [isPasswordMatched,setIsPasswordMatched] = useState(true);
  const [createResponse,setCreateResponse] = useState({data:''})
  const {register, handleSubmit,formState:{errors}} = useForm();

  const onSubmit = async(data)=>{
    if(data.userPassword === data.confirmPassword){
      await setIsPasswordMatched(true);
      console.log("isPasswordMatched:",isPasswordMatched)
      if(isPasswordMatched){
        delete data.confirmPassword;
        axios.post('https://todo-5did.onrender.com/accounts/createAccount',data)
        .then( (res)=> {
          console.log('response is: ',res)
          setCreateResponse(res);
          if(res.data.message ==='success') {console.log('Entered to success');navigate('/')}
        })
        .catch(err=>console.log('error in creating the user : ' ,err))
      }
    }
    else  await setIsPasswordMatched(false);
  }
  return (
    <div className='container-fuid  text-center border '>
        <form className=' bg-white bg-opacity-75 mt-5 rounded-5 w-50 m-auto' onSubmit={handleSubmit(onSubmit)}>
          <h4 className='text-warning fw-bolder fs-2 '>Create Account</h4>
          {createResponse.data.message ==='User Already Exists' && <h5 className='text-danger  bg-dark bg-opacity-25 border d-inline rounded-3 px-2 border-2 border-danger '>*{createResponse.data.message}</h5>}
        <div>
          {errors.userName  && <label htmlFor='userName' className='text-warning'>{errors.userName.message}</label>}
          <input type="text" placeholder='User Name' className='my-1 rounded border border-info '  id='userName' {...register('userName', {required:'*This field shouldn\'t be empty  '})}/>
        </div>  
         
        <div>
          {errors.userEmail&& <label htmlFor='userEmail' className='text-warning'>{errors.userEmail.message}</label>}
          <input type="email" placeholder='E-mail' className='my-1 rounded border border-info '  id='userEmail' {...register('userEmail', {required:'*This field shouldn\'t be empty  '})}/>
        </div>  
        
        <div>
          {errors.userMobile&& <label htmlFor='userMobile' className='text-warning'>{errors.userMobile.message}</label>}
          <input type="tel" minLength="10" maxLength="12" placeholder='Mobile : xxxxxxxxxx' className='my-1 rounded border border-info '  id='userMobile' {...register('userMobile', {required:'*This field shouldn\'t be empty  '})}/>
        </div> 
        
        <div>
          {errors.userDob&& <p htmlFor='userDob' className='text-warning'>{errors.userDob.message}</p>}
          <input type="date"  className='mx-1 my-1 rounded border border-info '  id='userDob' {...register('userDob', {required:'*This field shouldn\'t be empty  '})}/>
        </div> 

        
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
  )
}

export default CreateAccount