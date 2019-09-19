import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <section className="body">
        <Link className="back" to="/profile"><i class="fas fa-arrow-left"></i></Link>
        <h2 className="container__title">About</h2>
        <section className="noresults"> <i class="noresults__sign fas fa-pencil-ruler"></i> <h3 className="noresults__text">Work in progress</h3>
        </section>
    </section>
}