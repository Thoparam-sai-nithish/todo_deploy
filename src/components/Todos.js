import './Todos.css'
import React, { useEffect, useState } from 'react';
import {FcTodoList} from 'react-icons/fc'
import {GiProgression} from 'react-icons/gi';
import {MdOutlineDoneOutline} from 'react-icons/md';
import { useForm } from "react-hook-form";
import axios from 'axios'
function Todos() {
  
  let [c ,setC]=useState(0);


  // On Adding New Event Push Data to db.json
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const onSubmit = (data)=>{
    data={...data,taskStatus:"incomplete"}
    console.log(data);
    axios.post('http://localhost:3500/todo/post',data)
    .then(response=>console.log(response))
    .catch(err=>console.log(err))
    setC(c+1);
  };


  //Fetch details
  let [tasks,setTasks] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3500/todo/get')
    .then(res=>{
      setTasks(res.data)
      console.log(tasks)
    })
    .catch(err=>console.log(err));     
  },[c])

  //Task Completed
  let taskCheckbox = (id)=>{
    console.log(id);
    let oldTask;
    //fetch task details
    axios.get('http://localhost:3500/todo/get')
    .then(res=>{
      let tasks=res.data;
      console.log(tasks)
      oldTask = tasks.find(obj=>obj.id===id)
      if(oldTask.taskStatus==='incomplete')
      oldTask = {...oldTask,taskStatus:'completed'}
      else oldTask = {...oldTask,taskStatus:'incomplete'}
      console.log(oldTask)
      
      //update the object
      axios.put(`http://localhost:3500/todo/put/${id}`,oldTask)
      .then(res => {
        console.log(res.data)
        setC(c + 1);
      })
      .catch(err=>console.log(err));

    })
    .catch((err)=>{console.log("err at taskCheckbox",err)})  
  }
  //DELETE Task
  let taskDeleted =(id)=>{
    axios.delete(`http://localhost:3500/todo/delete/${id}`)
    .then((response) => {
      console.log(response);
      console.log("Task deleted Succesfully")
      setC(c+1); // re-render component after successful deletion
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <div className='border border-2 p-2 border-success bg-dark rounded-4 todosStyles'>

        {/* Add New Task FORM*/}
        <form className='addTodoForm py-3 mx-3 mt-3 mb-5 p-2 text-white rounded-3 row border row' onSubmit={handleSubmit(onSubmit)}>
          <h3 className=' ps-5 text-warning mb-4'> <FcTodoList className='mx-2 '/>New Task</h3>
          {/* Enter the task */}
          
          <div className='todoPriority col-6 m-auto rounded-3 p-0' >
          <input className='w-100 rounded-3 ' placeholder='➕add new task' {...register("taskName", { required: true })} />

          </div>
            
            {/* Select Priority */}
          <select className='todoPriority m-0 p-0 rounded-3 col-3' defaultValue={'Medium'} {...register("taskPriority")}>
            <option value="High">High</option>
            <option  value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          
          {/* Submit Button */}
          <input className='addTodo col-2 m-auto p-0 rounded-3 border-1'  type="submit" />


          {errors.taskName && <div className='text-center text-danger m-0 p-0 border mx-auto my-2'>*Enter the task </div>}
        </form>

        
        {/* Incomplete Tasks  */}
        <div className="incomplete m-3 p-3 text-white rounded-4 border rounded-4   ">
        <h2 className=' ps-5 text-primary' ><GiProgression className='mx-2 text-warning'/>Incomplete Tasks</h2>
            
            <table className='table  text-white p-0'>
              
              {
                tasks?.map((obj)=>
                    obj.taskStatus==="incomplete"&&
                    (<tr className='row m-0 bg-secondary rounded my-1 p-1 ' key={obj.id}>
                      <td className='col-sm-1  text-end'>

                        <input type="checkbox"  onClick={()=>taskCheckbox(obj.id)} id="taskCheckbox" />
                      </td>
                      <td className='tasks col-sm-7 '>{obj.taskName}</td>
                      <td className='col-sm-2 '>{obj.taskPriority}</td>
                      <td className='col-sm-2 text-end '>
                          <button  onClick={()=>taskDeleted(obj.id)} className="btn text-white bg-danger p-1 m-0"  >delete</button>
                      </td>
                    </tr>))       
              }
            </table>
        </div>
     
<br /><br />

        {/* Completed Tasks */}
        <div className="completed m-3 p-3 rounded-4  border">
        <h2 className='ps-5  '><MdOutlineDoneOutline className='mx-2 '/>Completed Tasks</h2>
           <table className='table text-white  p-0'>
             
              {
                tasks?.map((obj)=>
                    obj.taskStatus==="completed"&&
                    (<tr className='row m-0  bg-secondary rounded my-1 p-1 ' key={obj.id}>
                      <td className="col-sm-1 text-end  ">
                      <input type="checkbox"  onClick={()=>{taskCheckbox(obj.id)}} defaultChecked id="taskCheckbox" />
                      </td>
                      <td className='col-sm-7 '>{obj.taskName}</td>
                      <td className='col-sm-2 '>{obj.taskPriority}</td>
                      <td className='col-sm-2  text-end'>
                          <button  onClick={()=>taskDeleted(obj.id)} className="btn text-white bg-danger p-1 m-0"  >delete</button>
                      </td>
                    </tr>))       
              }
            </table>
        </div>
          

    </div>
  )
}

export default Todos;
