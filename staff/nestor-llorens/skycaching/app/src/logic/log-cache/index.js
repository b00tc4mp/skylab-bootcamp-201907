import { validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (cacheId, comment) {

    validate.string(cacheId, 'cache id')
    validate.string(comment, 'comment')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/caches/${cacheId}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `bearer ${this.__token__}` },
            body: JSON.stringify({ comment })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}