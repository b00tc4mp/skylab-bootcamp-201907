import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function StudentHome({ history }) {
    const { subjects, setSubjects, user } = useContext(Context)

    const handleGoToTeacherList = event => {
        event.preventDefault()
        history.push('/teacher-list-subject')
    }

    const handleGoToStudentList = event => {
        event.preventDefault()
        history.push('/student-list')    
    }
debugger
    useEffect(() => {
        (async () => {

                const subjects = await logic.listSubjects();
                setSubjects(subjects)

        })()
    },[user])

    return <>
        <Header />
        <main>
            <nav>
                <ul>
                <li><a href='' onClick ={handleGoToTeacherList}>Teachers</a></li>
                <li><a href='' onClick ={handleGoToStudentList}>Students</a></li>
                </ul>
            </nav>
            <section>

                {subjects && subjects.length && subjects.map(({ id, title }) =>
                    <ul>

                        <li><Link to={`/subject/${id}`}>{title}</Link ></li>

                    </ul>)}

            </section>
        </main>
    </>
}
export default withRouter(StudentHome)