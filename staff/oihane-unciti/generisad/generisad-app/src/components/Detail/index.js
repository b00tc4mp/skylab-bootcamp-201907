import React, { useState, useEffect } from 'react'
import Nav from "../Nav"
import Footer from "../Footer"
import logic from '../../logic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { withRouter, Link } from 'react-router-dom'

function Detail({ history, id }) {
    const [ad, setAd] = useState()
    const [favorites, setFavorites] = useState()
    const [error, setError] = useState()

    let domain = window.location.hostname;

    async function handleFav() {
        if (!logic.isUserLoggedIn()) {
            history.push('/auth')
        } else {
            try {
                
                const favs = await logic.retrieveFavorites(domain)

                const fav = favs.favorites.find( ({ _id }) => _id === id )
                await logic.favorite(id)

                if(fav){
                    setFavorites(null)
                }else{
                    setFavorites(id)
                }

            } catch (error) {
                console.log(error.message)

            }
        }
    }

    useEffect(() => {
        (async () => {

            try {
                const _ad = await logic.detail(id)
                setAd(_ad)
                const favs = await logic.retrieveFavorites(domain)
                const fav = favs.favorites.find( ({ _id }) => _id === id )

                if(fav){
                    setFavorites(fav._id)
                }else{
                    setFavorites(null)
                }
                
            } catch (error) {
                setError("No esta disponible este anuncio")
            }
        })()
    }, [])



    return <>

        <Nav/>
    
    
    <section className= "detail">
        {ad && <>
            
             <div className= "detail__mosaic">
                    <div className= "detail__fav" >
                        <button className = "heart" onClick ={() => history.go(-1)}><FontAwesomeIcon icon={faArrowLeft} size="2x" color="gray"/> </button>
                        
                        {favorites ?
                            <button className = "heart" onClick={() => handleFav(ad._id)}><FontAwesomeIcon icon={faHeart} size="3x" color="#ec2c2c"
                            transform="left-1 rotate-15"/></button>
                            :
                            <button className = "heart" onClick={() => handleFav(ad._id)}><FontAwesomeIcon icon={faHeart} size="3x" color="gray"/></button>
                            }
                    </div>
                <img  className= "detail__image" src={ad.image}></img>
            </div>   
           
            <div className= "detail__text" >
                <h2  className= "detail__price">{ad.price}</h2>
                <h2  className= "detail__title">{ad.title}</h2>
                
                <hr/>
                
                <p  className= "detail__description">{ad.description}</p>
                <p className= "detail__location">{ad.location}</p>
            </div>
           
                <button className= "detail__button">
                    <Link className= "detail__button--decoration" to={`/send/${id}`} ><FontAwesomeIcon icon={faPaperPlane} size="50px" color="gray"/> Contacta con el vendedor</Link>
                </button>

        </>}
    </section>

    <Footer/>

        
</>
}

export default withRouter(Detail)