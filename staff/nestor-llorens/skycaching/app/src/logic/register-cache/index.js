import { validate } from 'utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, description, location, difficulty, terrain, size, hints) {

    validate.string(name, 'name')
    validate.string(description, 'description')
    validate.number(difficulty, 'number')
    validate.number(terrain, 'terrain')
    validate.string(size, 'size')
    validate.string(hints, 'hints')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/caches`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', authorization: `bearer ${this.__token__}` },
            body: JSON.stringify({ name, description, location, difficulty, terrain, size, hints })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}