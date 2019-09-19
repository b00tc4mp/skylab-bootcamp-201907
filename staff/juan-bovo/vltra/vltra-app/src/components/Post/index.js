import React, {useState, useEffect} from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import FeedbackMini from '../FeedbackMini'

import './style.sass'

function Post({history, postId}){
    const [postDetails, setPostDetails] = useState()
    const [error, setError] = useState()
    const [user, setUser] = useState()
    
    useEffect(() => {
        (async () => {
            try{
                
                const _postDetails = await logic.retrievePost(postId)
                setPostDetails(_postDetails)
                const _user = await logic.retrieveUser()
                setUser(_user)
            }catch(error){
                console.log(error.message)
            }
        
        })()
    }, [])

    function handleVote(postId, userVote){
        if(user){
            (async () => {
                try{
                    const response = await logic.votePost(postId, userVote)
                    retrievePost()
                    console.log(response)
                }catch(error){
                    setError(error.message)
                    console.log(error.message)
                }
            })()
        }
        else{
            history.push('/login')
        }
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
    }

    function handleBookmark(postId){
        if(user){
            (async () => {
                try{
                    const response = await logic.toggleBookmark(postId)
                    retrieveUser()
                    console.log(response.message)
                }catch(error){
                    console.log(error.message)
                }
            })()
        }
        else{
            history.push('/login')
        }
    }

    function isBookmarkToggled(bookmarkId) {
        if(!user) return false
        return user.bookmarks.find(bookmark => bookmark._id === bookmarkId)
    }

    async function retrieveUser() {
        const _user = await logic.retrieveUser()
        setUser(_user)
    }

    async function retrievePost() {
        const _postDetails = await logic.retrievePost(postId)
        setPostDetails(_postDetails)
    }

    function handleGoBack(history){
        history.go(-1)
    }

    return <section className="post-detail">
        {postDetails && <>
            <h1 className="post-detail__title">{postDetails.title}</h1>
            <button className="post-detail__bookmark-button" onClick={() => handleBookmark(postDetails.id)}>
                {isBookmarkToggled(postDetails.id) ?
                    <i className="fas fa-bookmark"></i>
                    :
                    <i className="far fa-bookmark"></i>}
            </button>

            <div className="post-detail__container">
                <p className="post-detail__content-date">Posteado por: <span className="post-detail__content-author"> {postDetails.author.nickname} </span></p>
                <div className="post-detail__view">
                    <p className="post-detail__content">{postDetails.body}</p>
                    {/* <p className="post-detail__content-date">Publicado en {postDetails.date}</p> */}
                </div>
                <span className="post-detail__rank">
                    <p>Puntos:</p>
                    {generateStars(postDetails)}
                </span>
                {error && <FeedbackMini message={error} />}
                <a className="post-detail__on-back" href="#" onClick={event => {
                    event.preventDefault()
                    handleGoBack(history)
                }}> Volver </a>
            </div>

        </>}
    </section>
}

export default withRouter(Post)