import { validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves a cache
 * @param {string} cacheId 
 */
export default function (cacheId) {

    validate.string(cacheId, 'cache id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/caches/${cacheId}`, {
            method: 'GET',
            headers: { authorization: `bearer ${this.__token__}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { cache } = await response.json()

        return cache
    })()
}