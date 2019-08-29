import React, { useState, useEffect } from 'react'
import logic from './logic'

export default function ({ query }) {
    const [ducks, setDucks] = useState()

    useEffect(() => {
        (async () => {
            const ducks = await logic.searchDucks(query)

            setDucks(ducks)
        })()
    }, [query])

    return <ul>
        {ducks && ducks.length && ducks.map(({id, title}) => <li><a href={`/#/ducks/${id}`}>{title}</a></li>)}
    </ul>
}