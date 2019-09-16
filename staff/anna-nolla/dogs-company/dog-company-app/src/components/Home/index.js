import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import MapHome from '../Map-home'

function Home() {
    
    const { setUser, setView } = useContext(MyContext)
    
    useEffect(()=> {
        async function retrieveUser(){
            try{
                const { user } = await logic.retrieveUser()
                setUser(user)
                setView('home')
            }catch({ message }){
                console.log(message)
            }
        }
        retrieveUser()
    }, [])
   
    return  <main>
                <section className = 'map-home'>
                    <MapHome/>
                </section>
                <section>
                    <h3> notifications </h3>
                    <ul>
                        <li><p>person</p></li>
                        <li><p>mesages</p></li>
                    </ul>
                </section>
            </main>
}
export default withRouter(Home)
