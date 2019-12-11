import React, { useState, useEffect, useContext } from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../logic'

import './style.sass'

function UserBookmarks({history}){
    const [bookmarks, setBookmarks] = useState()
    
    useEffect( () => {
        async function retrieveBookmarks(){
            try{
                const _user = await logic.retrieveUser()
                setBookmarks(_user.bookmarks)
            }catch(error){
                console.log(error.message)
            }
        }
        retrieveBookmarks()
    } , [] )

    function handleDetail(postId){
        console.log(postId)
        history.push(`/post/${postId}`)
    }

    return <div>
        {bookmarks && bookmarks.length && bookmarks.map(item => <li className="mosaic-grid__list-item" key={item._id}>
            <a onClick={event => {
                event.preventDefault()
                handleDetail(item._id)
            }}>
                <div className="bookmarks__container">

                    <h3 className="mosaic-grid__title">{item.title}</h3>

                    <p className="mosaic-grid__preview--content">{item.body}</p>
                </div>
            </a>

        </li>) || <li className="mosaic-grid__list-item">
            <div className="mosaic-grid__container">
                <h3 className="mosaic-grid__preview--title">No tienes ningún marcador</h3>
                <p className="mosaic-grid__preview--content">Para agregar uno, presiona en el icono que se encuentra arriba a la derecha en cada post.</p>
            </div>
        </li>}                
    </div>
}

export default withRouter(UserBookmarks)