import React, {useState, useEffect} from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import FeedbackMini from '../FeedbackMini'

import './style.sass'

function Post({history, postId}){
    const [postDetails, setPostDetails] = useState()
    // const [bookmark, setBookmark] = useState()
    const [error, setError] = useState()
    
    useEffect(() => {
        (async () => {
            try{
                
                const _postDetails = await logic.retrievePost(postId)
                
                setPostDetails(_postDetails)
            }catch(error){
                console.log(error.message)
            }
        
        })()
    }, [])

    function handleVote(postId, userVote){
        (async () => {
            try{
                const response = await logic.votePost(postId, userVote)
                console.log(response)

                const _postDetails = await logic.retrievePost(postId)
                
                setPostDetails(_postDetails)
                // Algo que me permita recargar la página!!
            }catch(error){
                setError(error.message)
                console.log(error.message)
            }
        })()
    }

    function handleBookmark(postId){
        (async () => {
            try{
                const response = await logic.toggleBookmark(postId)
                console.log(response.message)
            }catch(error){
                console.log(error.message)
            }
        })()
    }

    function handleGoBack(history){
        history.go(-1)
    }

    return <section className="post-detail">
        {postDetails&&<>
        <h1 className="mosaic-grid__title">{postDetails.title}</h1>
        
                <div className="mosaic-grid__container">
                    <button className="mosaic-grid__bookmark-button" onClick={()=>handleBookmark(postDetails.id)}><i className="far fa-bookmark"></i></button>
                    <div className="mosaic-grid__view">
                        <p className="mosaic-grid__view--content">Posteado por: {postDetails.author.name}</p>
                        <p className="mosaic-grid__view--content">{postDetails.body}</p>
                        <p className="colorrojo">{postDetails.votes}</p>
                        <span className="mosaic-grid__rank">
                            Puntos: <i className="fas fa-star" onClick={()=> handleVote(postDetails.id, 1)}></i>
                            <i className="fas fa-star" onClick={()=> handleVote(postDetails.id, 2)}></i>
                            <i className="fas fa-star" onClick={()=> handleVote(postDetails.id, 3)}></i>
                            <i className="fas fa-star" onClick={()=> handleVote(postDetails.id, 4)}></i>
                            <i className="far fa-star" onClick={()=> handleVote(postDetails.id, 5)}></i>
                        </span>
                        <p>Publicado en {postDetails.date}</p>
                    </div>
                </div>
                {error && <FeedbackMini message={error} />}
            <a href="#" onClick={event => {
                event.preventDefault()
                handleGoBack(history)
            }}> Atrás </a>
            
        </>}
    </section>
}

export default withRouter(Post)