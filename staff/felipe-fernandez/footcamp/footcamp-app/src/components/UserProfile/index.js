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
       
        history.push('/myteam')
    }
    
    return (
        <div>
            <section className="user-profile">
                <Header />
                <div className="user-profile__card"> 
            
                {user && <div className="user-profile__card__content" >
                        <p className="user-profile__card__content__user">Name: {user.name}</p>
                        <p className="user-profile__card__content__surname">Surname: {user.surname}</p>
                        <p className="user-profile__card__content__email">E-mail: {user.email}</p>
                    </div> }
                    <a href="#" onClick={event => {
                        event.preventDefault()
                        handleBack()
                    }}><i className="fas fa-arrow-circle-left fa-2x"></i></a>
                    

                </div>
            </section>
        </div>
    )
    
}

export default withRouter(UserProfile)