import { validate } from 'wannadog-utils'
import logic from '../../logic'

export default function (chatId) {
    validate.string(chatId, 'chatId')

    return (async () => {

        const response = await fetch(`http://localhost:8080/api/user/chat/${chatId}`, {
            method: 'get',
            headers: { 'authorization': `bearer ${logic.__token__}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        const { chat: { messages } } = await response.json()

        return messages

    })()
}