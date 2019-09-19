import React, { useState } from 'react'
import logic from '../../logic'
import './index.sass'
import { Route, withRouter } from 'react-router-dom'
import Home from '../Home'
import Fitnesslvl from '../FitnesslvlPanel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history, onBack }) {
    const [view, setView] = useState(undefined)

    const onFirstDataUpdate = async (bday, weight, height) => {
        const data = { birthday: bday, weight: weight, height: height }
        try {
            await logic.updateUser(data)
            setView('home')
            history.push('/home')

        } catch ({ message }) {
            console.log('fail update', message)
        }
    }

    const handleBack = () => {
        setView('fitlvl')
        history.push('/fitnesslvl')
    }

    return <div className="userdata-container">
        {view === 'home' && <Route path="/home" render={() => <Home />} />}
        {view === 'fitlvl' && <Route path="/fitlvl" render={() => <Fitnesslvl />} />}
        <div className="userdata-container__mid-wrapper">
            <p className="userdata-container__mid-wrapper--text" >I need some basic data to offer you the best training</p>
            <form className="userdata" onSubmit={event => {
                event.preventDefault()

                const { target: { bday: { value: bday }, weight: { value: weight }, height: { value: height } } } = event

                onFirstDataUpdate(bday, weight, height)


            }}>
                <label className="userdata__label" htmlFor="bday">Birthday</label>
                <input className="userdata__input" id="bday" type="date" name="bday" min="1950-01-02" />
                <label className="userdata__label" htmlFor="weight">Weight</label>
                <input className="userdata__input" id="weight" type="number" name="weight" min="45" max="250" />
                <label className="userdata__label" htmlFor="height">Height</label>
                <input className="userdata__input" id="height" type="numeric" name="height" />


                <button className="generate-bttn">Generate Profile</button>
            </form>
            <FontAwesomeIcon className="icon-userdata" icon={faArrowLeft} onClick={handleBack} />
        </div>
    </div>
})