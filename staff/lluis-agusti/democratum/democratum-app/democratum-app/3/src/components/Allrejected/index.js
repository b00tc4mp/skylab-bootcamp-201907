import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import Navbarmanager from '../Navbarmanager' 
export default withRouter(function ({ history, onLogout }) {
    const [ polls, setPolls ] = useState(null)
    
     useEffect(() => {
        (async () => {
            
            const res = await logic.listRejected('5d70f41b7d4edc12334851db')
            
            setPolls(res.polls)
        })()
    }, [])

    return <>
    <Navbar />
    <Navbarmanager/>
    <div className="poll-list-div">
    <h2 className="pollcategoryname"><b>Rejected</b></h2>
    {polls && <ul>
        {polls.map(poll => <ul className="poll-list-ul" key={poll.id} onClick={event =>  {
            event.preventDefault()
            
            history.push(`/singlepoll/${poll._id}`)

        }}>
            <li className="pollimg"><img src={poll.imagePoll} /></li>
            <p className="pollquestion"><b>{poll.question}</b></p>
            <p className="pollresults-title">Current Results</p>
            <p className="pollresults1" >Yes: {poll.positives}</p>
            <p className="pollresults2" >No: {poll.negatives}</p>
        </ul>)}
    </ul>}
    </div>
    </>
})