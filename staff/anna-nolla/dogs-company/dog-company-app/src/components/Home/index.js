import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'

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
                <section>
                    <a href="google maps">Map</a> {/* <!--aqui va el mapa de google--> */}
                    <a href="human gps">Man</a> {/* !--ninot per canviar la ubicacio en tems real--> */}
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
