import React, { useState, useEffect } from 'react'
//import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'

function Changestatus({ history }) {
    return <>
        <Navbar />
        <h2>Change Status</h2>
        <h3>Retrieve poll here</h3>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { newStatus: { value: newStatus } } } = event

            //logic.changeStatus(userId, pollId, newStatus)
            logic.changeStatus(newStatus)

            history.push('/login')
        }}>
            <input type="text" name="pollStatus" placeholder="Select New Satus"/>
            <button>Proceed</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            history.push('/')
        }}>Go back</a>
    </>
}

export default withRouter(Changestatus)