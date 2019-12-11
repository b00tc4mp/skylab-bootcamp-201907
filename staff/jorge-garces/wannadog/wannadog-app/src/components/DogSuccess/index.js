import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <section className="body">
        <section className="success-container">
            <h2>Dog added successfully</h2>
            <Link className="button__my-dogs button" to="/mydogs">go to my dogs</Link>
        </section>
    </section>
}