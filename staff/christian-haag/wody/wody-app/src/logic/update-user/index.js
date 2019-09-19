import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (value) {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${this.__token__}`
            },
            body: JSON.stringify(value)
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

    })()
}