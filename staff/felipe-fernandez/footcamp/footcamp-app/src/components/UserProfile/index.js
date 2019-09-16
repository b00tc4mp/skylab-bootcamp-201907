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
            <div className="card"> 
         
             {user && <div className="card__content" >
                    <p className="card__content__user">{user.name}</p>
                    <p className="card__ontent__surname">{user.surname}</p>
                    <p clasclassNames="card__content__email">{user.email}</p>
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