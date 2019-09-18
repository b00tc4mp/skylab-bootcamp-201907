import React, { useState, useEffect, useContext } from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../logic'

import './style.sass'


function UserPost({history}){
    const [userPosts, setUserPosts] = useState()
    
    useEffect( () => {
        async function retrieveData(){
            try{
                //const _user = await logic.retrieveUser()
                const _posts = await logic.retrieveUserPosts()
                //setUser(_user)
                setUserPosts(_posts)
                //setView('profile')
            }catch(error){
                console.log(error.message)
            }
        }
        retrieveData()
    } , [] )

    function handleDetail(postId){
        console.log(postId)
        history.push(`/post/${postId}`)
    }

    return <div>
        {userPosts && userPosts.length && userPosts.map(item => <li className="mosaic-grid__list-item" key={item.id}>
            <div className="mosaic-grid__container">
                <a onClick={event => {
                    event.preventDefault()
                    handleDetail(item.id)
                }}><h3 className="mosaic-grid__title">{item.title}</h3></a>

                <p className="mosaic-grid__preview--content">{item.body}</p>

            </div>
        </li>)|| <li className="mosaic-grid__list-item">
            <div className="mosaic-grid__container">
                <h3 className="mosaic-grid__preview--title">Aún no has posteado nada en Vltra</h3>
                <p className="mosaic-grid__preview--content">Para publicar un nuevo post, <Link to="/create-post">puedes dirigirte a la zona de creación.</Link></p>
            </div>
        </li>}
    </div>
}

export default withRouter(UserPost)