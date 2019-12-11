import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import { Route, withRouter } from 'react-router-dom'
import Fitnesslvl from '../FitnesslvlPanel'
import Goal from '../GoalPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'



export default withRouter(function ({ history }) {
    const [view, setView] = useState(undefined)

    const handleGoalGain = async () => {
        const gain = { goal: "gain" }
        try {
            await logic.updateUser(gain)
            setView('fitlvl')
            history.push('/fitnesslvl')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleGoalFit = async () => {
        const fit = { goal: "fit" }
        try {
            await logic.updateUser(fit)
            setView('fitlvl')
            history.push('/fitnesslvl')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleGoalLose = async () => {
        const lose = { goal: "lose" }
        try {
            await logic.updateUser(lose)
            setView('fitlvl')
            history.push('/fitnesslvl')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleBack = () => {
        setView('gender')
        history.push('/gender')
    }

    return <div className="goal-container">
        {view === 'gender' && <Route path="/gender" render={() => <Goal />} />}
        {view === 'fitlvl' && <Route path="/fitnesslvl" render={() => <Fitnesslvl />} />}
        <section className="section-goal">
            <p className="goal-text">What is your goal?</p>
        </section>

        <button className="gain-bttn" onClick={handleGoalGain}>Gain muscle</button>
        <button className="fit-bttn" onClick={handleGoalFit}>Get Fit</button>
        <button className="lose-bttn" onClick={handleGoalLose}>Lose weight</button>

        <FontAwesomeIcon className="icon-goal" icon={faArrowLeft} onClick={handleBack} />
    </div>
})