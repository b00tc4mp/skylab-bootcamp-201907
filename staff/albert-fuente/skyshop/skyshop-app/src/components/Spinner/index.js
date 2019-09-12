/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"


function Spinner() {
    
    const { setView,view, spinner,setSpinner } = useContext(Context)

    setSpinner(true)

    return <>
    <div className="container">
    <h1 className="spinner">TEEEEEEEEEEEST SPINNNEEER</h1>
    </div>
    </>
}

export default Spinner

