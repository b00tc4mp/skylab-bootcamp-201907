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

    return <section className="body">
        <Link className="back" to="/profile"><i class="fas fa-arrow-left"></i></Link>
        <h2 className="container__title">Favorites</h2>
        {favorites && favorites.length === 0 && <section className="noresults"> <i className="noresults__sign fas fa-heart-broken"></i><h3 className="noresults__text">No favorites yet</h3></section>}

        {favorites && <>
            <ul>
                {favorites.map(dog => <DogShowcase dog={dog} />)}
            </ul>
        </>}
    </section>
})

