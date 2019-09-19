import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
//import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
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
    <main className="home">
            <Navbar />
            <ul>
                <li><img alt="logotipo" src={logo}/></li>
                <li>Poll successfully updated</li>
                <li><a href="" onClick={handleGoBack} >Ok</a></li>
            </ul>
    </main>
    </>
})