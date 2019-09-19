import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <section className="body">
        <section className="success-container">
            <h2 className="success-container__register">Successfully Registered</h2>
            <Link className="button" to="/sign">Go To Sign-in</Link>
        </section>
    </section>
}