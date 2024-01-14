import React ,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {BiMessageRoundedDetail} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function ForgetPassword() {
  const [ForgetPasswordResponse, setForgetPasswordResponse] = useState({data:''});
  const navigate = useNavigate();
  let onSubmit = (data)=>{
    // console.log("User Submitted data is :" , data)
    //send request 
    axios.post('https://todo-5did.onrender.com/accounts/forgetPassword',data)
    .then(async(res)=>{
      await setForgetPasswordResponse(res);
      if(res.data.message==='success'){
        navigate('/VerifyForgetPasswordOtp',{state:data})
      }
    })
    
  } 
  let {register,handleSubmit,formState:{errors}}=useForm();

  return (
    <div className='container-fuid  text-center border '>
    <form className='m-auto p-2 m-2 w-50 roundedborder border-5 bg-white bg-opacity-75 rounded-5 mt-5' onSubmit={handleSubmit(onSubmit)}>
      <h4 className='text-warning fw-bolder fs-2 '>Forget Password</h4>
      {ForgetPasswordResponse.data.message !=='success' && ForgetPasswordResponse.data.message && <h5 className='text-danger  bg-dark bg-opacity-25 border d-inline rounded-3 px-2 border-2 border-danger '>*{ForgetPasswordResponse.data.message}</h5>}
      <div className='mt-4'>
        {errors.userEmail&& <label htmlFor='userEmail' className='text-warning'>{errors.userEmail.message}</label>}
        <input type="email" placeholder='enter E-mail' className='text-primary my-1 rounded border border-info '  id='userEmail' {...register('userEmail', {required:'*email  shouldn\'t be empty  '})}/>
      </div>  
      <button type='submit' className="my-1 py-0 pe-4 ps-2 text-white fw-bold  btn btn-info"> <BiMessageRoundedDetail size={'25px'} className='text-white'/> send otp</button>
    </form>
  </div>
  )
}

export default ForgetPassword