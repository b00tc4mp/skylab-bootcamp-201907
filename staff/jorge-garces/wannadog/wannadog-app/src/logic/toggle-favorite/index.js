import { validate } from 'wannadog-utils'
import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {

    validate.string(id, 'id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/user/dog/${id}`, {
            method: 'post',
            headers: { 'content-type': 'application/json', 'authorization': `bearer ${logic.__token__}` },
            body: JSON.stringify({ id })
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}