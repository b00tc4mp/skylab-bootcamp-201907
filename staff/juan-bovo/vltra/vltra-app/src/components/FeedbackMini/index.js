import React from 'react'
import './style.sass'

function FeedbackMini({ message }){
    return  <div> 
                <p className="feedbackmini__info">{message}</p>
            </div>
}

export default FeedbackMini