import React, { useContext } from 'react'
import MyContext from '../Provider-Context'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

function Header({ history }) {

    const { user, view, setView } = useContext(MyContext)

    async function onLogOut(event){
        event.preventDefault()
        await logic.logUserOut()
        history.push('/')
    }

    function onUser(event){
        event.preventDefault()
        history.push('/user')
        setView('user')
    }
    // async function onNotification(){
    //     await logic.retrieveGeo()
    // }

    function onChats(event){
        event.preventDefault()
        history.push('/chats')
        setView('chat')
    }

    function onHome(event){
        event.preventDefault()
        history.push('/home')
        setView('home')
    }

    return <header>
                <img src="/#/"/>
                <ul>
                    <li><a href=""  > Anouncements </a></li> 
                    <li><a href="" onClick = {onLogOut}> Sing out </a></li>
                    {view !== "user" && <li><a onClick = {onUser}> {user.name} </a></li>}
                    {view !== 'chat' && <li><a onClick = {onChats}> Chats </a></li>} 
                    {view !== 'home' && <li><a onClick = {onHome}>Home</a></li>}
                </ul>
            </header>

}
export default withRouter(Header)