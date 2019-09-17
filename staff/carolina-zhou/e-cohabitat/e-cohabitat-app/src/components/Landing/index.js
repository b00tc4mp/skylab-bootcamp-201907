import React from 'react'
import { withRouter } from 'react-router-dom'

function Landing ({ history }) {
    
    function handleGoToRegister(event) {
        event.preventDefault()

        history.push(`/sign-up`)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        history.push(`/sign-in`)
    }

    return <>

        <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" className="main__logo"/>

        <h1 className="main__title"><span className="main__e">e-</span>cohabitat</h1>
        <h2 className="main__subtitle">Sharing spaces, building communities</h2>

        <nav className="main__mobile-menu">
            <ul>
                <li className="main__item"><a className="main__link" href="#" title="Sign up" onClick={handleGoToRegister}>Sign up</a></li>
                <li className="main__item"><a className="main__link" href="#" title="Sign in" onClick={handleGoToLogin}>Sign in</a></li>
            </ul>
        </nav>

    </>
}

export default withRouter(Landing)