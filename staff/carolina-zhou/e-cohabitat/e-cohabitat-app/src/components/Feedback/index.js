import React from 'react'

function Feedback({ message }){
    return  <div className="feedback-panel"> 
                <p className = "feedback__text">{message}</p>
            </div>
}

export default Feedback