import React, { useContext, useEffect } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function SubjectTeacherList({ history }) {
    const { teachers, setTeachers, user } = useContext(Context)

    debugger
    useEffect(() => {
        (async () => {
            debugger
            const teachers = await logic.retrieveTeachersSubjects();
            setTeachers(teachers)
            debugger
        })()
    }, [user])
    debugger
    return <>
        <Header />
        <main>

            <section>
                <ul>
                    {teachers && teachers.length > 0 && teachers.map(teacher => {debugger
                        return<>
                        <li key={teacher.title}>
                            <h3>{teacher.title}</h3>
                            {teacher.teachers.map(t => <p key={t.name + t.surname}>{t.name} {t.surname}</p>)}
                        </li>
                        </>
                    }
                    )}

                </ul>
            </section>
            <Link to={`/student-home`}>Go back</Link >
        </main>
    </>
}
export default withRouter(SubjectTeacherList)