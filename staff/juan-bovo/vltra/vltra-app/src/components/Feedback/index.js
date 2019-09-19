import React from 'react'
import './style.sass'

function Feedback({ message }){
    return  <div> 
                <p className="feedback__info">{message}</p>
            </div>
}

export default Feedback