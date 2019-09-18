import React, { useEffect } from 'react'
// import './index.sass'
import logic from '../../logic'
import MapHome from '../MapHome'
import { withRouter } from 'react-router-dom'

function Home ({ history, setUser}) {

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [history.location])

    return (
    <main className="home">
        <section classname='home__map'><MapHome/></section>
    </main>
    )
}

export default withRouter(Home)