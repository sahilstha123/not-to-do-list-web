import React from 'react'
import { TrashIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'



const Table = ({ darkMode, userTasksList, handleOnSwitch, handleOnDelete }) => {
    const badList = userTasksList.filter((item) => item.type === "bad")
    const entryList = userTasksList.filter((item) => item.type === "entry")
    const saveHours = badList.reduce((acc, curr) => acc + +curr.hours, 0)
    const TotalHours = entryList.reduce((acc, curr) => acc + +curr.hours, 0)
    return (
        <div className='flex flex-wrap justify-center gap-10 mt-8 w-full px-6'>
            {/* Entry List Table */}
            <div className={`w-full max-w-md ${darkMode ? 'text-black' : 'text-white'} font-robotoMono`}>
                <h2 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Entry List</h2>
                <hr className='border-gray-400 my-3' />
                {entryList.length>0 && (<table className={`w-full text-left rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-white' : 'bg-secondary'}`}>
                    <thead>
                        <tr className='border-b border-gray-300'>
                            <th className='px-4 py-2'>Task</th>
                            <th className='px-4 py-2'>Hours</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entryList.map(item => (
                            <tr key={item._id} className='border-b border-gray-300 hover:bg-gray-200/30 transition'>
                                <td className='px-4 py-2'>{item.task}</td>
                                <td className='px-4 py-2'>{item.hours}</td>
                                <td className='px-4 py-2 flex gap-2'>
                                    <button className='icon-button bg-red-500 '>
                                        <TrashIcon className='w-5 h-5' onClick={() => handleOnDelete(item._id)} />
                                    </button>
                                    <button className='icon-button bg-blue-500'>
                                        <ArrowRightIcon className='w-5 h-5' onClick={() => handleOnSwitch(item._id, "bad")} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
                
                {
                    TotalHours ? <div className={`${darkMode? 'bg-white': 'bg-secondary'} mt-4 px-4  py-4 md:px-10 md:py-5 rounded-lg`}>
                        <p>
                            {TotalHours ? `The total hours allocated = ${TotalHours} hrs` : null}
                        </p>

                    </div> : null
                }

            </div>

            {/* Bad List Table */}
            <div className={`w-full max-w-md ${darkMode ? 'text-black' : 'text-white'} font-robotoMono`}>
                <h2 className={`${darkMode ? 'text-white' : 'text-black'} font-bold text-lg mb-2`}>Bad List</h2>
                <hr className='border-gray-400 my-3' />
                {badList.length>0 && <table className={`w-full text-left rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-white' : 'bg-secondary'}`}>
                    <thead>
                        <tr className='border-b border-gray-300'>
                            <th className='px-4 py-2'>Task</th>
                            <th className='px-4 py-2'>Hours</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {badList.map(item => (
                            <tr key={item._id} className='border-b border-gray-300 hover:bg-gray-200/30 transition'>
                                <td className='px-4 py-2'>{item.task}</td>
                                <td className='px-4 py-2'>{item.hours}</td>
                                <td className='px-4 py-2 flex gap-2'>
                                    <button className='icon-button bg-red-500 '>
                                        <TrashIcon className='w-5 h-5' onClick={() => handleOnDelete(item._id)} />
                                    </button>
                                    <button className='icon-button bg-green-500 '>
                                        <ArrowLeftIcon className='w-5 h-5' onClick={() => handleOnSwitch(item._id, "entry")} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
                
                {
                    saveHours ? <div className={`${darkMode? 'bg-white': 'bg-secondary'} mt-4 px-4  py-4 md:px-10 md:py-5 rounded-lg`}>
                        <p>
                            {saveHours ? `You Could Have Saved = ${saveHours} hrs` : null}
                        </p>

                    </div> : null
                }

            </div>


        </div>
    )
}

export default Table
