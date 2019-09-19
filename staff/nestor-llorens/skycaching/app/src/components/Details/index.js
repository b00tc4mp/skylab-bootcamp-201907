import React, { useEffect, useState } from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

function Details(props) {

    const [error, setError] = useState()
    const [cache, setCache] = useState({})
    const [comments, setComments] = useState([])
    const [logged, setLogged] = useState(false)
    const [owned, setOwned] = useState(false)
    const [user, setUser] = useState({})
    const [owner, setOwner] = useState({})
    
    useEffect(() => {
        (async function () {
            const cache = await logic.retrieveCache(props.match.params.id)
            setCache(cache)
            const comments = cache.comments
            setComments(comments)
            const user = await logic.retrieveUser()
            setUser(user)
            if (cache.owner === user.id)
                setOwned(true)
            const logged = comments.some(comment => comment.username === user.username)
            if (logged) setLogged(true)
            const owner = await logic.retrieveUserById(cache.owner)
            setOwner(owner)
        }
        )()
    }, [])


    const handleLogCache = async (cacheId, comment) => {

        try {
            await logic.logCache(cacheId, comment)
            props.history.goBack()

        } catch ({message}) {
            setError(message)

        }
    }

    return (<>
        <main className='details'>
            <ul className='details__list'>
                <li className='details__list-item'><p className='details__list-p'>Name: {cache.name}</p></li>
                <li className='details__list-item'><p className='details__list-p'>Description: {cache.name}</p></li>
                <li className='details__list-item'><p className='details__list-p'>Difficulty: {cache.difficulty}</p></li>
                <li className='details__list-item'><p className='details__list-p'>Terrain: {cache.terrain}</p></li>
                <li className='details__list-item'><p className='details__list-p'>Size: {cache.size}</p></li>
                <li className='details__list-item'><p className='details__list-p'>Hints: {cache.hints}</p></li>
                <li className='details__list-item'><p className='details__list-p'>Owner: {owner.username}</p></li>
                {logged || owned ? '' : (<form classname = 'details__form' onSubmit={event => {
                    event.preventDefault()
                    handleLogCache(event.target.cacheId.value, event.target.comment.value)
                    props.history.goBack()

                }}>
                    <input type='hidden' name="cacheId" value={cache._id} />
                    <textarea rows="4" cols="39" name='comment' placeholder='Write a comment to be able to log the cache...' />
                    {error && <Feedback message={error}/>}
                    <button className='details__comment-button'>Log cache</button>
                </form>)}
            </ul>
        {comments.length > 0 && <h3 className= "details__comment-title">Comments</h3>}
            <ul>
        {comments.map((comment, key) => (
                <li className='details__comment' key={key}>
                    <ul className='details__comment-list'>
                        <li className='details__comment-item'><p className='details__comment-p'>{comment.username}</p></li>
                        <li className='details__comment-item'><p className='details__comment-p'>{moment(comment.date).format("DD/MM/YYYY")}</p></li>
                        <br/>
                        <li className='details__comment-item'><p className='details__comment-p'>{comment.comment}</p></li>
                    </ul>
                </li>
            ))}
            </ul>
        </main>
    </>
    )
}

export default withRouter(Details)
