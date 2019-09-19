const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that retrieve user dates
 * @param {number} token Credential token for access the API
 * @throws {Error}  Error of user credentials
 * @return dates user of API
 */

export default function () {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { user } = await response.json()

        return user
     })()
}