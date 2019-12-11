import React, { useState } from 'react'
import './index.sass'
import logic from '../../logic'
import Goal from '../GoalPanel'
import { Route, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history, onBack }) {
    const [view, setView] = useState(undefined)


    const handleFemale = async () => {
        const female = { gender: "female" }
        try {
            await logic.updateUser(female)
            setView('goal')
            history.push('/goal')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }
    const handleMale = async () => {
        const male = { gender: "male" }
        try {
            await logic.updateUser(male)
            setView('goal')
            history.push('/goal')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }



    return <div className="gender-container">
        {view === 'goal' && <Route path="/goal" render={() => <Goal />} />}
        <section className="section">
            <h2 className="gender-text">Tell me a bit about you.</h2>
            <p className="question-gender">Are you a Man or a Woman?</p>
        </section>

        <button className="female-bttn" onClick={handleFemale}>Woman</button>

        <button className="male-bttn" onClick={handleMale}>Man</button>


        <div className="line-gender"></div>

        <FontAwesomeIcon className="icon-gender" icon={faArrowLeft} onClick={event => {
            event.preventDefault()
            onBack()
        }} />
    </div>

})