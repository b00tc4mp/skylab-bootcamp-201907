import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import logic from '../../../logic'
import FeedbackMini from '../../FeedbackMini'

import './../style.sass'
import 'font-awesome/css/font-awesome.min.css'

function MainCard({ item, refreshUser, refreshPosts, user, history }) {
    const [error, setError] = useState(undefined)

    function handleVote(postId, userVote) {
        if(user){
            (async () => {
                try {
                    const response = await logic.votePost(postId, userVote)
                    await refreshPosts()
                    console.log(response.message)
                } catch (error) {
                    setError(error.message)
                    console.log(error.message)
                }
            })()
        }
        else{history.push('/login')}
    }

    function handleBookmark(postId) {
        if(user){
            (async () => {
                try {
                    const response = await logic.toggleBookmark(postId)
                    await refreshUser(refreshPosts)
                    console.log(response.message)
                } catch (error) {
                    console.log(error.message)
                }
            })()
        }
        else{history.push('/login')}
    }

    function handleDetail(postId) {
        console.log(postId)
        history.push(`/post/${postId}`)
    }

    function isBookmarkToggled(bookmarkId) {
        if(!user) return false  
        return user.bookmarks.find(bookmark => bookmark._id === bookmarkId)
    }

    function generateStars(post) {
        const { votes, id } = post
        const stars = []
        let rate = 0
        if (votes.length) {
            const totalvotes = votes.reduce((accum, current) => accum + current)
            rate = Math.floor(totalvotes / votes.length)
        }
        for (let i = 0; i < 5; i++) {
            if (rate) {
                --rate
                stars.push(<i key={i} className="fas fa-star" onClick={() => handleVote(id, i+1)}></i>)
            } else {
                stars.push(<i key={i} className="far fa-star" onClick={() => handleVote(id, i+1)}></i>)
            }
        }
        return stars


        {/* <i className="fas fa-star" onClick={() => handleVote(item.id, 1)}></i>
        <i className="fas fa-star" onClick={() => handleVote(item.id, 2)}></i>
        <i className="fas fa-star" onClick={() => handleVote(item.id, 4)}></i>
        <i className="fas fa-star" onClick={() => handleVote(item.id, 3)}></i>
        <i className="far fa-star" onClick={() => handleVote(item.id, 5)}></i> */}
    }


    return <li className="mosaic-grid__list-item" key={item.id}>
        <div className="mosaic-grid__container">
            <a onClick={event => {
                event.preventDefault()
                handleDetail(item.id)
            }}><h3 className="mosaic-grid__title">{item.title}</h3></a>
            <button className="mosaic-grid__bookmark-button" onClick={() => handleBookmark(item.id)}>
                {isBookmarkToggled(item.id) ?
                    <i className="fas fa-bookmark"></i>
                    :
                    <i className="far fa-bookmark"></i>}
            </button>
            {error && <FeedbackMini message={error} />}
            <div className="mosaic-grid__preview">
                <p className="mosaic-grid__preview--content">{item.body}</p>
                <p className="colorrojo">{item.votes}</p>
                <span className="mosaic-grid__rank">
                    <p>Puntos: </p>
                    {generateStars(item)}
                </span>
                <a href="#" className="mosaic-grid__read-more" onClick={event => {
                    event.preventDefault()
                    handleDetail(item.id)
                }}>Leer +</a>
            </div>
        </div>
    </li>
}

export default withRouter(MainCard)