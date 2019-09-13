import React, { useContext } from 'react'
import Context from '../context'
import { withRouter } from 'react-router-dom'
import moment from "moment"
import Chores from '../Chores'

function Month({ history }) {

    const { currentDate, setCurrentDate } = useContext(Context)
    /* const [selectedDate, setSelectedDate] = useState(new Date) */

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

    function handleGoToNextMonth(event) {
        event.preventDefault()

        setCurrentDate(moment(currentDate).add(1, 'months'))
    }

    function handleGoToPreviousMonth(event) {
        event.preventDefault()
          
        setCurrentDate(moment(currentDate).subtract(1, 'months')) 
    }

    /* function onDateClick(day) {
        setSelectedDate(day)
    } */
    
    const header = () => {

        return (
        <>
            <div className="month__header">
                <i className="fas fa-caret-left" onClick={handleGoToPreviousMonth}></i><h1 className="month__title"> {moment(currentDate).format("MMMM")} </h1><i className="fas fa-caret-right" onClick={handleGoToNextMonth}></i>
            </div>
            <p className="month__year">{moment(currentDate).format("YYYY")}</p>
        </>
        )
    }

    const week = () => {

        const days = []
        const startDate = moment(currentDate).startOf('week')
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <div>
                    {startDate.add(1, 'days').format('ddd')}
                </div>      
            )       
        }
        return <div className="calendar__header">{days}</div>
    }

    const days = () => {

        const monthStart = moment(currentDate).startOf('month'),
        monthEnd = moment(currentDate).endOf('month'),
        endDate = moment(monthEnd).endOf('week'),
        rows = []

        let days = []
        let formattedDate = ''

        let first = monthStart
        switch (first.day()) {
            case 1:
                first.add(7, 'days')
                break
            case 2:
                first.add(6, 'days')
                break
            case 3:
                first.add(5, 'days')
                break
            case 4:
                first.add(4, 'days')
                break
            case 5:
                first.add(3, 'days')
                break
            case 6:
                first.add(2, 'days')
                break
            case 0:
                first.add(1, 'days')
        }

        if (monthStart.day() !== '1') {
            first = moment(first).subtract(1, 'week')
            while (first <= moment(first).endOf('week').day()) {
                for (let i = 0; i < 7; i++) {
                    formattedDate = first.format('D')
                    days.push(
                        <div className="calendar__day day">
                           {formattedDate}
                        </div>
                    )
                    first = first.add(1, 'days')
                }
            }
        }

        while (first <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = first.format('D')
                days.push(
                    <div className="calendar__day day">
                       {formattedDate}
                    </div>
                )
                first = first.add(1, 'days')
            }
            rows.push( <div className="calendar__week"> {days} </div>)
            days = []
        }

        return <div>{rows}</div>
    }

    return <>
    
    <main className="main"> 

        <div className="month">

            <div>{header()}</div>

            <div className="month__toolbar">
                <div className="month__toggle">
                  <div className="month__toggle-option" onClick={handleDay}>today</div>
                  <div className="month__toggle-option" onClick={handleWeek}>week</div>
                  <div className="month__toggle-option month__toggle-option--selected" onClick={handleMonth}>month</div>
                </div>
                <form>
                  <input className="month__search-input" type="text" placeholder="Search"/> <i className="fa fa-search"></i>
                </form>
            </div>

            <div className="month__act">
                <Chores />
                
                <div className="calendar">
                    <div>{week()}</div>
                    <div>{days()}</div>
                </div>                 

            </div>

        </div> 

    </main>
    </>
}

export default withRouter(Month)