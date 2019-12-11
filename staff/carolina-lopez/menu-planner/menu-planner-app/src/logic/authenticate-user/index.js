import { validate } from 'menu-planner-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that authenticates a user
* @param {string} email  email of user
* @param {string} password  password of user
* @throws {Error} incorrect params value
*/

export default function (email, password) {
  validate.string(email, 'email')
  validate.email(email, 'email')
  validate.string(password, 'password')

  return (async () => {
    const response = await fetch(`${REACT_APP_API_URL}/auth`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (response.status === 200) {
      const { token } = await response.json()

      this.__token__ = token
      return
    }

    const { error } = await response.json()

    throw Error(error)
  })()
}