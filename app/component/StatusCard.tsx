import React from 'react'

const StatusCard = ({icon,title,desc}) => {
  return (
    <div>
        <div>{icon}</div>
        <div>{title}</div>
        <div>{desc}</div>
    </div>
  )
}

export default StatusCard