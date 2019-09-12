/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext,useState } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import Feedback from '../Feedback'


function Login() {
    const[error,setError]=useState(undefined)
   
    const { setCredentials, setView,view } = useContext(Context)
    
    function handleSubmit(event) {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        handleLogin(email, password)
    }

    async function handleLogin(email, password) {
        try {
            const { id, token } = await logic.authenticateUser(email, password)
            setCredentials({ id, token })
            setView('toLanding')
            setError(undefined)

            logic.userCredentials=token //llamas al setter i el token lo ponen a sessionstorage
        } catch(error) {
            setError(error.message)
        }
    }

    return <>
        {view==="toLanding" && <Redirect to="/"/>}
        <h2 className="formPanel">Login</h2>
        <hr></hr>
        <div className="formPanel-form">
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" ></input>
                <label>Password:</label>
                <input type="password" name="password" ></input>
                <button className="formPanel-submit">Submit</button>
            </form>
            <a href='/#/' onClick=""><i className="far fa-2x fa-arrow-alt-circle-left addCart-a backArrow"></i></a>

        </div>
        <hr></hr>
        {error!=undefined && <Feedback message={error} />} 
        
    </>
}

export default Login