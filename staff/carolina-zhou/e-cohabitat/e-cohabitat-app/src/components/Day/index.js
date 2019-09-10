import React from 'react'
import { withRouter } from 'react-router-dom'

function Day({ history }) {

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

    return <>
    
    <main class="main"> 

        <div class="day">

            <h1 class="day__title"><i class="fas fa-caret-left"></i> Monday 1st <i class="fas fa-caret-right"></i></h1>
            <p class="day__month-year">September 2019 - Week 1</p>

            <div class="day__toolbar">
                <div class="day__toggle">
                  <div class="month__toggle-option month__toggle-option--selected" onClick={handleDay}>today</div>
                  <div class="month__toggle-option" onClick={handleWeek}>week</div>
                  <div class="month__toggle-option" onClick={handleMonth}>month</div>
                </div>
                <form>
                  <input class="day__search-input" type="text" placeholder="Search"/> <i class="fa fa-search"></i>
                </form>
            </div>

            <div class="day__act">
               <div class="day__activity">
                    <div class="day__chores">
                        <p class="day__list-title"><strong>Regular chores</strong></p>
                        <ul class="day__list">
                            <li class="day__item"><i class="far fa-square"></i> cleaning</li>
                            <li class="day__item"><i class="far fa-square"></i> listing stock</li>
                            <li class="day__item"><i class="far fa-square"></i> re-stocking</li>
                            <li class="day__item"><i class="far fa-plus-square"></i></li>
                        </ul>
                    </div>
                    <div class="day__tags">
                        <p class="day__list-title"><strong>Activity Tags</strong></p>
                        <ul class="day__list">
                            <li class="day__item"><i class="fas fa-square"></i> cooking</li>
                            <li class="day__item"><i class="fas fa-square"></i> eating</li>
                            <li class="day__item"><i class="fas fa-plus-square"></i></li>
                        </ul>
                    </div>
                </div>
            
                <table class="timetable">
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">7-8h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">8-9h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">10-11h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">11-12h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">12-13h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">14-15h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">15-16h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">16-17h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">17-18h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">19-20h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">21-22h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">23-24h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">24-1h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">1-2h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">2-3h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">3-4h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">4-5h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">5-6h</th>
                        <td class="timetable__td"></td>
                    </tr>
                    <tr class="timetable__tr">
                        <th class="timetable__th" scope="row">6-7h</th>
                        <td class="timetable__td"></td>
                    </tr>
                </table>
            </div>
        </div>

    </main>
    </>
}

export default withRouter(Day)