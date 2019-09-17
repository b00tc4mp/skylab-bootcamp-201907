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
    const [error, setError] = useState(undefined)

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

    return <main className="mosaic-grid">
        <h2>Contenido fresco en Vltra</h2>
        {/* Acá iría un compo para cambiar de vista */}
        <ul>
            {user && posts && posts.posts.length && posts.posts.map(item => <MainCard item={item} user={user} refreshUser={retrieveUser} refreshPosts={retrievePosts}/>)}
        </ul>
    </main>
}

export default withRouter(Main)