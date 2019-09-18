import React from 'react'

export default function ({ dog }) {

    const { id, name, breed, gender, image } = dog

    return <a className="links" href={`/#/dog/${id}`}>
        <section className="dog-showcase">
            <section className="dog-showcase__left">
                <img className="dog-showcase__img" src={image}></img>
            </section>
            <section className="dog-showcase__right">
                <h3>{name}</h3>
                <p className="">{breed}</p>
                <p className="">{gender}</p>
            </section>
        </section>
    </a>
}