/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'


function RegisterSuccess() {
    
    const { setView } = useContext(Context)
   
    return <>
        <p className="formPanel">You have been succesfully registered, continue to:</p>
        
        <div className="formPanel-form">
            <a href='/#/login' onClick="">Login</a>
        </div>
        
    </>
}

export default RegisterSuccess