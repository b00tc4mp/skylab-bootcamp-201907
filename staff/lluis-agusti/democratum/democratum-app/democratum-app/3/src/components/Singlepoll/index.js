import React, { useContext, useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import Context from '../Context'

export default withRouter(function ({ history, match: { params: { pollId } } }) {

    const [user, setUser] = useState()
    const [ poll, setPoll ] = useState(null)

    const { voteRes, setVoteRes } = useContext(Context)

    useEffect(() => {
        async function _retrieveData(){    
            const res = await logic.singlePoll(pollId)
            const user = await logic.retrieveUser()

            setUser(user)
            setPoll(res.poll)

        }
        _retrieveData()
    }, [])


    const handleVotePositive = async (event) => {
        event.preventDefault()
        
        try {
            const resVote = await logic.votePoll(pollId, "positive")
            setVoteRes(resVote)
            history.push('/okvote')
        } catch (error) {
            history.push('/alreadyvoted')
        }
    }

    const handleVoteNegative = async (event) => {
        event.preventDefault()
        try {
            const resVote = await logic.votePoll(pollId, "negative")
            setVoteRes(resVote)
            history.push('/okvote')
        } catch (error) {
            history.push('/alreadyvoted')
        }
    }
    const handleAprovePoll = async (event) => {
        event.preventDefault()
        
        try {
            const resVote = await logic.changeStatus(pollId, "approved")
            setVoteRes(resVote)
            history.push('/okstatus')
        } catch (error) {
            history.push('/failstatus')
        }
    }

    const handleRejectPoll = async (event) => {
        event.preventDefault()
        try {
            const resVote = await logic.changeStatus(pollId, "rejected")
            setVoteRes(resVote)
            history.push('/okstatus')
        } catch (error) {
            history.push('/failstatus')
        }
    }


    return <>
    <Navbar />
    <h2 className="pollcategoryname"><b>Participate</b></h2>
    {poll && <ul className="poll-list-ul">
        {<li key={pollId}>
            <li className="pollimg"><img src={poll.imagePoll} /></li>
            <p className="pollquestion"><b>{poll.question}</b></p>
            <p className="polldescription">{poll.description}</p>
            {user.userRole === 'admin' ? 
            <div className="responses">
                <a className="button-poll" href="" onClick={handleAprovePoll}>Approve</a>
                <a className="button-poll"href="" onClick={handleRejectPoll}>Reject</a>
            </div>
            :
            <div className="responses">
            <h4 className="pollchoicestitle" >Participate</h4>
                <a className="button-poll" href="" onClick={handleVotePositive}>YES</a>
                <a className="button-poll"href="" onClick={handleVoteNegative}>NO</a>
            </div>}
        </li>}
    </ul>}
    </>
}) 