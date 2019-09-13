import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import moment from "moment"
import Chores from '../Chores'


function Day({ history }) {

    const [currentDate, setCurrentDate] = useState(moment())

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

    function handleGoToNextDay(event) {
        event.preventDefault()

        setCurrentDate(moment(currentDate).add(1, 'days'))
    }

    function handleGoToPreviousDay(event) {
        event.preventDefault()
          
        setCurrentDate(moment(currentDate).subtract(1, 'days')) 
    }

    return <>
    
    <main className="main"> 

        <div className="day">

            <div className="day__header">
                <i className="fas fa-caret-left" onClick={handleGoToPreviousDay}></i><h1 className="day__title"> {moment(currentDate).format('dddd Do')} </h1><i className="fas fa-caret-right" onClick={handleGoToNextDay}></i>
            </div> 
            <p className="day__month-year">{moment(currentDate).format('MMMM')} 2019  -  Week {moment(currentDate).week()}</p>

            <div className="day__toolbar">
                <div className="day__toggle">
                  <div className="month__toggle-option month__toggle-option--selected" onClick={handleDay}>today</div>
                  <div className="month__toggle-option" onClick={handleWeek}>week</div>
                  <div className="month__toggle-option" onClick={handleMonth}>month</div>
                </div>
                <form>
                  <input className="day__search-input" type="text" placeholder="Search"/> <i className="fa fa-search"></i>
                </form>
            </div>

            <div className="day__act">
                <Chores />
            
                <table className="timetable">
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">7-8h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">8-9h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">10-11h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">11-12h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">12-13h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">14-15h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">15-16h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">16-17h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">17-18h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">19-20h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">21-22h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">23-24h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">24-1h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">1-2h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">2-3h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">3-4h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">4-5h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">5-6h</th>
                        <td className="timetable__td"></td>
                    </tr>
                    <tr className="timetable__tr">
                        <th className="timetable__th" scope="row">6-7h</th>
                        <td className="timetable__td"></td>
                    </tr>
                </table>
            </div>
        </div>

    </main>
    </>
}

export default withRouter(Day)