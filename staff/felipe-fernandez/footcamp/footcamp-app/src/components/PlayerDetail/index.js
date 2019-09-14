import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'

 function PlayerDetail ({ match, history }) {
    const [player, setPlayer] = useState()

    useEffect(() => {
        (async () => {
            const { params: { id }} = match
            
            const player = await logic.retrievePlayer(id)

            setPlayer(player)
        })()
    }, [])
      
  const handleBack = () => {
     
    history.push('/myteam')
}

    return <section>
        <Header />
        {player && <>
            <img src={"http://localhost:8080" + player.player.photo} width="300px"/>
            <p>Name: {player.player.name}</p>
            <p>Surname: {player.player.surname}</p>
            <p>Total points: {player.player.totalPoints}</p>
            <p>Goals: {player.player.goals}</p>
            <p>Cost: {player.player.cost}</p>
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}>Go back</a>
        </>}
    </section>
}

export default withRouter(PlayerDetail)
