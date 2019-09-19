import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(function DogResult({ dog }) {

    let { name, gender, id, image } = dog
    gender === "male" ? gender = <i class="fas fa-mars"></i> : gender = <i class="fas fa-venus"></i>

    return <li className="results__li">
        <a href={`/#/dog/${id}`}><img alt="dog-face" className="results__img" src={image}></img></a>
        <h3 className="results__name">{name}<span>{gender}</span></h3>
    </li>
})