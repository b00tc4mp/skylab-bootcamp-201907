import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import moment from "moment"

function Month({ history }) {

    const [currentDate, setCurrentDate] = useState(moment())
    const [selectedDate, setSelectedDate] = useState(moment())

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

    function handleGoToNextMonth() {
            setCurrentDate(moment().add(1, 'months'))
    }

    function handleGoToPreviousMonth() {
           setCurrentDate(moment().subtrack(1, 'months')) 
    }

    /* function onDateClick(day) {
        setSelectedDate(day)
    } */
    
    const header = () => {

        return (
        <>
            <h1 class="month__title"><i class="fas fa-caret-left" onClick={handleGoToPreviousMonth}></i> {moment().format("MMMM")} <i class="fas fa-caret-right" onClick={handleGoToNextMonth}></i></h1>
            <p class="month__year">{moment().format("YYYY")}</p>
        </>
        )
    }

    const week = () => {

        const days = []
        const startDate = moment().startOf('week')
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <div>
                    {startDate.add(1, 'days').format('ddd')}
                </div>      
            )       
        }
        return <div class="calendar__header">{days}</div>
    }

    const days = () => {

/*         const monthStart = moment().startOf('month')
        const monthEnd = moment(monthStart).endOf('month')
        const startDate = moment(monthStart).startOf('week')
        const endDate = moment(monthEnd).endOf('week') 
        const rows = []

        let days = []
        let day = startDate
        let formattedDate = ""

        let prevDays = []
        let nextDays = []
        let monthDays = []

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const month = moment().format('MM')
                const todayName = moment().format('ddd')
                const todayNum = moment().format('D')

                while (todayNum !== '1' ) {
                    prevDays.push(moment().subtrack(1, 'days'))
                } 
                 
                while (todayNum !== '1' ) {
                    nextDays.push(moment().add(1, 'days'))
                } 

                if (todayNum === '1' && todayName === 'MON' ) {
                    days.push(
                        <div class="calendar__day day" key={day}>
                        {formattedDate}
                        </div>
                    )
                    day = day.add(1, 'days')
                }
                

            }
            rows.push( <div class="calendar__week" key={day}> {days} </div>)
            days = []
        }
        return <div>{rows}</div>  */
        

        const monthStart = moment().startOf('month')
        const monthEnd = moment(monthStart).endOf('month')
        const startDate = moment(monthStart).startOf('week')
        const endDate = moment(monthEnd).endOf('week') 
        const rows = []

        let days = []
        let day = startDate
        let formattedDate = ""

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = day.format('D')

                days.push(
                    <div class="calendar__day day" key={day}>
                       {formattedDate}
                    </div>
                )
                day = day.add(1, 'days')
            }
            rows.push( <div class="calendar__week" key={day}> {days} </div>)
            days = []
        }
        return <div>{rows}</div>
    }

    return <>
    
    <main class="main"> 

        <div class="month">

            {/* <h1 class="month__title"><i class="fas fa-caret-left" onClick={handleGoToPreviousMonth}></i> September <i class="fas fa-caret-right" onClick={handleGoToNextMonth}></i></h1>
            <p class="month__year">2019</p> */}
            <div>{header()}</div>

            <div class="month__toolbar">
                <div class="month__toggle">
                  <div class="month__toggle-option" onClick={handleDay}>today</div>
                  <div class="month__toggle-option" onClick={handleWeek}>week</div>
                  <div class="month__toggle-option month__toggle-option--selected" onClick={handleMonth}>month</div>
                </div>
                <form>
                  <input class="month__search-input" type="text" placeholder="Search"/> <i class="fa fa-search"></i>
                </form>
            </div>

            <div class="month__act">
                <div class="month__activity">
                    <div class="month__chores">
                        <p class="month__list-title"><strong>Regular chores</strong></p>
                        <ul class="month__list">
                            <li class="month__item"><i class="far fa-square"></i> cleaning</li>
                            <li class="month__item"><i class="far fa-square"></i> listing stock</li>
                            <li class="month__item"><i class="far fa-square"></i> re-stocking</li>
                            <li class="month__item"><i class="far fa-plus-square"></i></li>
                        </ul>
                    </div>
                    <div class="month__tags">
                        <p class="month__list-title"><strong>Activity Tags</strong></p>
                        <ul class="month__list">
                            <li class="month__item"><i class="fas fa-square"></i> cooking</li>
                            <li class="month__item"><i class="fas fa-square"></i> eating</li>
                            <li class="month__item"><i class="fas fa-plus-square"></i></li>
                        </ul>
                    </div>
                </div>
                
                <div class="calendar">
                    <div>{week()}</div>
                    <div>{days()}</div>
                </div>                 

                {/* <div class="calendar">
                    <div class="calendar__header">
                        <div>mon</div>
                        <div>tue</div>
                        <div>wed</div>
                        <div>thu</div>
                        <div>fri</div>
                        <div>sat</div>
                        <div>sun</div>
                    </div>
                    <div class="calendar__week">
                        <div class="calendar__day day">1</div>
                        <div class="calendar__day day">2</div>
                        <div class="calendar__day day">3</div>
                        <div class="calendar__day day">4</div>
                        <div class="calendar__day day">5</div>
                        <div class="calendar__day day">6</div>
                        <div class="calendar__day day">7</div>
                    </div>
                    <div class="calendar__week">
                        <div class="calendar__day day">8</div>
                        <div class="calendar__day day">9</div>
                        <div class="calendar__day day">10</div>
                        <div class="calendar__day day">11</div>
                        <div class="calendar__day day">12</div>
                        <div class="calendar__day day">13</div>
                        <div class="calendar__day day">14</div>        
                    </div>
                    <div class="calendar__week">
                        <div class="calendar__day day">15</div>
                        <div class="calendar__day day">16</div>
                        <div class="calendar__day day">17</div>
                        <div class="calendar__day day">18</div>
                        <div class="calendar__day day">19</div>
                        <div class="calendar__day day">20</div>
                        <div class="calendar__day day">21</div>    
                    </div>
                    <div class="calendar__week">
                        <div class="calendar__day day">22</div>
                        <div class="calendar__day day">23</div>
                        <div class="calendar__day day">24</div>
                        <div class="calendar__day day">25</div>
                        <div class="calendar__day day">26</div> 
                        <div class="calendar__day day">27</div> 
                        <div class="calendar__day day">28</div> 
                    </div>
                    <div class="calendar__week">
                        <div class="calendar__day day">29</div>
                        <div class="calendar__day day">30</div>
                        <div class="calendar__day day">31</div>
                        <div class="calendar__day day">1</div>
                        <div class="calendar__day day">2</div>
                        <div class="calendar__day day">3</div>
                        <div class="calendar__day day">4</div>
                    </div>
                </div> */}
            </div>

        </div> 

    </main>
    </>
}

export default withRouter(Month)