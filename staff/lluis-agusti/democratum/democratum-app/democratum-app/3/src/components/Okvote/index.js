import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import Listpolls from '../Listpolls'
import listPollsForUser from '../../logic/list-polls-for-user'

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
                <h2 className="oktitle">Thank you for your vote!</h2>
                <p className="oktext">Your vote has been registered successfully.</p></div>
                <div className="responses"><a className="button-poll" href="" onClick={handleGoBack} >OK</a>
                {voteRes && <p className="results1"><b>Positive votes: {voteRes.positives}</b></p>}
                {voteRes && <p className="results2"><b>Negative votes: {voteRes.negatives}</b></p>}
                </div>
    </main>
    </>
})