import React, { useState } from 'react'

const Form = ({addUserList}) => {
  const [userTasks, setUserTasks] = useState({
    task: "",
    hours: ""

  })
  const handleOnchange = (e)=>{
    const {name,value} =  e.target
    setUserTasks((prevTask)=>({...prevTask,[name]:value}))
  }
  const handleOnsubmit = (e) => {
  e.preventDefault()
  addUserList(userTasks)
  console.log("Submitted task:", userTasks) // <-- log current values
  setUserTasks({
    task: "",
    hours: ""
  })
}

  return (
    <div className='flex justify-center mt-6 px-4'>
      <form className={`w-full max-w-3xl p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-3 bg-white text-gray-600`} onSubmit={handleOnsubmit}>
        <input
          type="text"
          name='task'
          value={userTasks.task}
          placeholder='Enter your tasks'
          className='flex-1 input-field'
          onChange={handleOnchange}
          
        />
        <input
          type="number"
          name='hours'
          value={userTasks.hours}  
          placeholder='hours'
          className='w-full sm:w-24 input-field'
          onChange={handleOnchange}
          min={1}
          max={24}
          
        />
        <button
          type="submit"
          className='px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-blue-900 hover:scale-105 transition-transform duration-300'
        >
          Add New Tasks
        </button>
      </form>
    </div>
  )
}

export default Form
