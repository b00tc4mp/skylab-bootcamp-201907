import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

function CreateTeam(props) {

    const { history } = props
    
    const [name, setName] = useState(null)
    const [code, setCode] = useState(null)
    const [team, setTeam] = useState(null)
    const [onePlayer, setonePlayer] = useState(null)
      
    const handleNameInput = event => setName(event.target.value)
    const handleCodeInput = event => setCode(event.target.value)
    
    function handleCreateTeam(code, name) {

        (async()=>{
            
            try {

              
                const token = logic.userCredentials
                
                const {players} = await logic.createTeam(code, name, token)
                
                setTeam(players)
                debugger
                const res = await Promise.all(players.map((playerId) => 
                     logic.retrievePlayer(token, playerId)
                ))
                const player  = res.map(res=> res.player)
                debugger
                
                // const {player} = await logic.retrievePlayer(token, players[0])

                
                setonePlayer(player)
                
                // history.push('/myteam')
                    
                console.log('ok, league created right')

            } catch ({ message }) {
                
              console.log('fail create team', message)
            }
        })()
      }
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleCreateTeam(code, name)
    }


    return (
    
    <div className="useState" >
            <h2>Create a team</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    className="input is-info"
                    type="code"
                    name="code"
                    placeholder="code"
                    onChange={handleCodeInput}
                    required
                />
                <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="name"
                    onChange={handleNameInput}
                    required
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>

           {onePlayer  && <ul >
                {onePlayer.map(one => <li  key={one.id}> {one.name} <img src={"http://localhost:8080" + one.photo} /></li>)}
                 </ul>
           }
           
    </div>
    )
}

export default withRouter(CreateTeam)