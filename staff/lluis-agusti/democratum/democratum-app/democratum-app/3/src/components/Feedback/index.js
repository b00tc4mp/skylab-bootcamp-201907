import React from 'react'
import './index.sass'


function Feedback({ message, level }) {
    return <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
}

export default Feedback