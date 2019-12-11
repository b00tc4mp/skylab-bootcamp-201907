// const { env: { REACT_APP_API_URL } } = process
// const {validate}= require("generisad-utils")
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, password, domain) {
    // validate.string(name, 'name')
    // validate.string(surname, 'surname')
    // validate.string(email, 'email')
    // validate.email(email, 'email')
    // validate.string(password, 'password')

   

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password, domain })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}