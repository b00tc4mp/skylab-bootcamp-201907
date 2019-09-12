import { validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (username, password, email) {
    validate.string(username, 'username')
    validate.string(password, 'password')
    validate.string(email, 'email')
    validate.email(email, 'email')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}