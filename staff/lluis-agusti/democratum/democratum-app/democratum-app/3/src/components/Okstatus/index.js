import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'

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
    <main className="okcomponent">
            <Navbar />
            <div className="okcontainer">
                <h2 className="oktitle">Status updated!</h2>
                <p className="oktext">Poll status has been changed succesfully.</p></div>
                <div className="responses"><a className="button-poll" href="" onClick={handleGoBack} >OK</a>
            </div>
    </main>
    </>
})