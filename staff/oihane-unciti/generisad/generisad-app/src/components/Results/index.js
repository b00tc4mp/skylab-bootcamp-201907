import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Nav from "../Nav"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Results ({ history }) {
    const [ads, setAds] = useState([])


    useEffect(() => {
        async function search() {
            try{

                let domain = window.location.hostname;
                const { query } = queryString.parse(history.location.search)
                
    
                const _ads = await logic.search(query, domain)
                
                setAds(_ads)
            }
            catch(error){
                setAds([])
            }
        }
        search()
    }, [history.location])

    return <>
        <main>
        <Nav />
    <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query }}} = event

        history.push(`/search?query=${query}`)
    }}>
        <section class="search">
                    <div class="search__banner">
                        <input className ="search__input" type="search" name="query" placeholder="¿Qué necesitas?"/>
                        <button className ="search__button"><FontAwesomeIcon icon={faSearch} size="50px" color="gray"/></button>
                    </div>
                </section>

    </form>
            <ul className="ad__ul" >
                {/* {ads && ads.length && ads.map(({_id, image, title, desciption, location}) => <li key={_id}><a href={`/#/ads/${_id}`}>{image, title, desciption, location}</a></li>)} */}
                {ads.length ? ads.map(item => <li  className ="ad" key={item._id}>
                    <a className="ad__a" href={`/#/ads/${item._id}`}>
                        <img class="ad__img" src={item.image}></img>
                        <div class="search__container">
                            <p class="ad__title">{item.title}</p> 
                            <p class="ad__price">{item.price}</p>
                        </div>
                    </a>
                </li>): <p className="ad__none">No hay resultados</p>}
            </ul>
        </main>
       
    </>
}

export default withRouter(Results)