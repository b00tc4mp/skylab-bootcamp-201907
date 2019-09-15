import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(function DogResult({ dog }) {

    const { name, gender, id } = dog

    return <ul>
        <li>
            <div className="card">
                <div className="card-content" >
                    <a href={`/#/dog/${id}`}>
                        <h3 className="">{name}</h3>
                    </a>
                    <p className="">{gender}</p>
                </div>
            </div>
        </li>
    </ul>
})