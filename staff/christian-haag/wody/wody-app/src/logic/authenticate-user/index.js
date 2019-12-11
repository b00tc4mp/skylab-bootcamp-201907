// const { env: { REACT_APP_API_URL } } = process
import validate from '../../utils/validate'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (email, password) {
    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            const { token } = await response.json()
            //return token
            this.__token__ = token

            return
        }

        const { error } = await response.json()

        throw Error(error)
    })()
}