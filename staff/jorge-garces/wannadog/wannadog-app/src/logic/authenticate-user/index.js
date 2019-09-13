import { validate } from 'wannadog-utils'

export default function (email, password) {
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')


    return (async () => {
        const response = await fetch(`http://localhost:8080/api/auth`, {
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