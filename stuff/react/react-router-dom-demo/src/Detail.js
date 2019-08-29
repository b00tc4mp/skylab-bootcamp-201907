import React, { useState, useEffect } from 'react'
import logic from './logic'

export default function ({ id }) {
    const [duck, setDuck] = useState()

    useEffect(() => {
        (async () => {
            const duck = await logic.retrieveDuck(id)

            setDuck(duck)
        })()
    }, [])

    return <section>
        {duck && <>
            <h2>{duck.title}</h2>
            <span>{duck.price}</span>
        </>}
    </section>
}