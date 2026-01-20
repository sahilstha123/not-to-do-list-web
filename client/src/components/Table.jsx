import React from 'react'
import { TrashIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const Table = ({ darkMode, userTasksList, handleOnSwitch, handleOnDelete }) => {
    const badList = userTasksList.filter((item) => item.type === "bad")
    const entryList = userTasksList.filter((item) => item.type === "entry")
    const saveHours = badList.reduce((acc, curr) => acc + +curr.hours, 0)
    const TotalHours = entryList.reduce((acc, curr) => acc + +curr.hours, 0)
    const [toDelete, setToDelete] = useState([])


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

    console.log(toDelete)


    return (
        <div className='flex flex-wrap justify-center gap-10 mt-8 w-full px-6'>
            {/* Entry List Table */}
            <div className={`w-full max-w-md ${darkMode ? 'text-black' : 'text-white'} font-robotoMono`}>
                <h2 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Entry List</h2>
                <hr className='border-gray-400 my-3' />
                {entryList.length > 0 && (<>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            id="all-Entry"
                            type="checkbox"
                            value="allEntry"
                            className="w-4 h-4 border border-white"
                            checked={entryList.length > 0 && entryList.every(item => toDelete.includes(item._id))}
                            // onClick={() => handleOnSelectAllClick(entryList)}
                            onChange={handleOnSelect}

                        />
                        <label
                            htmlFor="all-Entry"
                            className="select-none text-white text-sm font-medium"
                        >
                            Select All
                        </label>
                    </div>
                    <table className={`w-full text-left rounded-lg overflow-hidden shadow-md  ${darkMode ? 'bg-white' : 'bg-secondary'}`}>
                        <thead>
                            <tr className='border-b border-gray-300'>
                                <th className='px-4 py-2'>
                                </th>
                                <th className='px-4 py-2'>Task</th>
                                <th className='px-4 py-2'>Hours</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entryList.map(item => (
                                <tr key={item._id} className='border-b border-gray-300 hover:bg-gray-200/30 transition'>
                                    <td className='px-4 py-2'>
                                        <input type="checkbox"
                                            value={item?._id}
                                            className="w-4 h-4 border"
                                            onChange={handleOnSelect}
                                            checked={toDelete.includes(item._id)}
                                        // onChange={() => handleOnSelectClick(item._id)}
                                        // checked={selectIds.includes(item._id)}
                                        /></td>
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
                    </table>
                </>)}

                {
                    TotalHours ? <div className={`${darkMode ? 'bg-white' : 'bg-secondary'} mt-4 px-4  py-4 md:px-10 md:py-5 rounded-lg`}>
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

                {badList.length > 0 &&
                    <>
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                id="all-bad"
                                value="allBad"
                                type="checkbox"
                                checked={badList.every(item => toDelete.includes(item._id))}
                                className="w-4 h-4 border border-white"
                                onChange={handleOnSelect}
                            // onClick={() => handleOnSelectAllClick(badList)}
                            // checked={badList.every(item => selectIds.includes(item._id))}

                            />
                            <label
                                htmlFor="all-bad"
                                className="select-none text-white text-sm font-medium"
                            >
                                Select All
                            </label>
                        </div>
                        <table className={`w-full text-left rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-white' : 'bg-secondary'}`}>
                            <thead>
                                <tr className='border-b border-gray-300'>
                                    <th></th>
                                    <th className='px-4 py-2'>Task</th>
                                    <th className='px-4 py-2'>Hours</th>
                                    <th className='px-4 py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {badList.map(item => (
                                    <tr key={item._id} className='border-b border-gray-300 hover:bg-gray-200/30 transition'>
                                        <td className='px-4 py-2'>
                                            <input type="checkbox"
                                                value={item?._id}
                                                checked={toDelete.includes(item._id)}
                                                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                                                onChange={handleOnSelect}
                                            // onChange={() => handleOnSelectClick(item._id)}
                                            // checked={selectIds.includes(item._id)}
                                            ></input>
                                        </td>
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
                        </table>
                    </>
                }

                {
                    saveHours ? <div className={`${darkMode ? 'bg-white' : 'bg-secondary'} my-4 px-4  py-4 md:px-10 md:py-5 rounded-lg`}>
                        <p>
                            {saveHours ? `You Could Have Saved = ${saveHours} hrs` : null}
                        </p>

                    </div> : null
                }

            </div>
            {toDelete.length > 0
                && (<div className='w-full flex  justify-center mb-4'>
                    <button className='bg-red-500 px-2 py-3 icon-button hover:bg-red-600'
                        onClick={() => handleOnDelete(toDelete)}>
                        Delete {toDelete.length} tasks
                    </button>
                </div>)}
        </div>
    )
}

export default Table
