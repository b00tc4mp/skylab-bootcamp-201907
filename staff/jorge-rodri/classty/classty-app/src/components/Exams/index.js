import React, { useContext, useEffect, useState } from 'react'
import logic from '../../logic'
import Context from '../Context'
import Header from '../Header'
import { withRouter, Link } from 'react-router-dom'

function Exams({ history }) {
    const { exams, setExams, user, setUser } = useContext(Context)
    const [update, setUpdate] = useState(false)
    const [students, setStudents] = useState(undefined)

    const _id = history.location.pathname.split('/').pop()

    function reverse(str) {
        return str.split("-").reverse().join("-");
    }
    function handleSubmit(event) {
        event.preventDefault()
        const { target: { title: { value: title }, date: { value: date } } } = event
        debugger
        handleCreateExam(title, reverse(date))
    }

    function handleNote(event) {
        event.preventDefault()
        debugger
        const { target: { select: { value: naSur }, note: { value: note }, id: { value: idE } } } = event
        debugger
        const arr = naSur.split(" ")
        debugger
        handleAddNote(arr[0], arr[1], note, idE)
    }

    async function handleAddNote(name, surname, note, idE) {
        debugger
        await logic.exam.addNote(name, surname, note, idE, _id)
        document.getElementById('ex').value = ''
        setUpdate(!update)
    }

    async function handleCreateExam(title, date) {
        debugger
        await logic.exam.createExam(_id, title, date)
        document.getElementById('ex').value = ''
        setUpdate(!update)
    }
    useEffect(() => {
        (async () => {
            const user = await logic.user.retrieveUser()
            setUser(user)
            if (user && user.type == 'student') {
                debugger
                const exams = await logic.exam.retrieveAllExams(_id);
                setExams(exams)
            } else {
                debugger
                const exams = await logic.exam.retrieveAllExamsTeacher(_id);
                setExams(exams)
                debugger
                const students = await logic.exam.retrieveNotUserNoteExam(_id);
                debugger
                setStudents(students)
            }

        })()
    }, [update])

    return <>
        <Header />
        <main>
            <section>
                <h2>Exams</h2>
                {user && user.type == 'student' && <ul>
                    {exams && exams.length > 0 && exams.map(({ _exam }) =>

                        <li>
                            <h4>{_exam.title}</h4>
                            <time>{reverse(_exam.date.slice(0, 9))}</time>
                            {_exam.notes && <h3>{_exam.notes[0].note}</h3>}
                        </li>
                    )}

                </ul>}
                {user && user.type == 'teacher' &&
                    <form onSubmit={handleSubmit}>
                        <input type='text' id='ex' name='title' placeholder='title' />
                        <input type='date' id='ex' name='date' placeholder='date' />
                        <button>Create</button>
                    </form>
                }
                {user && user.type == 'teacher' &&
                    <ul>
                        {exams && exams.length > 0 && exams.map((_exam) =>
                            <li>
                                <h4>{_exam.title}</h4>
                                <time>{reverse(_exam.date.slice(0, 9))}</time>
                                <h5>Add Notes</h5>
                                <form onSubmit={handleNote}>
                                    <select name="select">
                                        {students && students.length > 0 && students.map(student =>{debugger

                                            return student.id == _exam._id&&

                                            student.user && student.user.length > 0 && student.user.map(({name, surname, id})=>
                                            
                                                <option value={name+" "+surname}>{name + " " + surname}</option>
    
                                            )
                                        })}
                                    </select>
                                    <input type='text' id='ex' name="note" placeholder='note' />
                                    <input type='hidden' name='id' value={_exam._id} />
                                    <button>Add</button>
                                </form>
                                <h5>Notes</h5>
                                <ul>{_exam.notes && _exam.notes.length > 0 && _exam.notes.map(({ name, surname, note }) => {
                                    return <li>
                                        <h7>{name + " " + surname}</h7>
                                        <p>{note}</p>
                                    </li>
                                })}</ul>
                            </li>)}

                    </ul>}
            </section>
            <Link to={`/subject/${_id}`}>Go back</Link >
        </main>
    </>
}
export default withRouter(Exams)