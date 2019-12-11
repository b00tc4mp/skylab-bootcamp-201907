import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Context from '../context'
import Feedback from '../Feedback'
import logic from '../../logic'
import moment from 'moment'


function TaskRegister({ history, match }) {

    const { params: { spaceId }} = match
    const { thisDay, thisHour, setMyTask } = useContext(Context)
    const  [error, setError]  = useState()

    function handleSubmit(event) {
            event.preventDefault()

            const { target: { taskName: { value: taskName }, taskType: { value: taskType }, description: { value: description }, date: { value: date}, time: { value: time } } } = event

            const _date = new Date(`${date}, ${time}`)
            handleRegisterTask(taskName, taskType, description, _date, spaceId)

    }

    async function handleRegisterTask(taskName, taskType, description, _date, spaceId) {
        try {
            const myTask = await logic.addTask(taskName, taskType, description, _date, spaceId)

            setMyTask(myTask)
            history.push(`/${spaceId}/day`)
        } catch({ message }) {
            setError(message)
        }
    }  

    function goBack(event) {
        event.preventDefault()

        history.push(`/${spaceId}/day`)
    }

    return <section className="task-register">

            <h1 className="task-register__title">Add your task</h1>

            <form onSubmit={ handleSubmit }>
                <ul>
                    <li className="task-register__form-item">
                        <select name="taskType" className="task-register__typeSelector">
                            <option defaultValue disabled>What type of task is it?</option>
                            <option value="particular">particular</option>
                            <option value="collective">collective</option>
                            <option value="maintenance">maintenance</option>
                            <option value="other">other</option>
                        </select>
                    </li>       

                    <li className="task-register__form-item">
                        <label htmlFor="taskNameInput"><input className="task-register__form-input" id="taskNameInput" type="text" name="taskName" placeholder="name your task!"/></label>
                    </li>
                    <li className="task-register__form-item">
                        <label htmlFor="descriptionInput"><textarea className="task-register__form-input" id="descriptionInput" name="description" rows="4" placeholder="description"/></label>
                    </li>
                    <li className="task-register__form-item">
                        <label htmlFor="dateInput"><input className="task-register__form-input" id="dateInput" type="date" name="date" defaultValue={`${moment(thisDay).format('YYYY-MM-DD')}`}/></label>
                    </li>
                    <li className="task-register__form-item">
                        <label htmlFor="dateInput"><input className="task-register__form-input" id="dateInput" type="time" name="time" defaultValue={`${moment(thisHour).format('HH:mm')}`} /></label>
                    </li>
                    <li className="task-register__form-item">
                        <label htmlFor="tagsInput"><input className="task-register__form-input" id="tagsInput" type="text" name="tags" placeholder="tags"/></label>
                    </li>
                    {error &&
                    <li className="task-register__form-item">
                        <Feedback message={error}/>
                    </li> }
                    <li className="task-register__form-item">
                        <button className="task-register__form-button">Add task</button>
                    </li>
                </ul>
            </form>
            
            <a href="#" className="task-register__back-link" onClick={goBack}><i className="fas fa-arrow-left"></i> Go back</a>

    </section>
}

export default withRouter(TaskRegister)