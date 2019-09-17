import React, { useState, useEffect, useContext } from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Context from '../ProviderContext'
import UserPosts from '../UserPosts'
import UserBookmarks from '../UserBookmarks'

import './style.sass'

function UserProfile({history}){
    // const { view, setView } = useContext(Context)
    const [user, setUser] = useState()
    const [display, setDisplay] = useState(true)

    useEffect( () => {
        async function retrieveData(){
            try{
                const _user = await logic.retrieveUser()
                setUser(_user)
                // setView('profile')
            }catch(error){
                console.log(error.message)
            }
        }
        retrieveData()
    } , [] )

    function onToggleDisplay(){
        setDisplay(!display)
    }

    return <section className="profile" >
        {user && <div className="profile__avatar-container"> <img className="profile__avatar-img" src={user.avatar} /></div>}
        {user && <h1 className="profile__name">{user.nickname}</h1>}
        {user && <h3 className="profile__email">{user.email}</h3>}
        <div>
            <h2 className="profile__title">Estos son tus {display ? "posts" : "marcadores"}</h2>
            <button className="profile__bookmark-own" onClick={event => {
                event.stopPropagation()

                onToggleDisplay()
            }}>{display ? "Mis marcadores" : "Mis posts"}</button>
        </div>
        {display ? <UserPosts /> : <UserBookmarks />}
    </section>
}

export default withRouter(UserProfile)