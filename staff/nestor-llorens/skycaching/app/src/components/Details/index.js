import React, { useEffect, useState } from 'react'
import logic from '../../logic'

function Details(props) {

    const [cache, setCache] = useState({})

    useEffect(() => {
        (async function () {
            const cache = await logic.retrieveCache(props.match.params.id)
            setCache(cache)
        }
        )()
    },[])

    return (<>
        <h2>Details</h2>
        <p>Name: {cache.name}</p>
        <p>Description: {cache.name}</p>
        <p>Difficulty: {cache.difficulty}</p>
        <p>Terrain: {cache.terrain}</p>
        <p>Size: {cache.size}</p>
        <p>Hints: {cache.hints}</p>
    </>
    )
}

export default Details