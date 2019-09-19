import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import MainCard from './MainCard'
import FeedbackMini from '../FeedbackMini'

import './style.sass'
import 'font-awesome/css/font-awesome.min.css'
import retrievePost from '../../logic/retrieve-post'

function Main({ history }) {
    const [posts, setPosts] = useState()
    const [user, setUser] = useState()
    const [freshRankDisplay, setFreshRankDisplay] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                await retrievePosts()
                await retrieveUser()
            } catch (error) {
                console.log(error.message)
            }

        })()
    }, [])

    async function retrieveUser() {
        const _user = await logic.retrieveUser()
        setUser(_user)
    }

    async function retrievePosts() {
        const _posts = await logic.retrieveAllPosts()
        setPosts(_posts)
    }

    async function retrieveRanking() {
        const _posts = await logic.retrieveRanking()
        setPosts(_posts)
    }

    function onRankDisplay(){
        retrieveRanking()
        setFreshRankDisplay(!freshRankDisplay)
    }

    function onFreshDisplay(){
        retrievePosts()
        setFreshRankDisplay(!freshRankDisplay)
    }

    return <main className="mosaic-grid">
        <div className="mosaic-grid__sticky-section">
            <h2 className="mosaic-grid__sticky-section--title">{freshRankDisplay ? "Contenido nuevo" : "Más votados"} en Vltra</h2>
            {!freshRankDisplay ? <button className="mosaic-grid__sticky-section__button" onClick={event => {
                event.stopPropagation()

                onFreshDisplay()
            }}>Contenido nuevo</button> :
            <button className="mosaic-grid__sticky-section__button" onClick={event => {
                event.stopPropagation()

                onRankDisplay()
            }}>Más votados</button>}
        </div>
        <ul>
            { posts && posts.length && posts.map(item => <MainCard key={item.id} item={item} user={user} refreshUser={retrieveUser} refreshPosts={retrievePosts}/>)}
        </ul>
    </main>
}

export default withRouter(Main)