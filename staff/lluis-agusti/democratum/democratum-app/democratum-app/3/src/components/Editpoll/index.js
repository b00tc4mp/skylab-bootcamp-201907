import React from 'react'
//import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
//import Context from '../Context'
import Navbar from '../Navbar'

function Editpoll({ history }) {




    return <>
    <Navbar />
        <h2>Update Poll</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { cityId: { value: cityId }, authorId: { value: authorId }, question: { value: question }, optionA: { value: optionA }, optionB: { value: optionB }, description: { value: description }, expiryDate: { value: expiryDate }, imagePoll: { value: imagePoll}, positives: { value: positives }, negatives: { value: negatives }, pollStatus: { value: pollStatus } } } = event

            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)

            console.log('poll updated created')
            //history.push('/newpolldone')
        }}>
            <input type="text" name="authorId" value="" hidden placeholder="authorId"/>
            <input type="text" name="question" placeholder="question"/>
            <input type="text" name="optionA" placeholder="optionA"/>
            <input type="text" name="optionB" placeholder="optionB"/>
            <input type="textarea" name="description" placeholder="description"/>
            <input type="date" name="expiryDate" placeholder="Deadline"/>
            <input type="text" name="imagePoll" placeholder="imagePoll"/>
            <input type="text" name="positives" hidden placeholder="positives" value="0"/>
            <input type="text" name="negatives" hidden placeholder="negatives" value="0"/>
            <input type="radio" name="pollStatus" value="pending">Pending</input>
            <input type="radio" name="pollStatus" value="approved">Approved</input>
            <input type="radio" name="pollStatus" value="expired">Expired</input>
            <input type="radio" name="pollStatus" value="rejected">Rejected</input>
            <button>Submit changes</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            history.push('/')
        }}>Go back</a>
    </>
}

export default withRouter(Editpoll)

//Posar selector dins el form amb seleccions per defecte

//CityId al newpoll i + status