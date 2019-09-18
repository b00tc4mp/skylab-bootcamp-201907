import React, { useContext, useState, useEffect } from 'react'
import Context from '../context'
import { withRouter } from 'react-router-dom'
import moment from "moment"
import Chores from '../Chores'
import logic from '../../logic/'


function Week({ history, match }) {

    const { params: { spaceId } } = match
    const { currentDate, setCurrentDate, setThisDay } = useContext(Context)
    const [ weekTasks, setWeekTasks ] = useState([])

    useEffect(() => {
        (async () =>{
          try {
            const tasks = await logic.retrieveAllSpaceTasks(spaceId)
            
            const weekTasks = tasks.filter(task => moment(currentDate).isSame(task.date, 'week'))
            setWeekTasks(weekTasks)

          } catch(error) {
            console.log(error.message)
          }
        })()
    },[spaceId, currentDate])

    function handleMonth(event) {
        event.preventDefault()

        history.push(`/${spaceId}/month`)
    }

    function handleWeek(event) {
        event.preventDefault()

        setCurrentDate(moment())
    }

    function handleDay(event) {
        event.preventDefault()

        history.push(`/${spaceId}/day`)
    }

    function handleGoToDay(day) {
        
        day = moment(day).add(1, 'days')
        setThisDay(moment(day))
        history.push(`/${spaceId}/day`)
    }

    function handleGoToNextWeek(event) {
        event.preventDefault()

        setCurrentDate(moment(currentDate).add(1, 'weeks'))
    }

    function handleGoToPreviousWeek(event) {
        event.preventDefault()
          
        setCurrentDate(moment(currentDate).subtract(1, 'weeks')) 
    }

    function handleDayTasks(date){
        return weekTasks.map(task => {
            let taskDay = moment(task.date).format('YYYY MMMM D')
            let currentDay = moment(date).format('YYYY MMMM D')
            if (taskDay === currentDay) {
                return <div className="weekly__task"><i className="far fa-circle"></i> <p className="weekly__task-name">{task.taskName}</p></div>                 
            }
        })
    }
    
    
    const header = () => {

        return (
        <>
            <div className="week__header">
                <i className="fas fa-caret-left" onClick={handleGoToPreviousWeek}></i><h1 className="week__title"> Week {moment(currentDate).week()} </h1><i className="fas fa-caret-right" onClick={handleGoToNextWeek}></i>
            </div>
            <p className="week__month-year">{moment(currentDate).format("MMMM YYYY")}</p>
        </>
        )
    }

    const week = () => {
        const days = []
        const monday = moment(currentDate).startOf('week')
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <div>
                    {monday.add(1, 'days').format('ddd')}
                </div>      
            )       
        }
        return <div className="weekly__header">{days}</div>
    }

    const days = () => {
        const startDate = moment(currentDate).startOf('week')
        const endDate = moment(currentDate).endOf('week')
        const rows = []
        let days = []
        let day = startDate
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const dataDate = startDate.format()
                days.push(
                    <div className="weekly__day day" onClick={() => {handleGoToDay(dataDate)}}>
                       {startDate.add(1, 'days').format('D')}
                       {weekTasks && <div className="weekly__tasks">{handleDayTasks(startDate)}</div>}
                    </div>
                )
            }
            rows.push( <div className="weekly__week" key={day}> {days} </div>)
            days = []
        }
        return <div className="body">{rows}</div>
    }



    return <>

        <div className="week">

            <div>{header()}</div>

            <div className="week__toolbar">
                <div className="week__toggle">
                  <div className="month__toggle-option" onClick={handleDay}>today</div>
                  <div className="month__toggle-option month__toggle-option--selected" onClick={handleWeek}>week</div>
                  <div className="month__toggle-option" onClick={handleMonth}>month</div>
                </div>
                <form>
                  <input className="week__search-input" type="text" placeholder="Search"/> <i className="fa fa-search"></i>
                </form>
            </div>

            <div className="week__act">
                <Chores history spaceId={match.params.spaceId}/>

                <div className="weekly">
                    <div>{week()}</div>
                    <div>{days()}</div>
                </div> 

            </div>

        </div>

    </>
}

export default withRouter(Week)