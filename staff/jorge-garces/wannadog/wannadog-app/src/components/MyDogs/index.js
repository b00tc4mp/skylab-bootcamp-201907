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

    return <>

        {myDogs && <>
            <Link to="/profile">Go Back</Link>
            <h3>My Dogs</h3>
            <ul>
                {myDogs.map(dog => <DogShowcase dog={dog} />)}
            </ul>
        </>}

        <button onClick={() => history.push('/add')}>ADD DOG</button >
    </>
})