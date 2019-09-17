import React, { useContext, useEffect, useState } from 'react'
import Context from '../context'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import logic from '../../logic/'

import Chores from '../Chores'

function Day({ history, match }) {

    const { params: { spaceId } } = match
    const { thisDay, setThisDay, setThisHour } = useContext(Context)
    const [ dayTasks, setDayTasks ] = useState()
    const [ update, setUpdate ] = useState(false)

    useEffect(() => {
        (async () =>{
          try {
            const tasks = await logic.retrieveAllSpaceTasks(spaceId)
            
            const dayTasks = tasks.filter(task => moment(thisDay).isSame(task.date, 'day'))
            setDayTasks(dayTasks)

            setUpdate(false)
          } catch(error) {
            console.log(error.message)
          }
        })()
    },[spaceId, update, thisDay])


    function handleMonth(event) {
        event.preventDefault()

        history.push(`/${spaceId}/month`)
    }

    function handleWeek(event) {
        event.preventDefault()

        history.push(`/${spaceId}/week`)
    }

    function handleDay(event) {
        event.preventDefault()

        setThisDay(moment())
        history.push(`/${spaceId}/day`)
    }

    function handleGoToNextDay(event) {
        event.preventDefault()

        setThisDay(moment(thisDay).add(1, 'days'))
    }

    function handleGoToPreviousDay(event) {
        event.preventDefault()

        setThisDay(moment(thisDay).subtract(1, 'days'))
    }

    function handleAddTask(thisHour) {

        setThisHour(thisHour)
        history.push(`/${spaceId}/task-register`)
    }

    function handleDeleteTask(taskId) {

        handleRemoval(taskId)
    }

    async function handleRemoval(taskId) {
        try {
            await logic.deleteTask(spaceId, taskId)

            setUpdate(true)
        } catch(error) {
            console.log(error.message)
        }
    }

    function handleHour(start, end){
        return dayTasks.map(task => {
            let hour = Number(moment(task.date).format('H'))
            if (start <= hour && hour < end) {
                return <>
                <div className="timetable__task-intro">
                   <p className="timetable__task-user">{task.companionNames}</p> 
                   <p className="timetable__task-name">({task.taskName} {moment(task.date).format('HH:mm')}h)</p>
                   <i class="fas fa-minus-circle" onClick={() => handleDeleteTask(task._id)}></i>
                </div>
                <p className="timetable__task-description">- {task.description}</p>
                </>                 
            }
        })
    }
    
    return <div className="day">
            <div className="day__header">
                <i className="fas fa-caret-left" onClick={handleGoToPreviousDay}></i><h1 className="day__title"> {moment(thisDay).format('dddd Do')} </h1><i className="fas fa-caret-right" onClick={handleGoToNextDay}></i>
            </div>
            <p className="day__month-year">{moment(thisDay).format('MMMM')} 2019  -  Week {moment(thisDay).week()}</p>

            <div className="day__toolbar">
                <div className="day__toggle">
                    <div className="month__toggle-option month__toggle-option--selected" onClick={handleDay}>today</div>
                    <div className="month__toggle-option" onClick={handleWeek}>week</div>
                    <div className="month__toggle-option" onClick={handleMonth}>month</div>
                </div>
                <form>
                    <input className="day__search-input" type="text" placeholder="Search" /> <i className="fa fa-search"></i>
                </form>
            </div>

            <div className="day__act">
                <Chores spaceId={match.params.spaceId}/>

                <table className="timetable">
                    <tbody>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">7-8h <button className="fas fa-plus-circle" data-hour='7' onClick={e => {handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0))}}></button></th>
                            <td className="timetable__td"> 
                                {dayTasks && handleHour(7, 8)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">8-9h <button className="fas fa-plus-circle" data-hour='8' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(8, 9)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">9-10h <button className="fas fa-plus-circle" data-hour='9' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(9, 10)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">10-11h <button className="fas fa-plus-circle" data-hour='10' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(10, 11)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">11-12h <button className="fas fa-plus-circle" data-hour='11' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(11, 12)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">12-13h <button className="fas fa-plus-circle" data-hour='12' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(12, 13)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">13-14h <button className="fas fa-plus-circle" data-hour='13' onClick={e => {handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0))}}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(13, 14)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">14-15h <button className="fas fa-plus-circle" data-hour='14' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(14, 15)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">15-16h <button className="fas fa-plus-circle" data-hour='15' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(15, 16)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">16-17h <button className="fas fa-plus-circle" data-hour='16' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(16, 17)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">17-18h <button className="fas fa-plus-circle" data-hour='17' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(17, 18)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">18-19h <button className="fas fa-plus-circle" data-hour='18' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(18, 19)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">19-20h <button className="fas fa-plus-circle" data-hour='19' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(19, 20)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">20-21h <button className="fas fa-plus-circle" data-hour='20' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(20, 21)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">21-22h <button className="fas fa-plus-circle" data-hour='21' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(21, 22)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">22-23h <button className="fas fa-plus-circle" data-hour='22' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(22, 23)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">23-0h <button className="fas fa-plus-circle" data-hour='23' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(23, 24)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">0-1h <button className="fas fa-plus-circle" data-hour='0' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(0, 1)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">1-2h <button className="fas fa-plus-circle" data-hour='1' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(1, 2)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">2-3h <button className="fas fa-plus-circle" data-hour='2' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(2, 3)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">3-4h <button className="fas fa-plus-circle" data-hour='3' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(3, 4)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">4-5h <button className="fas fa-plus-circle" data-hour='4' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(4, 5)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">5-6h <button className="fas fa-plus-circle" data-hour='5' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(5, 6)}
                            </td>
                        </tr>
                        <tr className="timetable__tr">
                            <th className="timetable__th" scope="row">6-7h <button className="fas fa-plus-circle" data-hour='6' onClick={e => { handleAddTask(moment(thisDay).hour(e.target.dataset.hour).minute(0)) }}></button></th>
                            <td className="timetable__td">
                                {dayTasks && handleHour(6, 7)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
}

export default withRouter(Day)