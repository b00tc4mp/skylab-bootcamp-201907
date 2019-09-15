import { validate } from 'wannadog-utils'
import logic from '../../logic'

export default function (id) {

    validate.string(id, 'id')

    return (async () => {
        const response = await fetch(`http://localhost:8080/api/user/dog/${id}`, {
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