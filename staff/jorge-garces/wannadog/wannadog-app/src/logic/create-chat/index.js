import { validate } from 'wannadog-utils'
import logic from '../../logic'

export default function (participantId) {
    validate.string(participantId, 'participantId')

    return (async () => {

        const response = await fetch(`http://localhost:8080/api/user/chat`, {
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