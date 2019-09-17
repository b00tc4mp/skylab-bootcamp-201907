import React from 'react';

function PlayerResultInitial({ player }) {

   
    const {name, surname,  photo}  = player
    
    function addDefaultSrc(event) {
       
        event.target.src = 'http://localhost:8080/images/avatar.jpg'
          
    }

    return <div className="card-initial"> 
   
            {/* <figure className="card-initial__image"> */}
            <img  className="card-initial__image" onError={addDefaultSrc} src={"http://localhost:8080" + photo} /> 
            {/* </figure> */}
              <div className="card-initial__content" >
            <p className="card-initial__content__name">{name} {surname} </p>
            
        </div>

    </div>


}

export default PlayerResultInitial


