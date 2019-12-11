import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import Userdata from '../UserdataPanel'
import Goal from '../GoalPanel'
import { Route, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history }) {
    const [view, setView] = useState()

    const handleFitlvlLow = async () => {
        const low = { fitnesslevel: "low" }
        try {
            await logic.updateUser(low)
            setView('userdata')
            history.push('/userdata')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleFitlvlMid = async () => {
        const mid = { fitnesslevel: "mid" }
        try {
            await logic.updateUser(mid)
            setView('userdata')
            history.push('/userdata')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleFitlvlHigh = async () => {
        const high = { fitnesslevel: "high" }
        try {
            await logic.updateUser(high)
            setView('userdata')
            history.push('/userdata')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleBack = () => {
        setView('goal')
        history.push('/goal')
    }

    return <div className="container-fitlvl">
        {view === 'userdata' && <Route path="/userdata" render={() => <Userdata />} />}
        {view === 'goal' && <Route path="/goal" render={() => <Goal />} />}
        <section className="fitlvl-header">
            <h3 className="fitlvl-header">Now I need to know your strength level</h3>
        </section>
        <section className="section-fitlvl">
            <p className="question-fitlvl">How many Pull-ups can you do in a row?</p>
        </section>

        <button className="low-bttn t" onClick={handleFitlvlLow}>Less than 2</button>
        <button className="mid-bttn t" onClick={handleFitlvlMid}>Between 6 and 10</button>
        <button className="high-bttn t" onClick={handleFitlvlHigh}>More than 10</button>

        <FontAwesomeIcon className="icon-fitlvl" icon={faArrowLeft} onClick={handleBack} />
    </div>

})