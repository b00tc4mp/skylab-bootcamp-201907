import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import Context from '../context'
import logic from '../../logic'
import moment from 'moment'


function TaskRegister({ history, match }) {

    const { params: { spaceId }} = match
    const { thisDay, thisHour, setMyTask } = useContext(Context)

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
        } catch(error) {
            console.log(error.message)
        }
    }  

    function goBack(event) {
        event.preventDefault()

        history.push(`/${spaceId}/day`)
    }

    return <>

            <section className="register">
                <h1 className="register__title">Add your task</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li className="register__form-item">
                            <select name="taskType" className="register__typeSelector">
                                <option defaultValue disabled>What type of task is it?</option>
                                <option value="particular">particular</option>
                                <option value="collective">collective</option>
                                <option value="maintenance">maintenance</option>
                                <option value="other">other</option>
                            </select>
                        </li>       

                        <li className="register__form-item">
                            <label htmlFor="taskNameInput"><input className="register__form-input" id="taskNameInput" type="text" name="taskName" placeholder="name your task!"/></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="descriptionInput"><textarea className="register__form-input" id="descriptionInput" name="description" rows="4" placeholder="description"/></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="dateInput"><input className="register__form-input" id="dateInput" type="date" name="date" defaultValue={`${moment(thisDay).format('YYYY-MM-DD')}`}/></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="dateInput"><input className="register__form-input" id="dateInput" type="time" name="time" defaultValue={`${moment(thisHour).format('HH:mm')}`} /></label>
                        </li>
                        <li className="register__form-item">
                            <label htmlFor="tagsInput"><input className="register__form-input" id="tagsInput" type="text" name="tags" placeholder="tags"/></label>
                        </li>
                        <button className="register__form-button">Add task</button>
                    </ul>
                </form>
                <a href="#" className="register__back-link" onClick={goBack}><i className="fas fa-arrow-left"></i> Go back</a>
            </section>

    </>
}

export default withRouter(TaskRegister)