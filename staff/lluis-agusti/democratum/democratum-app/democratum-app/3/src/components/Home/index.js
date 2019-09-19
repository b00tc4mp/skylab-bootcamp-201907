import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import Listpolls from '../Listpolls'

export default withRouter(function ({ history, onLogout }) {
    
    const {user, setUser} = useContext(Context)

     useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [])

    return <main className="home">
            <Navbar />
            <Listpolls />
        </main>
})