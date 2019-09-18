import React from 'react'
function Feedback({ message, level }) { 
    return <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
}

export default Feedback