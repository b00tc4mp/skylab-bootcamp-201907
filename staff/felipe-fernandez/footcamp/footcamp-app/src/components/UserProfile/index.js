import React, {  useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"
import Context from '../Context'
import logic from '../../logic'
import Header from '../Header'

function UserProfile({history}) {

    const [user, setUser] = useState(null)
    // const { user, setUser } = useContext(Context)
    debugger
    useEffect(() => {
        (async () => {
            try {        
                debugger
                const user = await logic.retrieveUser()
                setUser(user)

        } catch({message}) {
            console.log('fail login', message)
          }
        })()
    }, [])

    function handleBack(){
       
        history.push('/myleague')
    }
    
    return (
        <div>
            <Header />
            <div class="card"> 
         
             {user && <div class="card-content" >
                    <h3 class="title is-4">{user.name}</h3>
                    <p class="subtitle is-6">{user.surname}</p>
                    <p class="subtitle is-6">{user.email}</p>
                </div> }
                <a href="#" onClick={event => {
                    event.preventDefault()
                    handleBack()
                }}>Go back</a>
                

            </div>
        </div>
    )
    
}

export default withRouter(UserProfile)