import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import DogShowcase from '../DogShowcase'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const [favorites, setFavorites] = useState(undefined)


    useEffect(() => {
        async function asyncRetrieveFavorites() {
            const favorites = await logic.retrieveFavorites()
            setFavorites(favorites)
        }

        asyncRetrieveFavorites()

    }, [history.location])

    return <>

        {favorites && <>
            <Link to="/profile">Go Back</Link>
            <h3>Favorites</h3>
            <ul>
                {favorites.map(dog => <DogShowcase dog={dog} />)}
            </ul>
        </>}
    </>
})

