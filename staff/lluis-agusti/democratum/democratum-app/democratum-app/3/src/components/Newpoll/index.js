import React, {useState, useContext}  from 'react'
import { withRouter } from 'react-router-dom'
import Context from '../Context'

import logic from '../../logic'
import Navbar from '../Navbar'
import Feedback from '../Feedback'
import newPoll from '../../logic/new-poll'

import './index.sass'

function Newpoll({ onNewPoll, onLogout, history }) {

    const [error, setError] = useState(null)

    const {user, setUser} = useContext(Context)

    return <>
    <Navbar />
    <div>
        <h2 className="formname">Propose New Poll</h2>
        <p className="formtitlesub">Please, fill the following form.</p>
        <div className="containerform">
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { cityId: { value: cityId }, authorId: { value: authorId }, question: { value: question }, optionA: { value: optionA }, optionB: { value: optionB }, description: { value: description }, expiryDate: { value: expiryDate }, imagePoll: { value: imagePoll}, positives: { value: positives }, negatives: { value: negatives }, pollStatus: { value: pollStatus } } } = event

            onNewPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        }}>
            <div className="containerinput">
            <input type="hidden" name="cityId" value ="5d70f3df7d4edc12334851d7"/>
            <input type="hidden" name="authorId" value ="5d70f3df7d4edc12334851d7"/>
            <input type="text" name="question" placeholder="Question"/>
            <input type="text" name="optionA" placeholder="Option 1"/>
            <input type="text" name="optionB" placeholder="Option 2"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="hidden" name="expiryDate" placeholder="Expiry Date" value ="05/17/2084"/>
            <input type="hidden" name="imagePoll" placeholder="imagePoll" value ="https://www.democratum.com/skylab/vote-poll.jpg"/>
            <input type="hidden" name="positives" placeholder="positives" value ="0"/>
            <input type="hidden" name="negatives" placeholder="negatives" value ="0"/>
            <input type="hidden" name="pollStatus" placeholder="pollStatus" value ="pending"/>
            </div>
            <button className="button-poll">Accept</button>
        </form>
        {error && <Feedback message={error} />}
        </div>
        
        </div>
        </>
}

export default withRouter(Newpoll)