import { validate } from 'menu-planner-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that retrieve a day
 * @param {category} category Category of meal
 * @throws {Error}  Error of user credentials
 * @return recipes of the selected category
 */

export default function (category) {

  validate.string(category, 'category')

  return (async () => {
    
    const response = await fetch(`${REACT_APP_API_URL}/recipes/search/${category}`, {
      method: 'get',
      headers: {
        authorization: `bearer ${this.__token__}`
      }
    })
      if (response.status !== 201) {
        const { error } = await response.json()

        throw Error(error)
    }

    const { recipes } = await response.json()

    return recipes
    
  })()
}

