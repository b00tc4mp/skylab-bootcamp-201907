import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import logo from '../../images/logo-dctm.png'
import { withRouter } from 'react-router-dom'



export default withRouter(function ({ history, onLogout }) {

    const { user } = useContext(Context)

    const handleGoBack = (event) => {
        event.preventDefault()

        history.push('/landingtwo')
    }

    return <>
    <header>
        {<nav>
                {user && (user.participatedPolls.indexOf("pollId") > -1) ? <ul>
                        <li>{poll.imagePoll}</li>
                        <li>{poll.question}</li>
                        <li>{poll.description}</li>
                        <li>You have already voted.</li>
                        <li>{poll.optionA} {poll.positives}</li>
                        <li>{poll.optionB} {poll.negatives}</li>
                        <li><a href="" onClick={handleGoBack} >Back to Home</a></li>
                    </ul> : <ul>
                    <li>{poll.imagePoll}</li>
                        <li>{poll.question}</li>
                        <li>{poll.description}</li>
                        <li>Vote</li>
                        <li>{poll.optionA}</li>
                        <li>{poll.optionB}</li>
                        <li><a href="" onClick={handleGoBack} >Back to Home</a></li>
                </ul>}
                </nav>}
    </header>
    </>
})

// de aquí al componente Okvote