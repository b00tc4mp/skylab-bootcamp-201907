import { validate } from 'wannadog-utils'
import logic from '../../logic'

export default function (chatId, _message) {
    validate.string(chatId, 'chatId')
    validate.string(_message, 'message')

    return (async () => {

        const response = await fetch(`http://localhost:8080/api/user/chat/${chatId}`, {
            method: 'post',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${logic.__token__}` },
            body: JSON.stringify({ _message })
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}