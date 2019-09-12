import { validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (username, password) {
    validate.string(username, 'username')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password })
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