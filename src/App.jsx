import { useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import './App.css'
import Form from './components/Form'
import Table from './components/Table'
import DeleteConfirm from './components/ui/DeleteConfirm'
import { useToast } from './components/ui/ToastContainer' // useToast hook only

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const { addToast } = useToast() // still works because provider will be in main.jsx
  const [userTasksList, setUserTasksList] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const userList = (userObj) => {
    if (!userObj.tasks || !userObj.hours) {
      addToast("Please enter task and hours!", "error")
      return
    }

    setUserTasksList(prev => [...prev, { ...userObj, id: Date.now() }])
    addToast("Task added successfully!", "success")
  }

  const handleOnSwitch = (id, type) => {
    setUserTasksList(prev =>
      prev.map(item => item.id === id ? { ...item, type } : item)
    )
    addToast(`Task moved to ${type} list!`, "success")
  }

  const handleOnDeleteClick = (id) => {
    setTaskToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setUserTasksList(prev =>
      prev.filter(item => item.id !== taskToDelete)
    )
    addToast("Task deleted successfully!", "error")
    setShowDeleteModal(false)
    setTaskToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setTaskToDelete(null)
  }

  return (
    <div className={`${darkMode ? 'bg-primary text-white' : 'bg-white text-black'} min-h-screen pt-6 transition-colors duration-500`}>

      {/* Header */}
      <div className='flex justify-between items-center px-6'>
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
      />

      {/* Delete Modal */}
      <DeleteConfirm
        open={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

    </div>
  )
}

export default App
