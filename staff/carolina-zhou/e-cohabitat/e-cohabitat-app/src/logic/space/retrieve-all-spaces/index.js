import { validate } from 'utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves all the spaces shared by a particular user
 * 
 * @param {*} id 
 * 
 * @returns {}
 */

export default function (id) {

    validate.string(id, 'user id')

    const { token } = sessionStorage

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/spaces`, {
            method: 'get',
            headers: { 'authorization': `bearer ${token}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
            const { spaces }= await response.json()
            return spaces
    })()
}
