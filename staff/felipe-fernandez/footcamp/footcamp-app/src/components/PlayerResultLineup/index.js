import React from 'react';

function PlayerResult({playerLineup}) {

    const {name, surname, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, photo, cost}  = playerLineup
    
    function addDefaultSrc(event) {
        
        event.target.src = 'http://localhost:8080/images/avatar.jpg'
        
    }
    
    return <div className="card">
        <div className="card__image">
            <figure className="image">
                <img onError={addDefaultSrc} src={"http://localhost:8080" + photo} /> 
            </figure>
        </div>
        <div className="card__content" >
            <h3 className="card__content__name">{name}</h3>
            <p className="card__content__surname">{surname}</p>
           
        </div>

    </div>
}

export default PlayerResult

