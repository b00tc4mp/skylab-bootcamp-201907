import React from 'react';

function PlayerResult({ player }) {

   
    const {name, surname, position, photo}  = player
    
    function addDefaultSrc(event) {
       
        event.target.src = 'http://localhost:8080/images/avatar.jpg'
          
    }

    function positionPlayer(number){
        switch(number){
            case 1: 
            return 'Goalkeeper'
            break;
            case 2:
            return 'Defender'
            break;
            case 2:
            return 'Midfielder'
            break;
            case 2:
            return 'Striker'
            break;
        }
    }
    return <div className="card-players"> 
   
        
            <img className="card-players__image" onError={addDefaultSrc} src={"http://localhost:8080" + photo} /> 
            
              <div className="card-players__content" >
            <p className="card-players__content__name">{name} {surname} </p>
            <p className="card-players__content__position">{positionPlayer(position)}</p>
        </div>

    </div>


}

export default PlayerResult



