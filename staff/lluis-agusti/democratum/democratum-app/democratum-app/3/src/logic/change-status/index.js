// const { env: { REACT_APP_API_URL } } = process
import { validate } from 'my-stuff-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( pollId, newStatus) {
    validate.string(newStatus, 'newStatus')

    return (async () => {

        //response = await fetch(`${REACT......
        const res = await fetch(`${REACT_APP_API_URL}/polls/${pollId}/changestatus`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' , 'authorization': `bearer ${this.__token__}` },
            body: JSON.stringify({ newStatus })
        })

        if ( res.status === 201) {
            const { poll } = await res.json()
            return await poll
        }

        const { error } = await res.json()
        throw Error(error)
    })()
}