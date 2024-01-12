import './High.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
function Medium() {
  let [c ,setC]=useState(0);
  
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
    
    <div className='border border-2 p- border-success rounded-4 todosStyles bg-dark    '>
        
        <h1 className='text-white bg-secondary bg-opacity-50 rounded-4 p-2 text-center mb-5'> Medium Priority Tasks</h1>
        <div className="m-0 p-0 row  ">

          {/* Incomplete Tasks  */}
          <div className="incomplete m-3 p-3 col-sm-5 row  bg-opacity-50 rounded-4 mx-auto  ">
              
              <table className='table col-sm-11 rounded-4 text-white  '>
              <h2 className='text-center bg-primary  bg-opacity-75 border p-1 rounded-4 m-1 mb-4 ' >Incomplete Tasks</h2>
                {
                  tasks?.map((obj)=>
                      obj.taskStatus==="incomplete"&&obj.taskPriority==='Medium'&&
                      (<tr className='row m-1 my-2 p-1 border border-1 rounded-4  bg-opacity-50 ' key={obj.id}>
                        <td className='col-sm-1 text-end'>

                          <input type="checkbox"  onClick={()=>taskCheckbox(obj.id)} id="taskCheckbox" />
                        </td>
                        <td className='tasks col-sm-6   '>{obj.taskName}</td>
                        <td className='col-sm-2'>{obj.taskPriority}</td>
                        <td className='col-sm-3 text-end'>
                            <button  onClick={()=>taskDeleted(obj.id)} className="btn text-white bg-danger p-1 m-0"  >delete</button>
                        </td>
                      </tr>))       
                }
              </table>
          </div>
      
          {/* Completed Tasks */}
          <div className="incomplete m-3 p-3 col-sm-5 row  bg-opacity-50 rounded-4 mx-auto  ">

            <table className='table col-sm-11 rounded-4 text-white  '>
                <h2 className='text-center bg-primary  bg-opacity-75 border p-1 rounded-4 m-1 mb-4 ' >Completed Tasks</h2>
                {
                  tasks?.map((obj)=>
                      obj.taskStatus==="completed"&&obj.taskPriority==='Medium'&&
                      (<tr className='row m-1 my-2 p-1 border border-1 rounded-4  bg-opacity-50 '  key={obj.id}>
                        <td className="col-sm-1 text-end  ">
                        <input type="checkbox"  onClick={()=>{taskCheckbox(obj.id)}} defaultChecked id="taskCheckbox" />
                        </td>
                        <td className='col-sm-6 tasks '>{obj.taskName}</td>
                        <td className='col-sm-2 '>{obj.taskPriority}</td>
                        <td className='col-sm-3  text-end '>
                            <button  onClick={()=>taskDeleted(obj.id)} className="btn text-white bg-danger p-1 m-0"  >delete</button>
                        </td>
                      </tr>))       
                }
              </table>
          </div>
        </div>

    </div>
  )
}

export default Medium
