import React from 'react'

function Feedback({ message }) { // level: 'error', 'warn', 'success'
    return <p className="feedback">{message}</p>
}

export default Feedback