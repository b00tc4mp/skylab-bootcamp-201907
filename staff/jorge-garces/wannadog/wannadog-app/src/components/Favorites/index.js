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

        {favorites && <section className="body">
            <Link className="back" to="/profile"><i class="fas fa-arrow-left"></i></Link>
            <h2 className="container__title">Favorites</h2>
            <ul>
                {favorites.map(dog => <DogShowcase dog={dog} />)}
            </ul>
        </section>}
    </>
})

