import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import Nav from "../Nav"
import Footer from "../Footer"

export default function ({ }) {
    const [favs, setFavs] = useState()
    let domain = window.location.hostname
    
    useEffect(() => {
        (async () => {
            const _favs = await logic.retrieveFavorites(domain)

            setFavs(_favs.favorites)

        })()
    }, [])

    return <>

    <Nav/>

    <section className="favorites">
        <h2 className="favorites__ini">Mis Favoritos</h2>
        <ul className="favorites__ul">
      
        {favs && favs.length && favs.map(item => <li className="favorites__li" key={item._id}>
                <a className="favorites__a" href={`/#/ads/${item._id}`}>
                    <img className="favorites__image" src={item.image}></img>
                    <div className="favorites__text">
                        <h2 className="favorites__title">{item.title}</h2>
                        <p className="favorites__price">{item.price}</p>
                    </div>
                </a>
        </li>)||<li className="favorites__none">No tienes ningun favorito. Seguro que encuentras muchas cosas para guardar aqui 😉</li>}
        
    </ul>

    </section>

    
    <Footer/>
    </>
}