import React, { useContext } from 'react'
import MyContext from '../Provider-Context'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import logo from '../../img/logo.png'

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
    
    function onChats(event){
        event.preventDefault()
        history.push('/chats')
        setView('chats')
    }

    function onHome(event){
        event.preventDefault()
        history.push('/home')
        setView('home')
    }

    return <header className = 'header'>
                <img src={logo} />
                <nav className ='header_navigator'>
                    <div className = 'header_div'>
                    <a className ='header_back' href = '#' onClick = {onLogOut}> Sing out </a>
                    </div>
                    <div>
                        {view !== "user" && <a className ='header_button' href = '#' onClick = {onUser}> {user.name} </a>}
                        {view !== 'chats' && <a className ='header_button' href = '#' onClick = {onChats}> Chats </a>} 
                        {view !== 'home' && <a className ='header_button' href = '#' onClick = {onHome}>Home</a>}
                    </div>
                </nav>
            </header>

}
export default withRouter(Header)