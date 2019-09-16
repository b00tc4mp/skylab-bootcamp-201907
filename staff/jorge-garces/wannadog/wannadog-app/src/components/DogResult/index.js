import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(function DogResult({ dog }) {

    const { name, gender, id } = dog

    return <li className="results__li">
        <a href={`/#/dog/${id}`}><img className="results__img" src="/img/resultTest.jpg"></img></a>
        <h3 className="">{name}</h3>
        <p className="">{gender}</p>
    </li>
})