import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

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
        <ul>
            <li><p>Name: {cache.name}</p></li>
            <li><p>Description: {cache.name}</p></li>
            <li><p>Difficulty: {cache.difficulty}</p></li>
            <li><p>Terrain: {cache.terrain}</p></li>
            <li><p>Size: {cache.size}</p></li>
            <li><p>Hints: {cache.hints}</p></li>
            <li><p>Owner: {owner.username}</p></li>
            {logged || owned ? '' : (<form onSubmit={event => {
                event.preventDefault()
                handleLogCache(event.target.cacheId.value, event.target.comment.value)
                props.history.push('/')

            }}>
                <input type='hidden' name="cacheId" value={cache._id} />
                <textarea rows="4" cols="50" name='comment' />
                <button>Log</button>
            </form>)}
        </ul>
        <ul>Comments
        {comments.map((comment, key) => (
            <li key={key}>
                <ul>
                    <li><p>{comment.username}</p></li>
                    <li><p>{moment(comment.date).format("DD/MM/YYYY")}</p></li>
                    <li><p>{comment.comment}</p></li>
                </ul>
            </li>
        ))}
        </ul>
    </>
    )
}

export default withRouter(Details)
