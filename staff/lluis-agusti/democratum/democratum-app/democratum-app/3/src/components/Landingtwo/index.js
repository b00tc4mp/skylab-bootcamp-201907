import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import Navbarmanager from '../Navbarmanager'


export default withRouter(function ({ history, onLogout }) {
    
     useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [])

    const {user, setUser} = useContext(Context)

    return <>
    {<main><>
            <Navbar />
            {user && user.userRole !== "admin" ? <div className="landingthree">
                <p className="landingbutton"><a className="button-poll" href="#" onClick={event => {
            event.preventDefault()

            history.push('/home')
        }}>PARTICIPATE</a></p>
                <p className="landingbutton"><a className="button-poll" href="#" onClick={event => {
            event.preventDefault()

            history.push('/newpoll')
        }}>PROPOSE YOURS</a></p>
            </div> :  <div>
                    <div><Navbarmanager/></div>
                    <div className="imagecontainer">
                        <img className="imagepromo2" src="https://www.democratum.com/skylab/experience-dctm.png"/>
                    </div>
                </div>}
            </>
        </main>}
        </>
})