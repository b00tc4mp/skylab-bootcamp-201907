import React, { useEffect, useContext } from 'react'
import logic from '../../logic'
import Context from '../Context'
import { withRouter, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from '../Header';

function Mentor({ history }) {

    const { user } = useContext(Context)

    const handleGoToClassList = event => {
        event.preventDefault()

        history.push("/class-list")
    }

    const handleGoToCreateClass = event => {
        event.preventDefault()

        history.push("/create-class")
    }

    const handleGoToRemoveClass = event => {
        event.preventDefault()

        history.push("/remove-class")
    }

    const handleGoToTeacherList = event => {
        event.preventDefault()

        history.push('/teacher-list')
    }

    const handleGoToCreateTeacher = event => {
        event.preventDefault()

        history.push('/create-teacher')
    }
    
    const handleGoToRemoveTeacher = event => {
        event.preventDefault()

        history.push('/remove-teacher')
    }
    return <>
        <Header />
        <nav>
            <ul>
                <h3>Class Operative</h3>
                <li><a href='' onClick ={handleGoToClassList}>Class list</a></li>
                <li><a href='' onClick ={handleGoToCreateClass}>Create Class</a></li>
                <li><a href='' onClick ={handleGoToRemoveClass}>Remove Class</a></li>

            </ul>
            <ul>
                <h3>Teacher Operative</h3>
                <li><a href='' onClick ={handleGoToTeacherList}>Teacher list</a></li>
                <li><a href='' onClick ={handleGoToCreateTeacher}>Create teacher</a></li>
                <li><a href='' onClick ={handleGoToRemoveTeacher}>Remove teacher</a></li>

            </ul>

        </nav>

    </>
}
export default withRouter(Mentor)