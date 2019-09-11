import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Context from '../Context'

function CreateLeagues(props) {

    const { history } = props
    const { nameLeague, setNameLeague, leagueId, setLeagueId, existLeague, setExistLeague} = useContext(Context)
    const [name, setName] = useState(null)
    const [code, setCode] = useState(null)
      
    const handleNameInput = event => setName(event.target.value)
    const handleCodeInput = event => setCode(event.target.value)
    
    function handleCreate (name, code) {
       
        (async()=>{
            
            try {
               
                const token = logic.userCredentials
                const {leagueId} = await logic.createLeague(name, code, token)
                setNameLeague(name)
                setCode(code)
                //set the id of the league to use after in the creation of teams
                setLeagueId(leagueId)
               
                debugger
                history.push('/create-teams')
                    
                console.log('ok, league created right')

            } catch ({ message }) {
                
              console.log('fail create league', message)
            }
        })()
      }

      function handleJoin (name, code) {
       
        (async()=>{
            
            try {
               
                const token = logic.userCredentials
                const {leagueId} = await logic.joinLeague(name, code, token)
                
                setNameLeague(name)
                setCode(code)
                  //set the id of the league to use after in the creation of teams
                setLeagueId(leagueId)
              
                history.push('/create-teams')
                    
                console.log('ok, league created right')

            } catch ({ message }) {
                
              console.log('fail create league', message)
            }
        })()
      }
    
    const handleFormSubmitCreate = event => {
        event.preventDefault()
        handleCreate(name, code)
    }

    const handleFormSubmitJoin = event => {
        event.preventDefault()
        handleJoin(name, code)
    }

    
    return (
        <div className="useState" >
            <h2>Create a league</h2>
            <form onSubmit={handleFormSubmitCreate}>
                <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleNameInput}
                    required
                />
                <input
                    className="input is-info"
                    type="code"
                    name="code"
                    placeholder="Code"
                    onChange={handleCodeInput}
                    required
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>

            <h2>Join a league</h2>
            <form onSubmit={handleFormSubmitJoin}>
                <input
                    className="input is-info"
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleNameInput}
                    required
                />
                <input
                    className="input is-info"
                    type="code"
                    name="code"
                    placeholder="Code"
                    onChange={handleCodeInput}
                    required
                />
                <button className="button is-fullwidth is-info is-outlined">Submit</button>
            </form>
        </div>
    )
}

export default withRouter(CreateLeagues)
