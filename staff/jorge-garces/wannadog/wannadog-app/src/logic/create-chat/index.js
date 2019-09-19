import { validate } from 'wannadog-utils'
import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (participantId) {
    validate.string(participantId, 'participantId')

    return (async () => {

        const response = await fetch(`${REACT_APP_API_URL}/user/chat`, {
            method: 'post',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${logic.__token__}` },
            body: JSON.stringify({ participantId })
        })

        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        return response.json()
    })()
}