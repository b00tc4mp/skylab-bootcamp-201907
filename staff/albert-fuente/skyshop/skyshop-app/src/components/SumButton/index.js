/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import Feedback from '../Feedback'


function Sum() {
    const[counter,setCounter]=useState(0)
    
    const { setView,view } = useContext(Context)

       
    return (
     <>
        <button onClick={event => {
                event.preventDefault()  
                setCounter(counter+1)
                
            }}>Increment</button>
         <p>{counter}</p>
         <button onClick={event => {
                event.preventDefault()  
                setCounter(counter-1)
                if(counter==0) setCounter(0)
                
            }}>Decrement</button>
        
    </>
    )
}

export default Sum