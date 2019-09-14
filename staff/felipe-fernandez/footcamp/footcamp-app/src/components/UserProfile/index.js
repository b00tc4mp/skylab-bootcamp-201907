import React, {  useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"
import Context from '../Context'
import logic from '../../logic'
import Header from '../Header'

function UserProfile({history}) {

    const [userProfile, setUserProfile] = useState(null)
    // const { user, setUser } = useContext(Context)
    debugger
    useEffect(() => {
        (async () => {
            try {        
                debugger
            const {user: userProfile} = await logic.retrieveUser()
            setUserProfile(userProfile)

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
{/*         
            <div class="card-content" >
                    <h3 class="title is-4">{userProfile.name}</h3>
                    <p class="subtitle is-6">{userProfile.surname}</p>
                    <p class="subtitle is-6">{userProfile.email}</p>
                </div> */}
                <a href="#" onClick={event => {
                    event.preventDefault()
                    handleBack()
                }}>Go back</a>
                

            </div>
        </div>
    )
    
}

export default withRouter(UserProfile)