import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

function Details(props) {

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

        } catch (error) {
            console.log(error.message)

        }
    }

    return (<>
        <h2>Details</h2>
        <p>Name: {cache.name}</p>
        <p>Description: {cache.name}</p>
        <p>Difficulty: {cache.difficulty}</p>
        <p>Terrain: {cache.terrain}</p>
        <p>Size: {cache.size}</p>
        <p>Hints: {cache.hints}</p>
        <p>Owner: {owner.username}</p>
        {logged || owned ? '' : (<form onSubmit={event => {
            event.preventDefault()
            handleLogCache(event.target.cacheId.value, event.target.comment.value)
            props.history.push('/')

        }}>
            <input type='hidden' name="cacheId" value={cache._id} />
            <textarea rows="4" cols="50" name='comment' />
            <button>Log</button>
        </form>)}
        <ul>Comments
        {comments.map((comment) => (
            <li key={comment._id}>
                <p>{comment.username}</p>
                <p>{comment.date}</p>
                <p>{comment.comment}</p>
            </li>
        ))}
        </ul>
    </>
    )
}

export default withRouter(Details)
