import React from 'react'

export default function ({ dog }) {

    const { id, name, breed, gender } = dog
    return <div className="card">
        <div className="card-content" >
            <h3><a href={`/#/dog/${id}`}>{name}</a></h3>
            <p className="">{breed}</p>
            <p className="">{gender}</p>
        </div>
    </div>
}