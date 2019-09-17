import React, { useEffect, useContext } from 'react'
import logic from '../../logic'
import Context from '../Context'
import { withRouter, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from '../Header';

function Mentor({ history }) {

    const handleGoToSubjectList = event => {
        event.preventDefault()

        history.push('/subject-list')
    }
    const handleGoToClassList = event => {
        event.preventDefault()

        history.push("/class-list")
    }

    const handleGoToRemoveClass = event => {
        event.preventDefault()

        history.push("/remove-class")
    }

    const handleGoToTeacherList = event => {
        event.preventDefault()

        history.push('/teacher-list')
    }

    const handleGoToRemoveTeacher = event => {
        event.preventDefault()

        history.push('/remove-teacher')
    }

    const handleGoToRemoveSubject = event => {
        event.preventDefault()

        history.push('/remove-subject')
    }
    return <>
        <Header />
        <nav>
            <ul>
                <h3>Class Operative</h3>
                <li><a href='' onClick={handleGoToClassList}>Class list</a></li>
                <li><a href='' onClick={handleGoToRemoveClass}>Remove Class</a></li>
            </ul>
            <ul>
                <h3>Teacher Operative</h3>
                <li><a href='' onClick={handleGoToTeacherList}>Teacher list</a></li>
                <li><a href='' onClick={handleGoToRemoveTeacher}>Remove teacher</a></li>
            </ul>
            <ul>
                <h3>Subject Operative</h3>
                <li><a href='' onClick={handleGoToSubjectList}>Subject list</a></li>
                <li><a href='' onClick={handleGoToRemoveSubject}>Remove subject</a></li>
            </ul>
        </nav>

    </>
}
export default withRouter(Mentor)