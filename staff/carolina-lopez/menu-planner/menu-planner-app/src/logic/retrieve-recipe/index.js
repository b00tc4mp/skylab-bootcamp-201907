import { validate } from 'menu-planner-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that retrieve a recipe
 * @param {id} id Credential token for access the API
 * @throws {Error}  Error of user credentials
 * @return dates of a recipe
 */

export default function (id) {

  validate.string(id, 'id')

  return (async () => {
    const response = await fetch(`${REACT_APP_API_URL}/recipes/${id}`, {
      method: 'get',
      headers: {
        authorization: `bearer ${this.__token__}`
      }
    })
      if (response.status !== 200) {
        const { error } = await response.json()

        throw Error(error)
    }

    const { recipe } = await response.json()

    return recipe
    
  })()
}

