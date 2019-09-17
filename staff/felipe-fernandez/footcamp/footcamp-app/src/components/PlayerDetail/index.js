import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'

 function PlayerDetail ({ match, history }) {
    const [player, setPlayer] = useState()
    const [error , setError] = useState(undefined) 
    
    useEffect(() => {
        debugger
       
        (async () => {
            try {
            const { params: { id }} = match
            
            const player = await logic.retrievePlayer(id)

            setPlayer(player)
            
        } catch({message}) {
            setError(message)
          }
        })()
    }, [])
      
    function handleBack ()  {
     
        history.go(-1)
    }

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

    return <section>
        <Header />
        {player && <div className="player-detail">
            <img className="player-detail__image" onError={addDefaultSrc} src={"http://localhost:8080" + player.player.photo} width="300px"/>
            <div className="player-detail__content">
                <p className="player-detail__content__name">{player.player.name} {player.player.surname}</p>
                <p className="player-detail__content__position">{positionPlayer(player.player.position)}</p>
                <p className="player-detail__content__points">Total points: {player.player.totalPoints}</p>
                <p className="player-detail__content__goals">Goals: {player.player.goals}</p>
                <p className="player-detail__content__cost">Cost: {player.player.cost} J$</p>
            </div>
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}><i className="fas fa-arrow-circle-left fa-2x"></i></a>
        </div>}
    </section>
}

export default withRouter(PlayerDetail)
