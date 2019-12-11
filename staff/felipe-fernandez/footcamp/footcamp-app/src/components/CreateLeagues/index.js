import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Context from '../Context'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'

function CreateLeagues(props) {

    const { history } = props
    const {leagueId, setLeagueId} = useContext(Context)
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [error , setError] = useState(undefined) 
      
    const handleNameInput = event => setName(event.target.value)
    const handleCodeInput = event => setCode(event.target.value)
    
    function handleCreate (name, code) {
       
        (async()=>{
            debugger
            try {
               
                const leagueId = await logic.createLeague(name, code)
                
                if(leagueId) {
                setLeagueId(leagueId)               
                sessionStorage.league=leagueId
                }
              
                history.push('/create-teams')
                    
              
            } catch ({ message }) {
                
                setError(message)
            }
        })()
      }

      function handleJoin(code) {
       
        (async()=>{
            
            try {
              
            const leagueId = await logic.joinLeague(code)
            setLeagueId(leagueId)
            sessionStorage.league=leagueId  
       
                
            history.push('/create-teams')
                    
               
            } catch ({ message }) {
                
                setError(message)
            }
        })()
      }
    
    const handleFormSubmitCreate = event => {
        event.preventDefault()
        handleCreate(name, code)
    }

    const handleFormSubmitJoin = event => {
        event.preventDefault()
        handleJoin(code)
    }

    
    return (
        <div >
        <section className="create">
            <InitialHeader />
                <div className="create__content">
                <h2 className="create__content__title">CREATE A LEAGUE</h2>
                <form className="create__content__form-create" onSubmit={handleFormSubmitCreate}>
                <div class="create__content__form-create-inputs">
                    <input
                    
                        type="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleNameInput}
                        required
                    />
                </div>
                <div class="create__content__form-create-inputs">
                <input
                    
                        type="password"
                        name="code"
                        placeholder="Code"
                        onChange={handleCodeInput}
                        required
                    />
                </div>
                    <button>Submit</button>
                </form>

                <h2 className="create__content__create__title">JOIN A LEAGUE</h2>
                <form className="create__content__form-create" onSubmit={handleFormSubmitJoin}>
                <div class="create__content__form-create-inputs">
                    <input
                    
                        type="password"
                        name="code"
                        placeholder="Code"
                        onChange={handleCodeInput}
                        required
                    />
                </div>
                    <button>Submit</button>
                {error && <Feedback message={error}/>} 
                </form>
                
            </div>
        </section>
        </div>
    )
}

export default withRouter(CreateLeagues)
