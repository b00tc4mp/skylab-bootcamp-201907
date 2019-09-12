/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'



function Feedback({ message }){
    return  <div> 
                <p className = "feedback__text">{message}</p>
            </div>
}
export default Feedback