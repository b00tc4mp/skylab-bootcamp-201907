const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that retrieve a week
 * @throws {Error}  Error 
 * @return a weekly menu planner
 */

export default function () {

    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/weeks/current`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { week } = await response.json()

        return week
     })()
}