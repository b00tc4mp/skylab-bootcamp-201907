import React, { useContext, useEffect, useState } from 'react'
// import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
// import logic from '../../logic'
import Header from '../Header'
import logic from '../../logic'

function User({ history }) {

    const { user } = useContext(MyContext)
    const [participant, setParticipant] = useState(undefined)

    useEffect(() => {
        async function participantsChats(user){
            const participants = logic.retrieveAllChats(user)    
            
        }
        participantsChats(user.id)

    }, [])


    return<> 
        <Header/>
            <main>
            <section>
                <ul>
                    <li>
                        <a>{participant.name}</a>

                    </li>
                </ul>
            </section>
            </main>
        </>
}