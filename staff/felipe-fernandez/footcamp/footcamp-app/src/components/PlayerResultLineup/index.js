import React from 'react';

function PlayerResult({playerLineup}) {

    const {name, surname, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, photo, cost}  = playerLineup
    
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

