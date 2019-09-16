import React, { useState } from 'react'


function PlayerResult({playerLineup}) {
    
    const {name, surname, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, photo, cost}  = playerLineup
   
 
    function addDefaultSrc(event) {
        
        event.target.src = 'http://localhost:8080/images/avatar.jpg'
        
    }
    
    return <div className="card">
        
          
                <img className="card__image" onError={addDefaultSrc} src={"http://localhost:8080" + photo} /> 
            
        
        <div className="card__content" >
            <p className="card__content__name">{name}</p>
            <p className="card__content__surname">{surname}</p>
            <p className="card__content__points">{totalPoints}</p>
           
        </div>

    </div>
}

export default PlayerResult

