import React from 'react'

const DefaultButton = ({name, onClick, type=""}) => {
  return (
    <div className='w-fit select-none flex items-center justify-center h-fit px-5 py-2 rounded-lg bg-green-300 shadow-md hover:scale-105 m-2 hover:bg-green-400'>
        <button onClick={onClick} type={type} className='flex items-center justify-center font-bold text-green-900  text-sm'>{name}</button>
    </div>
  )
}

export default DefaultButton