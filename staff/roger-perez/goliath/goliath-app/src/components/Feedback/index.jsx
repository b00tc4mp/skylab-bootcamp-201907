import React from '../../../node_modules/react'
function Feedback({ message, level }) { 
    return <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
}

export default Feedback