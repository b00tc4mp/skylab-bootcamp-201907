import React from 'react'

function Feedback({ message }){
    return  <div className="feedback-section"> 
                <p className = "feedback__text">{message}</p>
            </div>
}
export default Feedback
