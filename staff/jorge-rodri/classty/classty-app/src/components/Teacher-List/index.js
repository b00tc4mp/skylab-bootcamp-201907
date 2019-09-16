import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function TeacherList({ history }) {
    const { teachers, setTeachers, user } = useContext(Context)

    function handleBack(event){
        event.preventDefault()
        history.go(-1)
    }

    debugger
    useEffect(() => {
        (async () => {
            debugger
            const teachers = await logic.retrieveAll('teacher');
            setTeachers(teachers)

        })()
    }, [])

    return <>
        <Header />
        <main>

            <section>
                <h2>Teachers</h2>
                <ul>
                    {teachers && teachers.length > 0 && teachers.map(({ name, surname }) =>

                        <li>{name + " " + surname}</li>
                    )}

                </ul>
            </section>
            <a href='' onClick={handleBack}>Go back</a>
        </main>
    </>
}
export default withRouter(TeacherList)