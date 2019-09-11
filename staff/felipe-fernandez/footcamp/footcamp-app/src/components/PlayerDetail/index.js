function DuckDetail({ duck: { id, title, imageUrl, price, description, link, favorite }, onBack, onToggle }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <FavButton active={favorite} onToggle={() => onToggle(id)}/>
        <p>{description}</p>
        <a href={link}>Go to store</a>
        {onBack && <a href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </>
}


import React from 'react';

function PlayerResult({ player }) {

    const {name, surname, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, photo, cost}  = player
    
    return <div class="card">
        <div class="card-image">
            <figure class="image is-4by4">
                <img src={"http://localhost:8080" + photo} width="300px"/> 
            </figure>
        </div>
        <div class="card-content" >
            <h3 class="title is-4">{name}</h3>
            <p class="subtitle is-6">{surname}</p>
            <p class="subtitle is-6">{position}</p>
        </div>

    </div>
}

export default PlayerResult

