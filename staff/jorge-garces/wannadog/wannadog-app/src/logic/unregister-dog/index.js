import { validate } from 'wannadog-utils'
import logic from '../../logic'

export default function (email, password, dogId) {

    validate.string(dogId, 'dogId')

    return (async () => {
        const response = await fetch(`http://localhost:8080/api/user/${dogId}`, {
            method: 'delete',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${logic.__token__}` },
            body: JSON.stringify({ email, password, dogId })
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}