import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import DogShowcase from '../DogShowcase'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const [myDogs, setMyDogs] = useState(undefined)


    useEffect(() => {
        async function asyncRetrieveMyDogs() {
            const myDogs = await logic.retrieveAllDogs()
            setMyDogs(myDogs)
        }

        asyncRetrieveMyDogs()

    }, [history.location])

    return <section className="body">
        {myDogs && <>
            <Link className="back" to="/profile"><i className="fas fa-arrow-left"></i></Link>
            <h2 className="container__title">My dogs</h2>
            <ul>
                {myDogs.map(dog => <DogShowcase dog={dog} />)}
            </ul>
        </>}

        <button className="button__add button" onClick={() => history.push('/add')}>ADD DOG</button >
    </section>
})