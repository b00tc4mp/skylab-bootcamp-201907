import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import ChatShowcase from '../ChatShowcase'
import MyContext from '../Provider-Context'
import { withRouter} from 'react-router-dom'

function ChatLounge({ history }) {

    const [chatList, setChatList] = useState()
    const { setView, setUser, user } = useContext(MyContext)

    useEffect(() => {

        async function retrieveChats() {
            try {
                const { user }= await logic.retrieveUser()
                const { chat } = await logic.retrieveAllChats()
                setChatList(chat)
                setUser(user)
                setView('chats')

            } catch ({ message }) {
                console.log('error', message)
            }
        }
        retrieveChats()
    }, [history.location])
    
    return <div className = 'title'>
        <h3 className = 'title_text'>Messages</h3>
{chatList && <ul>{chatList.map(chat => chat.messages.length > 0 && <ChatShowcase chat={chat} user={user} />)}</ul>}
    </div>
}

export default withRouter(ChatLounge)