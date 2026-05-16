import React from 'react'

const TapButton = ({ active, count, onClick, icon, children }: any) => {
    return (
        <div className='w-[180px]'>
            <div className={`flex ${active ? "text-white bg-black" : ""}`} onClick={onClick}>
                {icon}
                <span className='hidden sm:inline'>{children}</span>
                <span>{count}</span>

            </div>

        </div>
    )
}

export default TapButton