import React from 'react';


 {/* {onePlayer.map(one => <li  key={one.id}> {one.name} <img src={"http://localhost:8080" + one.photo} /></li>)} */}
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

