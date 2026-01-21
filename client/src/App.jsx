import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import './App.css'
import Form from './components/Form'
import Table from './components/Table'
import DeleteConfirm from './components/ui/DeleteConfirm'
import { useToast } from './components/ui/ToastContainer' // useToast hook only
import Footer from './components/Footer'
import { deleteTask, fetchAllTasks, postTask, updateTask } from './api/axios'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const { addToast } = useToast()
  const [userTasksList, setUserTasksList] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const badList = userTasksList.filter((item) => item.type === "bad")
  const entryList = userTasksList.filter((item) => item.type === "entry")
  const saveHours = badList.reduce((acc, curr) => acc + +curr.hours, 0)
  const TotalHours = entryList.reduce((acc, curr) => acc + +curr.hours, 0)
  const [toDelete, setToDelete] = useState([])
  useEffect(() => {
    getAllTasks()
  }, [])

  useEffect(() => {
  setToDelete(prev =>
    prev.filter(id =>
      userTasksList.some(task => task._id === id)
    )
  )
}, [userTasksList])


  const userList = async (userObj) => {
    const response = await postTask(userObj)
    console.log("response from app", response)
    if (response?.success) {
      getAllTasks()
      addToast(`${response.message}`, "success")
      console.log("userList", userTasksList)
    }
    else {
      if (response?.error?.fieldErrors) {
        // Object.values(response.error.fieldErrors).forEach(errors => {
        //   addToast(errors[0], "error") 
        // })
        const firstFieldErrors = Object.values(response.error.fieldErrors)[0]
        const firstErrorMessage = firstFieldErrors[0]
        firstErrorMessage && addToast(firstErrorMessage, "error")
      }
      else {
        addToast(response.message, "error")
      }
    }
  }

  const handleOnSwitch = async (id, type) => {
    const response = await updateTask(id, { type })
    response?.success && getAllTasks()
    addToast(`${response.message}`, "success")
    console.log("switch respone", response)
  }

  const handleOnDeleteClick = async (ids) => {
    setTaskToDelete(Array.isArray(ids) ? ids : [ids])
    setShowDeleteModal(true)
  }
  console.log("task to delete", taskToDelete)

  const confirmDelete = async () => {
    const response = await deleteTask(taskToDelete)
    console.log("delete response", response)
    if (response?.success) {
      setToDelete([])
      addToast(response.message, "success")
      getAllTasks()
    }
    else {
      addToast(response.message, "error")
    }
    setShowDeleteModal(false)
    setTaskToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setTaskToDelete(null)
  }

  const getAllTasks = async () => {
    const response = await fetchAllTasks()
    response?.success && setUserTasksList(response.data)
  }

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    let tempArg = [];
    if (value === "allEntry") tempArg = entryList;
    if (value === "allBad") tempArg = badList;

    if (value === "allEntry" || value === "allBad") {
      const ids = tempArg.map(item => item._id);
      setToDelete(prev =>
        checked
          ? [...new Set([...prev, ...ids])]
          : prev.filter(id => !ids.includes(id))
      );
      return;
    }

    setToDelete(prev =>
      checked ? [...prev, value] : prev.filter(id => id !== value)
    );
  };

  console.log("todeltet", toDelete)
  return (
    // Root flex container
    <div className={`${darkMode ? 'bg-primary text-white' : 'bg-white text-black'} min-h-screen flex flex-col transition-colors duration-500`}>

      {/* Content area grows */}
      <div className="flex-1 pt-6 px-6">
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-center font-robotoMono text-3xl'>Not To Do List</h1>
          <button onClick={() => setDarkMode(!darkMode)} className='transition-transform duration-300'>
            {darkMode
              ? <SunIcon className='w-9 h-9 bg-gray-400 rounded-full p-2 text-gray-700 cursor-pointer' />
              : <MoonIcon className='w-9 h-9 text-gray-800 bg-gray-300 p-2 rounded-full cursor-pointer' />}
          </button>
        </div>

        <hr className={`${darkMode ? 'border-gray-600' : 'border-gray-400'} my-4`} />

        {/* Form */}
        <Form darkMode={darkMode} addUserList={userList} />

        {/* Table */}
        <Table
          darkMode={darkMode}
          userTasksList={userTasksList}
          handleOnSwitch={handleOnSwitch}
          handleOnDelete={handleOnDeleteClick}
          toDelete = {toDelete}
          handleOnSelect = {handleOnSelect}
          entryList = {entryList}
          badList = {badList}
          saveHours = {saveHours}
          TotalHours = {TotalHours}
        />

        {/* Delete Modal */}
        <DeleteConfirm
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>

      {/* Footer always at the bottom */}
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
