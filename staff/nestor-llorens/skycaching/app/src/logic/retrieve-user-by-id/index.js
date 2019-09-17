import { validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (userId) {
    validate.string(userId, 'user id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${userId}`, {
            method: 'GET',
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