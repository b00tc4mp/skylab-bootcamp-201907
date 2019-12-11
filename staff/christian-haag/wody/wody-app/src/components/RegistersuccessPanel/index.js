import React, { useState } from 'react'
import './index.sass'
import Login from '../LoginPanel'
import { Route, withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const [view, setView] = useState(undefined)

    const handleSignIn = (event) => {
        event.preventDefault()
        setView('')
        history.push('/login')
    }

    return <div>
        <Route path='/login' render={() => <Login />} />
        <div className="regisuccess-container">
            <h2 className="regi-suc-h2">Registration succeed!</h2>
            <p className="regis-suc-p">Please sign in to generate your profile.<a className="regi-suc-a" onClick={handleSignIn}>Sign In</a></p>
        </div>
    </div>

})