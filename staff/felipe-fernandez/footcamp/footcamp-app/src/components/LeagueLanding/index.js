import React, { useState } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

function LeagueLanding(props) {

    const { history } = props
    
    const [name, setName] = useState(null)
    const [code, setCode] = useState(null)
      
    const handleNameInput = event => setName(event.target.value)
    const handleCodeInput = event => setCode(event.target.value)
    
    function handleCreate (name, code) {

        (async()=>{
            
            try {
               
                const token = logic.userCredentials
                await logic.createLeague(name, code, token)
                
                history.push('/teams')
                    
                console.log('ok, league created right')

            } catch ({ message }) {
                
              console.log('fail create league', message)
            }
        })()
      }
    
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleCreate(name, code)
    }


    
    return (
        <div className="useState" >
            <h2>Create a league</h2>
            <form onSubmit={handleFormSubmit}>
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
            <form onSubmit={handleFormSubmit}>
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

export default withRouter(LeagueLanding)
