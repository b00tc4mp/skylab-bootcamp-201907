import { validate } from 'wannadog-utils'
import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (email, password, dogId) {

    validate.string(dogId, 'dogId')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/${dogId}`, {
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