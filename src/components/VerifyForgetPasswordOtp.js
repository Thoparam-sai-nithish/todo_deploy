import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {useLocation ,useNavigate} from 'react-router-dom'
import {BiMessageRoundedDetail} from 'react-icons/bi'
import axios from 'axios';

function VerifyForgetPasswordOtp() {
    const location = useLocation();
    const userEmail = location.state.userEmail; 
    const [serverResponse, setServerResponse] = useState({data:''})
    const navigate = useNavigate();

    const onSubmit = async(data)=>{
        data.userEmail=userEmail;
        // console.log(data)
        axios.post('https://todo-5did.onrender.com/accounts/verifyPasswordOtp',data)
        .then(async(resonse)=>{
            await setServerResponse(resonse);
            if(resonse.data.message==='success'){
                navigate('/UpdatePassword',{state:userEmail})
            }
        })
        .catch(err=>{
            console.log('error in verifying the Otp : ' ,err)
        })
    }
    let {register,handleSubmit,formState:{errors}}=useForm();
  return (
    <div  className='container-fuid  text-center border '>
        <form className='m-auto p-2 m-2 w-50 roundedborder border-5 bg-white bg-opacity-75 mt-5 rounded-5' onSubmit={handleSubmit(onSubmit)}>
        {serverResponse.data.message !=='success' && serverResponse.data.message && <h5 className='text-danger  bg-dark bg-opacity-25 border d-inline rounded-3 px-2 border-2 border-danger '>*{serverResponse.data.message}</h5>}
            <div className='mt-4'>
                {errors.userOtp&& <label htmlFor='userOtp' className='text-warning'>{errors.userOtp.message}</label>}
                <input type="number" placeholder='enter OTP...' className='text-primary my-1 rounded border border-info '  id='userOtp' {...register('userOtp', {required:'*email  shouldn\'t be empty  '})}/>
            </div>  
            <button type='submit' className="my-1 py-0 pe-4 ps-2 text-white fw-bold  btn btn-info"> <BiMessageRoundedDetail size={'25px'} className='text-white'/> send otp</button>
        </form>
    </div>
  )
}

export default VerifyForgetPasswordOtp