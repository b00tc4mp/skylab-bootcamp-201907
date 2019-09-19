import React, { useState } from 'react'
import './index.sass'
import Home from '../Home'
import { Route, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history }) {
    const [view, setView] = useState(undefined)


    const handleBack = () => {
        setView('home')
        history.push('./home')
    }

    return <div className="settings">
        {view === 'home' && <Route path="/home" render={() => <Home />} />}
        <section className="settings__container">
            <p>Sorry, we are</p>
            <h3>currently under construction</h3>
        </section>
        <FontAwesomeIcon className="icon-settings" icon={faArrowLeft} onClick={handleBack} />
    </div>

})