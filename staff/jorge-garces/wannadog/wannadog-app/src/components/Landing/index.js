import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <>
        <section className="body-landing">
            <section className="body-landing__container">
                <Link className="button" to="/sign">LOGIN</Link>
                <Link className="button" to="/search">GUEST</Link>
                <h1>wannaDOG</h1>
            </section>
        </section>
    </>
}