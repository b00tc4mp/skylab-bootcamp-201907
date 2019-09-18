import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <section className="body">
        <section className="success-container">
            <h2>Dog added successfully</h2>
            <Link className="button" to="/mydogs">Go To My Dogs</Link>
        </section>
    </section>
}