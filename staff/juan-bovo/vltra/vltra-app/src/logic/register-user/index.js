// const { env: { REACT_APP_API_URL } } = process
const { validate} = require('vltra-utils')

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, nickname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(nickname, 'nickname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, nickname, email, password })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}