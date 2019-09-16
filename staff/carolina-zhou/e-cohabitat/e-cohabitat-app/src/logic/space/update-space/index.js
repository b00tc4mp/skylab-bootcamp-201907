import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Updates a space
 * 
 * @param {*} spaceId
 * @param {*} dataToUpdate 
 * 
* @returns {}
*/

export default function(spaceId, dataToUpdate) {
    
    validate.string(spaceId, 'space id')
    validate.object(dataToUpdate, 'body')

    const { id, token } = this.__userCredentials__
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces/${spaceId}`, {
            method: 'PATCH',
            headers: { authorization: `bearer ${token}` },
            body: JSON.stringify({ dataToUpdate })
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { space } = await response.json()
        return space
     })()
}