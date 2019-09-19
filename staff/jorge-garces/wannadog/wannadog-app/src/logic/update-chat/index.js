import { validate } from 'wannadog-utils'
import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (chatId, _message) {
    validate.string(chatId, 'chatId')
    validate.string(_message, 'message')

    return (async () => {

        const response = await fetch(`${REACT_APP_API_URL}/user/chat/${chatId}`, {
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