import React, { useContext } from 'react'
import Context from '../context'
import { withRouter } from 'react-router-dom'
import moment from "moment"
import Chores from '../Chores'


function Week({ history }) {

    const { currentDate, setCurrentDate } = useContext(Context)

    function handleMonth(event) {
        event.preventDefault()

        history.push('/month')
    }

    function handleWeek(event) {
        event.preventDefault()

        history.push('/week')
    }

    function handleDay(event) {
        event.preventDefault()

        history.push('/day')
    }

    function handleGoToNextWeek(event) {
        event.preventDefault()

        setCurrentDate(moment(currentDate).add(1, 'weeks'))
    }

    function handleGoToPreviousWeek(event) {
        event.preventDefault()
          
        setCurrentDate(moment(currentDate).subtract(1, 'weeks')) 
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
                days.push(
                    <div className="weekly__day day">
                       {startDate.add(1, 'days').format('D')}
                    </div>
                )
            }
            rows.push( <div className="weekly__week" key={day}> {days} </div>)
            days = []
        }
        return <div className="body">{rows}</div>
    }



    return <>
    
    <main className="main"> 

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
                <Chores />

                <div className="weekly">
                    <div>{week()}</div>
                    <div>{days()}</div>
                </div> 

            </div>

        </div>

    </main>
    </>
}

export default withRouter(Week)