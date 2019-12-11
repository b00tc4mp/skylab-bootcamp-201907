import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import logo from '../../images/logo-dctm.png'

export default withRouter(function ({ history }) {
    
    const {user, setUser, voteRes, setVoteRes} = useContext(Context)

     useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [])

    const handleGoBack = (event) => {
        event.preventDefault()
        setVoteRes(undefined)

        history.push('landingtwo')
    }

    return <>
    <main className="mian-wrapper-managerpanel">
            <ul>
                <img className="logo-managerpanel" alt="logotipo" src={logo}/>
                <h2><li>Welcome to the manager Panel</li></h2>
                <p><li>Here you can view and manage all polls.</li></p>
                <li><a className="button" href="" onClick={handleGoBack} >Ok</a></li>
            </ul>
    </main>
    </>
})