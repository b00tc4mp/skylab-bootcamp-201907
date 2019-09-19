import { validate } from 'menu-planner-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that retrieve a day
 * @param {id} id Credential for access the API
 * @throws {Error}  Error of day credentials
 * @return meals of a day
 */

export default function (id) {
    
    validate.string(id, 'id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/days/${id}`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { day } = await response.json()

        return day
     })()
}