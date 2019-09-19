import React, {useState} from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import './index.sass'

function Register({ history }) {

    const [error, setError] = useState(null)

    return <>
    <div>
        <h2 className="formname">Sign Up</h2>
        <p className="formtitle">Create an account.</p>
        <div className="containerform">
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { cityId: { value: cityId }, fullname: { value: fullname }, address: { value: address }, documentId: { value: documentId }, email: { value: email }, imgDocId: { value: imgDocId }, password: { value: password }, participatedPolls: { value: participatedPolls }, proposedPolls: { value: proposedPolls }, userRole: { value: userRole } } } = event

            logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)

            history.push('/login')
        }}>
            <div className="containerinput">
            <input type="text" name="cityId" hidden value ="5d70f3df7d4edc12334851d7"/>
            <input type="text" name="fullname" placeholder="Name"/>
            <input type="text" name="imgDocId" placeholder="Surname"/>
            <input type="text" name="address" placeholder="Address"/>
            <input type="text" name="documentId" placeholder="ID number"/>
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="text" hidden name="participatedPolls"/>
            <input type="text" hidden name="proposedPolls"/>
            <input type="text" hidden name="userRole" value="citizen"/>
            </div>
            <button className="button-poll">Accept</button>
        </form>
        </div>

        
        
        <ul>
        <p className="formtitle">Do you have an account?  <b><a href="#" onClick={event => {
            event.preventDefault()

            history.push('/login')
        }}>Log In</a></b></p>
    </ul>
    </div>
    </>
}

export default withRouter(Register)




//{error && <Feedback message={error} />}