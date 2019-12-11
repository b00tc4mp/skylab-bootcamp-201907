import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import Listpolls from '../Listpolls'
import logo from '../../images/logo-dctm.png'

export default withRouter(function ({ history }) {
    
    const {user, setUser} = useContext(Context)

     useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [])

    const handleGoBack = (event) => {
        event.preventDefault()

        history.push('/landingtwo')
    }

    return <>
    <main className="okcomponent">
            <Navbar />
            <div className="okcontainer">
                <h2 className="oktitle">Thank you for your collaboration!</h2>
                <p className="oktext">We will be consider your proposal.</p></div>
                <div className="responses"><a className="button-poll" href="" onClick={handleGoBack} >OK</a>
                </div>
    </main>
    </>
})