import { validate } from 'menu-planner-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that register new user
 * @param {String} name  Name of user
 * @param {String} surname Surname of user
 * @param {String} email  Email of user
 * @param {String} password  Password of user
 * @throws {Error} 'KO' Error that is thrown when an API error has ocurried
 * @return agree new user in API
 */

export default function (name, surname, email, password) {

  validate.string(name, 'name')
  validate.string(surname, 'surname')
  validate.string(email, 'email')
  validate.email(email, 'email')
  validate.string(password, 'password')

  return (async () => {
    const response = await fetch(`${REACT_APP_API_URL}/users`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, surname, email, password })
    })

    if (response.status !== 201 ) {
      const { error } = await response.json()

      throw Error(error)
    }
  })()
}