import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import MapHome from '../MapHome'
import UserDetail from '../UserDetails'
import Feedback from '../Feedback'

function Home() {
    
    const { setUser, user, setView, userId } = useContext(MyContext)
    const [notification, setNotification] = useState(false)
    const [addNotification, setAddNotification] = useState(false)
    const [error, setError] = useState(undefined)
    
    useEffect(()=> {
        async function retrieveUser(){
            try{
                const { user } = await logic.retrieveUser()
                setUser(user)
                user.notification[0] === undefined ? setNotification(false) : setNotification(true)
                setView('home')
            }catch(error){ 
            }
        }
        retrieveUser()
    },[])

    function onAddNotification(){
        setAddNotification(!addNotification)
    }
    async function onNotification(title, text){
        try{
            (!notification) ? await logic.createNotification(title, text)
            : await logic.updateNotification(user.notification[0]._id, title, text)
        }catch({ message }){
            setError(message)
        }
    }
   
    return  <main className = 'home'>
               {notification && <section className = 'home_section'>
                        <p className = 'home_section_text'>Title: {user.notification[0].title}</p>
                        <p className = 'home_section_text'>Text: {user.notification[0].text}</p>
                </section>}
                <button className = 'home_notification-button' onClick = {onAddNotification}> Update your notification</button>
                {user.notification && addNotification && <form className = 'home_form' onSubmit = {event => {
                    event.preventDefault()
                    onNotification(event.target.title.value, event.target.text.value)}}>
                    <label className = 'home_form_text'>Title </label>
                        <input className = 'home_form_input' type = "text" name = "title"/>
                    <label className = 'home_form_text'>Text </label>
                        <input className = 'home_form_input' type = "text" name = "text" /> 
                        {error && <Feedback message = {error}/>}
                    <button className = 'home_form_button'>Update</button>
                </form>}
                <section className = 'map-home'>
                    <MapHome/>
                </section>
                {userId && <UserDetail/>}
            </main>
}
export default withRouter(Home)
