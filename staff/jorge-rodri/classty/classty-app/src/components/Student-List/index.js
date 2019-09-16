import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function StudentList({ history }) {
    const { students, setStudents, user } = useContext(Context)


    debugger
    useEffect(() => {
        (async () => {
            debugger
            const students = await logic.retrieveAll('student');
            setStudents(students)

        })()
    }, [])
debugger
    return <>
        <Header />
        <main>

            <section>
                <h2>Students</h2>
                <ul>
                    {students && students.length > 0 && students.map(({id, name, surname }) =>
              
                        <li><Link to={`/profile/${id}`} >{name + " " + surname}</Link></li>
                    )}

                </ul>
            </section>
            <Link to={`/student-home`}>Go back</Link >
        </main>
    </>
}
export default withRouter(StudentList)