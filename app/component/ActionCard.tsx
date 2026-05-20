import React from 'react'

const ActionCard = ({icon,title,button,onClick}) => {
  return (
    <div className='flex items-center w-8/12 border shadow-2xl justify-between px-4 py-4 rounded-2xl'>

        <div>
            <div>{icon}</div>
            <div>{title}</div>

        </div>
        <div>
            <button className='text-bold bg-black text-white rounded-2xl' onClick={onClick}>{button}</button>
        </div>
    </div>
  )
}

export default ActionCard