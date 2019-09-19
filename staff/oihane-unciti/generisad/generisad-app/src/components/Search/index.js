import React, { useState, useEffect } from 'react'
import Nav from "../Nav"
import logic from '../../logic'
import Footer from "../Footer"
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



function Search ({history}) {
    const [search, setSearch] = useState()
    let domain = window.location.hostname;


    useEffect(() => {
            (async () => {
                try{

                    let domain = window.location.hostname;

                    //TODO this is not efficient, find a better way
                    let shuffle = (array) => array.sort(() => Math.random() - 0.5);

                    let _search = await logic.retrieveAllAd(domain)
                    if(_search){
                        shuffle(_search)
                        if(_search.length > 20){
                            _search = _search.slice(0,20)
                        }
                    }
                   
                    setSearch(_search)

                }catch(error){
                    console.log(error.message)
                }
            
            })()
        }, [])


    return <>
    
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


        <section>
                <ul className="ad__ul">
                        {/* {ads && ads.length && ads.map(({_id, image, title, desciption, location}) => <li key={_id}><a href={`/#/ads/${_id}`}>{image, title, desciption, location}</a></li>)} */}
                        {search && search.length ? search.map(item => <li  className ="ad" key={item._id}>
                            <a className="ad__a" href={`/#/ads/${item._id}`}>
                                <img class="ad__img" src={item.image}></img>
                                <div class="search__container">
                                    <p class="ad__title">{item.title}</p> 
                                    <p class="ad__price">{item.price}</p>
                                </div>
                            </a>
                        </li>): <p className="ad__none">No hay resultados</p>}
                </ul>
        </section>
        
 
    

    {/* <Footer/> */}

    </>
}
export default withRouter(Search)