import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function SubjectList({ history }) {
    const { user, setUser } = useContext(Context)
    const [subjects, setSubjects] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const [students, setStudents] = useState(undefined)
    const [teachers, setTeachers] = useState(undefined)
  
    function handleSubmit(event) {
        event.preventDefault()
        debugger
        const { target: { idSub: { value: id }, student: { opt }, select: { value: naSur } } } = event
        debugger
        const arr = naSur.split(" ")
        debugger
        if (opt) handleAddStudent(id, arr[0], arr[1])
        else handleAddTeacher(id, arr[0], arr[1])
    }

    async function handleAddStudent(name, surname, idSub) {

        try {
            debugger
            await logic.subject.addStudent(name, surname, idSub)
            debugger
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }

    async function handleAddTeacher(name, surname, idSub) {

        try {
            debugger
            await logic.subject.addTeacher(name, surname, idSub)
            debugger
            setUpdate(!update)
        } catch (error) {

            console.log(error.message)
        }
    }
    useEffect(() => {
        (async () => {
            debugger
            const users = await logic.subject.retrieveTeacherNotInscrit()
            debugger
            setUser(users)

        })()
    }, [update])

    return <>
        <Header />
        <main>

            <section>


                <ul>

                    {user && user.length > 0 && user.map(({ title, id, teacher, student }) =>



                        <li>
                            <h3>{title}</h3>

                            {
                                <form onSubmit={handleSubmit}>
                                    <select name="select">
                                        {student && student.length > 0 && student.map(({ name, surname }) =>

                                            <option value={name + " " + surname}>{name + " " + surname}</option>

                                        )}

                                    </select>
                                    <input type='hidden' name='idSub' value={id} />
                                    <input type='hidden' name='student' value='1' />
                                    <button>Add</button>
                                </form>

                            }
                            {
                                <form onSubmit={handleSubmit}>
                                    <select name="select">
                                    
                                        {teacher && teacher.length > 0 && teacher.map(({ name, surname }) =>

                                            <option value={name + " " + surname}>{name + " " + surname}</option>

                                        )
                                        
                                        }

                                    </select>
                                    <input type='hidden' name='idSub' value={id} />
                                    <input type='hidden' name='student' />

                                    <button>Add</button>
                                </form>

                            }
                         
                        </li>



                    )}
                </ul>


            </section>
            <Link to={`/admin`}>Go back</Link >
        </main>
    </>
}
export default withRouter(SubjectList)